import { expect, it } from 'vitest'
import { findKthLargest } from './solution'

it('正常情况', function () {
  const arr = [3, 2, 1, 5, 6, 4]
  const k = 2
  expect(findKthLargest(arr, k)).toBe(5)
})

it('重复的情况', function () {
  const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
  const k = 4
  expect(findKthLargest(arr, k)).toBe(4)
})

it('超过的情况', function () {
  const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
  const k = 10
  expect(findKthLargest(arr, k)).toBe(1)
})
