import { describe, expect, it } from 'vitest'
import { findKthLargest } from '../array/215-kth-largest-element-in-an-array'
import { maxArea } from '../array/11-container-with-most-water'

describe('Top K th in array', () => {
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
})

describe('11 盛最多水的容器', () => {
  it('基础的情况', () => {
    const height1 = [1, 1]
    const height2 = [1, 2, 3]

    expect(maxArea(height1)).toBe(1)
    expect(maxArea(height2)).toBe(2)
  })

  it('更多的容器', () => {
    const height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    const height2 = [5, 6, 7, 4, 5, 10, 2, 3, 6, 9, 11, 5, 7]

    expect(maxArea(height1)).toBe(49)
    expect(maxArea(height2)).toBe(70)
  })
})
