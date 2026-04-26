document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  hamburgerBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });

  const slides = document.getElementById("slides");
  const images = slides.querySelectorAll("img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dots");

  let currentSlide = 0;
  let autoSlideInterval;

  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", function () {
      currentSlide = i;
      showSlide(currentSlide);
      restartAutoSlide();
    });

    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    if (index >= images.length) {
      currentSlide = 0;
    }

    if (index < 0) {
      currentSlide = images.length - 1;
    }

    slides.style.transform = "translateX(-" + currentSlide * 100 + "%)";

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
      nextSlide();
    }, 3000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  nextBtn.addEventListener("click", function () {
    nextSlide();
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", function () {
    prevSlide();
    restartAutoSlide();
  });

  startAutoSlide();
});
