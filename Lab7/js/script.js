document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("content");
  const catalogLink = document.getElementById("catalogLink");

  catalogLink.addEventListener("click", function (event) {
    event.preventDefault();
    loadCatalog();
  });
  loadCatalog();
  function loadJSON(path) {
    return fetch(path).then(function (response) {
      if (!response.ok) {
        throw new Error("Помилка завантаження файлу: " + path);
      }

      return response.json();
    });
  }

  function loadCatalog() {
    loadJSON("./data/categories.json")
      .then(function (data) {
        renderCategories(data.categories);
      })
      .catch(function (error) {
        showError(error.message);
      });
  }

  function renderCategories(categories) {
    const categoryCards = categories
      .map(function (category) {
        return `
          <div class="col-md-6 col-lg-3 mb-4">
            <div class="card category-card h-100">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${category.name}</h5>
                <p class="card-text notes">${category.notes}</p>

                <button
                  class="btn btn-outline-primary mt-auto category-link"
                  data-shortname="${category.shortname}"
                >
                  Відкрити категорію
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    content.innerHTML = `
      <h2 class="mb-4">Каталог</h2>

      <div class="row">
        ${categoryCards}
      </div>

      <div class="text-center mt-4">
        <button id="specialsBtn" class="btn btn-danger btn-lg">
          Specials — випадкова категорія
        </button>
      </div>
    `;

    const categoryButtons = document.querySelectorAll(".category-link");

    categoryButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const shortname = this.dataset.shortname;
        loadCategory(shortname);
      });
    });

    document
      .getElementById("specialsBtn")
      .addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomIndex];

        loadCategory(randomCategory.shortname);
      });
  }

  function loadCategory(shortname) {
    loadJSON("./data/" + shortname + ".json")
      .then(function (data) {
        renderCategoryItems(data.category, data.items);
      })
      .catch(function (error) {
        showError(error.message);
      });
  }

  function renderCategoryItems(category, items) {
    const productCards = items
      .map(function (item) {
        return `
          <div class="col-md-6 col-lg-3 mb-4">
            <div class="card product-card h-100">
              <img
                src="${item.image}"
                class="card-img-top product-img mt-3"
                alt="${item.name}"
              >

              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="price mt-auto">${item.price} грн</p>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    content.innerHTML = `
      <div class="mb-4">
        <button id="backToCatalogBtn" class="btn btn-secondary mb-3">
          ← Назад до каталогу
        </button>

        <h2>${category.name}</h2>
        <p class="notes">${category.notes}</p>
      </div>

      <div class="row">
        ${productCards}
      </div>
    `;

    document
      .getElementById("backToCatalogBtn")
      .addEventListener("click", loadCatalog);
  }

  function showError(message) {
    content.innerHTML = `
      <div class="error-message">
        <strong>Помилка:</strong> ${message}
      </div>
    `;
  }
});
