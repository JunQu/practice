import { swap } from './helper'

const iLeftChild = (i: number) => 2 * i + 1
const iRightChild = (i: number) => 2 * i + 2
const iParent = (i: number) => Math.floor((i - 2) / 2)

const heapify2 = (arr: number[], root: number, heapSize: number) => {
  const left = 2 * root + 1
  const right = left + 1
  let max = root
  if (left < heapSize && arr[left] > arr[max]) {
    max = left
  }
  if (right < heapSize && arr[right] > arr[max]) {
    max = right
  }
  if (max !== root) {
    swap(arr, root, max)
    heapify2(arr, max, heapSize)
  }
}

export const heapsort2 = (arr: number[]) => {
  const len = arr.length
  let lastParent = Math.floor((len - 2) / 2)
  for (let i = lastParent; i >= 0; i--) {
    heapify2(arr, i, len)
  }
  for (let i = len - 1; i >= 0; i--) {
    swap(arr, 0, i)
    heapify2(arr, 0, i)
  }
}

export const heapsort = (arr: number[]) => {
  const len = arr.length
  let lastParent = Math.floor((len - 2) / 2)
  while (lastParent >= 0) {
    heapify(arr, lastParent, len)
    lastParent -= 1
  }
  let heapSize = len - 1
  while (heapSize) {
    swap(arr, 0, heapSize)
    heapify(arr, 0, heapSize)
    heapSize -= 1
  }
}

const heapify = (arr: number[], start: number, heapSize: number) => {
  let root = start
  let left = 2 * start + 1
  while (left < heapSize) {
    let right = left + 1
    let max = root
    if (arr[max] < arr[left]) {
      max = left
    }
    if (right < heapSize && arr[max] < arr[right]) {
      max = right
    }
    if (max !== root) {
      swap(arr, root, max)
      root = max
      left = max * 2 + 1
    } else {
      break
    }
  }
}
