var sortLib = {};

// перевірка масиву
sortLib._prepareArray = function (arr) {
  let result = [...arr]; // копія, але undefined зберігаються
  let undefinedCount = 0;

  for (let el of result) {
    if (el === undefined) undefinedCount++;
  }

  if (undefinedCount > 0) {
    console.log(`⚠️ Масив містить ${undefinedCount} undefined-елемент(и)`);
  }

  return {
    result,
    hasUndefined: undefinedCount > 0,
    undefinedCount,
  };
};

// порівняння з урахуванням undefined
sortLib._shouldSwap = function (a, b, asc = true) {
  // undefined завжди "більший" за число -> йде в кінець
  if (a === undefined && b === undefined) return false;
  if (a === undefined) return true; // a треба посунути вправо
  if (b === undefined) return false; // b уже праворуч, не міняємо

  return asc ? a > b : a < b;
};

// Bubble Sort
sortLib.bubbleSort = function (arr, asc = true) {
  let { result } = this._prepareArray(arr);

  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      comparisons++;

      if (this._shouldSwap(result[j], result[j + 1], asc)) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swaps++;
      }
    }
  }

  console.log("Bubble sort: comparisons =", comparisons, ", swaps =", swaps);
  console.log("Result:", result);
  return result;
};

// Selection Sort
sortLib.selectionSort = function (arr, asc = true) {
  let { result } = this._prepareArray(arr);

  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < result.length - 1; i++) {
    let index = i;

    for (let j = i + 1; j < result.length; j++) {
      comparisons++;

      if (this._shouldSwap(result[index], result[j], asc)) {
        index = j;
      }
    }

    if (index !== i) {
      [result[i], result[index]] = [result[index], result[i]];
      swaps++;
    }
  }

  console.log("Selection sort: comparisons =", comparisons, ", swaps =", swaps);
  console.log("Result:", result);
  return result;
};
// Insertion Sort
sortLib.insertionSort = function (arr, asc = true) {
  let { result } = this._prepareArray(arr);

  let comparisons = 0;
  let moves = 0;

  for (let i = 1; i < result.length; i++) {
    let key = result[i];
    let j = i - 1;

    while (j >= 0) {
      comparisons++;

      if (this._shouldSwap(result[j], key, asc)) {
        result[j + 1] = result[j];
        j--;
        moves++;
      } else {
        break;
      }
    }

    result[j + 1] = key;
  }

  console.log("Insertion sort: comparisons =", comparisons, ", moves =", moves);
  console.log("Result:", result);
  return result;
};
// Shell Sort
sortLib.shellSort = function (arr, asc = true) {
  let { result } = this._prepareArray(arr);

  let comparisons = 0;
  let moves = 0;

  for (
    let gap = Math.floor(result.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < result.length; i++) {
      let temp = result[i];
      let j = i;

      while (j >= gap) {
        comparisons++;

        if (this._shouldSwap(result[j - gap], temp, asc)) {
          result[j] = result[j - gap];
          j -= gap;
          moves++;
        } else {
          break;
        }
      }

      result[j] = temp;
    }
  }

  console.log("Shell sort: comparisons =", comparisons, ", moves =", moves);
  console.log("Result:", result);
  return result;
};
// Quick Sort (Хоара)
sortLib.quickSort = function (arr, asc = true) {
  let { result } = this._prepareArray(arr);

  let comparisons = 0;
  const self = this;

  function quick(a) {
    if (a.length <= 1) return a;

    let pivot = a[Math.floor(a.length / 2)];
    let left = [];
    let right = [];
    let equal = [];

    for (let el of a) {
      comparisons++;

      if (el === pivot) {
        equal.push(el);
      } else if (self._shouldSwap(pivot, el, asc)) {
        left.push(el);
      } else {
        right.push(el);
      }
    }

    return [...quick(left), ...equal, ...quick(right)];
  }

  let sorted = quick(result);

  console.log("Quick sort: comparisons =", comparisons);
  console.log("Result:", sorted);
  return sorted;
};
