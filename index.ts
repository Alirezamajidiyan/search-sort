// interface برای تعریف نوع مقایسه کننده سفارشی
interface Comparator<T> {
  (a: T, b: T): number;
}

class SortAndSearch<T> {
  // جستجوی خطی
  linearSearch(arr: T[], target: T, comparator: Comparator<T> = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }): number {
    for (let i = 0; i < arr.length; i++) {
      if (comparator(arr[i], target) === 0) {
        return i;
      }
    }
    return -1; // اگر عنصر یافت نشد
  }


  // جستجوی دودویی (آرایه باید مرتب شده باشد)
  binarySearch(arr: T[], target: T, comparator: Comparator<T> = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparisonResult = comparator(arr[mid], target);

      if (comparisonResult === 0) {
        return mid;
      } else if (comparisonResult < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1; // اگر عنصر یافت نشد
  }

  // مرتب‌سازی حبابی
  bubbleSort(arr: T[], comparator: Comparator<T> = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }): T[] {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (comparator(arr[j], arr[j + 1]) > 0) {
          // تعویض عناصر
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }


  // مرتب‌سازی ادغامی (برای نمونه، از یک پیاده‌سازی ساده استفاده می‌کنیم)
  mergeSort(arr: T[], comparator: Comparator<T> = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }): T[] {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = this.mergeSort(arr.slice(0, mid), comparator);
      const right = this.mergeSort(arr.slice(mid), comparator);

      let result: T[] = [];
      let i = 0;
      let j = 0;

      while (i < left.length || j < right.length) {
        if (i < left.length && (j >= right.length || comparator(left[i], right[j]) <= 0)) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
      return result;
    }


  // مرتب‌سازی سریع (برای نمونه، از یک پیاده‌سازی ساده استفاده می‌کنیم)
  quickSort(arr: T[], comparator: Comparator<T> = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }): T[] {
      if (arr.length <= 1) return arr;

      const pivot = arr[0];
      const left = [];
      const right = [];

      for (let i = 1; i < arr.length; i++) {
        if (comparator(arr[i], pivot) < 0) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }

      return [...this.quickSort(left, comparator), pivot, ...this.quickSort(right, comparator)];
    }
}


// مثال استفاده
const sorter = new SortAndSearch<number>();

let numbers = [5, 2, 9, 1, 5, 6];
console.log("Unsorted array:", numbers);

numbers = sorter.bubbleSort(numbers);
console.log("Sorted array (Bubble Sort):", numbers);

numbers = [5, 2, 9, 1, 5, 6];
numbers = sorter.mergeSort(numbers);
console.log("Sorted array (Merge Sort):", numbers);


numbers = [5, 2, 9, 1, 5, 6];
numbers = sorter.quickSort(numbers);
console.log("Sorted array (Quick Sort):", numbers);

const index = sorter.linearSearch(numbers, 9);
console.log("Index of 9 (Linear Search):", index); // خروجی: 5

const index2 = sorter.binarySearch(numbers, 9);
console.log("Index of 9 (Binary Search):", index2); // خروجی: 5


//مثال با مقایسه کننده سفارشی برای رشته ها
const strings = ["banana", "apple", "orange", "grape"];
const stringSorter = new SortAndSearch<string>();
const sortedStrings = stringSorter.bubbleSort(strings, (a, b) => a.localeCompare(b));
console.log("Sorted strings:", sortedStrings);


