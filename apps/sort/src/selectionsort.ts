import { swap } from './helper'

export const selectionsort = (arr: number[]): void => {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    // 循环的作用是找到当前元素的位置，往后面比较，找到没有比他更大的最小位置，那么这个位置就是它的
    for (let j = i + 1; j < arr.length; j++) {
      min = arr[min] > arr[j] ? j : min
    }
    // 假如当前元素不是最小的，那就把它与后面最小的元素进行交换
    if (min !== i) {
      swap(arr, i, min)
    }
  }
}
