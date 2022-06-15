import { swap } from './helper'

export const bubblesort = (arr: number[]): void => {
  let swapped = true
  while (swapped) {
    swapped = false
    /**
     * 这里是通过交换，把最大的元素放在末尾
     * 然后不断重复这个过程，直到前面的元素都比后面的元素小
     * */
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        swap(arr, i, i - 1)
        swapped = true
      }
    }
  }
}
