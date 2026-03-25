var sortLib = {};

// 🔧 допоміжна функція
sortLib._prepareArray = function (arr) {
  let hasUndefined = arr.some((el) => el === undefined);

  if (hasUndefined) {
    console.log("⚠️ Масив містить undefined елементи");
  }

  // прибираємо undefined для сортування
  let clean = arr.filter((el) => el !== undefined);

  return { clean, hasUndefined };
};

// 🔁 Bubble Sort
sortLib.bubbleSort = function (arr, asc = true) {
  let { clean, hasUndefined } = this._prepareArray(arr);

  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < clean.length - 1; i++) {
    for (let j = 0; j < clean.length - i - 1; j++) {
      comparisons++;

      if (asc ? clean[j] > clean[j + 1] : clean[j] < clean[j + 1]) {
        [clean[j], clean[j + 1]] = [clean[j + 1], clean[j]];
        swaps++;
      }
    }
  }

  console.log("Bubble:", { comparisons, swaps });
  return clean;
};

// 🔽 Selection Sort
sortLib.selectionSort = function (arr, asc = true) {
  let { clean } = this._prepareArray(arr);

  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < clean.length; i++) {
    let index = i;

    for (let j = i + 1; j < clean.length; j++) {
      comparisons++;

      if (asc ? clean[j] < clean[index] : clean[j] > clean[index]) {
        index = j;
      }
    }

    if (index !== i) {
      [clean[i], clean[index]] = [clean[index], clean[i]];
      swaps++;
    }
  }

  console.log("Selection:", { comparisons, swaps });
  return clean;
};

// 🔼 Insertion Sort
sortLib.insertionSort = function (arr, asc = true) {
  let { clean } = this._prepareArray(arr);

  let comparisons = 0;
  let moves = 0;

  for (let i = 1; i < clean.length; i++) {
    let key = clean[i];
    let j = i - 1;

    while (j >= 0 && (asc ? clean[j] > key : clean[j] < key)) {
      comparisons++;
      clean[j + 1] = clean[j];
      j--;
      moves++;
    }

    clean[j + 1] = key;
  }

  console.log("Insertion:", { comparisons, moves });
  return clean;
};

// 🐚 Shell Sort
sortLib.shellSort = function (arr, asc = true) {
  let { clean } = this._prepareArray(arr);

  let comparisons = 0;
  let moves = 0;

  for (
    let gap = Math.floor(clean.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < clean.length; i++) {
      let temp = clean[i];
      let j = i;

      while (
        j >= gap &&
        (asc ? clean[j - gap] > temp : clean[j - gap] < temp)
      ) {
        comparisons++;
        clean[j] = clean[j - gap];
        j -= gap;
        moves++;
      }

      clean[j] = temp;
    }
  }

  console.log("Shell:", { comparisons, moves });
  return clean;
};

// ⚡ Quick Sort (Хоара)
sortLib.quickSort = function (arr, asc = true) {
  let { clean } = this._prepareArray(arr);

  let comparisons = 0;

  function quick(a) {
    if (a.length <= 1) return a;

    let pivot = a[Math.floor(a.length / 2)];
    let left = [],
      right = [],
      equal = [];

    for (let el of a) {
      comparisons++;

      if (el === pivot) equal.push(el);
      else if (asc ? el < pivot : el > pivot) left.push(el);
      else right.push(el);
    }

    return [...quick(left), ...equal, ...quick(right)];
  }

  let result = quick(clean);

  console.log("Quick:", { comparisons });
  return result;
};
