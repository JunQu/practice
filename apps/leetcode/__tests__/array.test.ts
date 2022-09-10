import { describe, expect, it } from 'vitest'
import { findKthLargest } from '../array/215-kth-largest-element-in-an-array'
import { maxArea } from '../array/11-container-with-most-water'
import { primePartner } from '../array/hj28-prime-partiner'
import { maxEnvelopes } from '../dp/354-russian-doll-envelopes'
import { leastInterval } from '../array/621-task-scheduler'

describe('Top K th in array', () => {
  it('正常情况', () => {
    const arr = [3, 2, 1, 5, 6, 4]
    const k = 2
    expect(findKthLargest(arr, k)).toBe(5)
  })

  it('重复的情况', () => {
    const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
    const k = 4
    expect(findKthLargest(arr, k)).toBe(4)
  })

  it('超过的情况', () => {
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

it('hj28  素数伴侣  匈牙利算法，最多匹配 ', () => {
  const arr1 = [3, 6]
  const arr2 = [3, 14]
  const arr3 = [2, 5, 6, 13]
  const arr4 = [2, 5, 6, 13, 8, 23]

  expect(primePartner(arr1)).toBe(0)
  expect(primePartner(arr2)).toBe(1)
  expect(primePartner(arr3)).toBe(2)
  expect(primePartner(arr4)).toBe(3)
})

it('354 俄罗斯套娃信封问题', () => {
  const envelopes1 = [
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ]
  const envelopes2 = [
    [1, 1],
    [1, 1],
    [1, 1],
  ]
  const envelopes3 = [
    [1, 3],
    [3, 5],
    [6, 7],
    [6, 8],
    [8, 4],
    [9, 5],
  ]
  const envelopes4 = [
    [10, 8],
    [1, 12],
    [6, 15],
    [2, 18],
  ]
  const envelopes5 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [5, 5],
    [6, 7],
    [7, 8],
  ]

  expect(maxEnvelopes(envelopes1)).toBe(3)
  expect(maxEnvelopes(envelopes2)).toBe(1)
  expect(maxEnvelopes(envelopes3)).toBe(3)
  expect(maxEnvelopes(envelopes4)).toBe(2)
  expect(maxEnvelopes(envelopes5)).toBe(7)
})

it('621 任务调度器', () => {
  const task1 = ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
  const n1 = 2

  const tasks2 = ['A', 'A', 'A', 'B', 'B', 'B']
  const n2 = 0

  const tasks3 = ['A', 'A', 'A', 'B', 'B', 'B']
  const n3 = 2

  const tasks4 = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'D', 'E']
  const n4 = 2

  expect(leastInterval(task1, n1)).toBe(16)
  expect(leastInterval(tasks2, n2)).toBe(6)
  expect(leastInterval(tasks3, n3)).toBe(8)
  expect(leastInterval(tasks4, n4)).toBe(12)
})
