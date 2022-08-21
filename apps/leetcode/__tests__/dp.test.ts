import { expect } from 'vitest'
import { rob } from '../dp/198-house-robber'
import { rob as rob2 } from '../dp/213-house-robber-ii'
import { minPathSum } from '../dp/64-minimun-path-sum'
import { lengthOfLIS } from '../dp/300-longest-increasing-subsequence'

it('198 house robber', () => {
  const arr = [1, 2, 3, 1]
  const arr2 = [2, 7, 9, 3, 1]
  expect(rob(arr)).toEqual(4)
  expect(rob(arr2)).toEqual(12)
})

it('213 house robber II', () => {
  const nums1 = [2, 3, 2]
  const nums2 = [1, 2, 3, 1]
  const nums3 = [1, 2, 3]
  const nums4 = [2]

  expect(rob2(nums1)).toBe(3)
  expect(rob2(nums2)).toBe(4)
  expect(rob2(nums3)).toBe(3)
  expect(rob2(nums4)).toBe(2)
})

it('64 min path ', () => {
  const grid1 = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ]
  const grid2 = [
    [1, 2, 3],
    [4, 5, 6],
  ]
  const grid3 = [[1]]

  const grid4 = [
    [1, 2],
    [1, 1],
  ]

  expect(minPathSum(grid1)).toBe(7)
  expect(minPathSum(grid2)).toBe(12)
  expect(minPathSum(grid3)).toBe(1)
  expect(minPathSum(grid4)).toBe(3)
})

it.only('300 long increasing subsequence', () => {
  const nums1 = [10, 9, 2, 5, 3, 7, 101, 18]
  const nums2 = [0, 1, 0, 3, 2, 3]
  const nums3 = [7, 7, 7, 7, 7, 7, 7]
  const nums4 = [1, 3, 6, 7, 9, 4, 10, 5, 6]

  expect(lengthOfLIS(nums1)).toBe(4)
  expect(lengthOfLIS(nums2)).toBe(4)
  expect(lengthOfLIS(nums3)).toBe(1)
  expect(lengthOfLIS(nums4)).toBe(6)
})
