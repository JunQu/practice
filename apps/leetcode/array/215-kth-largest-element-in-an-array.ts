import { swap } from '../../sort/src/helper'

// TODO 使用快排的方式做一次
export const findKthLargest = (nums: number[], k: number): number => {
  let len = nums.length
  let index = ~~(len / 2 - 1)
  while (index >= 0) {
    heapify(nums, index, len)
    index -= 1
  }

  index = len - 1
  while (len - index < k && index >= 0) {
    swap(nums, 0, index)
    heapify(nums, 0, index)
    index -= 1
  }
  return nums[0]
}

const heapify = (arr: number[], root: number, end: number) => {
  let leftChild = 2 * root + 1
  let max = root
  while (leftChild < end) {
    let rightChild = leftChild + 1
    let larger = max

    if (arr[leftChild] > arr[larger]) {
      larger = leftChild
    }
    if (rightChild < end && arr[rightChild] > arr[larger]) {
      larger = rightChild
    }
    if (larger !== max) {
      swap(arr, larger, max)
      leftChild = 2 * larger + 1
      max = larger
    } else {
      break
    }
  }
}
