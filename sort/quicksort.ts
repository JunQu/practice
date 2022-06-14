/* eslint-disable no-param-reassign  */
/* eslint-disable no-return-assign  */

import { swap } from './helper'

export const quicksortInNewPlace = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr
  }
  let lessArr: number[] = []
  let greaterArr: number[] = []
  let midArr: number[] = []
  const position = arr[Math.floor(arr.length / 2)]
  for (const item of arr) {
    if (item < position) {
      lessArr.push(item)
    } else if (item > position) {
      greaterArr.push(item)
    } else {
      midArr.push(item)
    }
  }
  return quicksortInNewPlace(lessArr).concat(midArr, quicksortInNewPlace(greaterArr))
}

const partitionHoare = (arr: number[], low = 0, high = arr.length - 1): number => {
  // 取中间值可以尽量避免最差情况
  const pivot = arr[Math.floor((low + high) / 2)]
  while (true) {
    // 这里的low和high是指的是数组的索引，而不是数组的元素
    // 这里伪代码使用的
    while (arr[low] < pivot) {
      low++
    }
    while (arr[high] > pivot) {
      high--
    }
    if (low >= high) {
      return high
    }
    swap(arr, low, high)
    // 这里他们使用 Do...While 但是我使用 While
    low++
    high--
  }
}

export const quickSortHoare = (arr: number[], low = 0, high = arr.length - 1) => {
  if (low >= high) {
    return
  }
  const pivotIndex = partitionHoare(arr, low, high)
  quickSortHoare(arr, low, pivotIndex)
  quickSortHoare(arr, pivotIndex + 1, high)
}

const partitionLomuto = (arr: number[], low: number, high: number): number => {
  const pivot = arr[high]
  let pivotIndex = low
  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, pivotIndex)
      pivotIndex++
    }
  }
  swap(arr, pivotIndex, high)
  return pivotIndex
}

export const quickSortLomuto = (arr: number[], low = 0, high = arr.length - 1) => {
  if (low >= high) {
    return
  }
  const pivotIndex: number = partitionLomuto(arr, low, high)
  quickSortLomuto(arr, low, pivotIndex - 1)
  quickSortLomuto(arr, pivotIndex + 1, high)
}

export const quickSortES = ([pivot, ...nums]: number[], desc = false): number[] =>
  pivot === undefined
    ? []
    : [
        ...quickSortES(
          nums.filter((num) => (desc ? num > pivot : num <= pivot)),
          desc
        ),
        pivot,
        ...quickSortES(
          nums.filter((num) => (!desc ? num > pivot : num <= pivot)),
          desc
        ),
      ]

const partitionIterative = (arr: number[], start: number, end: number): number => {
  const pivotValue = arr[end]
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, pivotIndex)
      pivotIndex++
    }
  }

  swap(arr, pivotIndex, end)
  return pivotIndex
}

export const quickSortIterative = (arr: number[]): void => {
  if (arr.length < 2) {
    return
  }
  const stack: number[] = []

  stack.push(0)
  stack.push(arr.length - 1)

  while (stack[stack.length - 1] >= 0) {
    const end = stack.pop()!
    const start = stack.pop()!

    const pivotIndex: number = partitionIterative(arr, start, end)

    if (pivotIndex - 1 > start) {
      stack.push(start)
      stack.push(pivotIndex - 1)
    }
    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1)
      stack.push(end)
    }
  }
}
