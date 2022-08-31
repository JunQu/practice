import { rob } from '../dp/198-house-robber'
import { expect } from 'vitest'
import { fullPack, knapPack } from '../dp/knappack'
import { rob2 } from '../dp/213-house-robber-ii'
import { rob3 } from '../dp/337-house-robber-III'
import { minPathSum } from '../dp/64-minimun-path-sum'
import { lengthOfLIS } from '../dp/300-longest-increasing-subsequence'
import { hj61ApplesPlates } from '../dp/hj61-apples-plates'
import { numsToTree } from 'numstree'
import { longestCommonSubsequence } from '../dp/1143-longest-common-subsequence'

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

it('337 house robber III', () => {
  const root1 = numsToTree([3, 2, 3, null, 3, null, 1])
  const root2 = numsToTree([3, 4, 5, 1, 3, null, 1])
  const root3 = numsToTree([2, 1, 3, null, 4])

  expect(rob3(root1)).toBe(7)
  expect(rob3(root2)).toBe(9)
  expect(rob3(root3)).toBe(7)
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

it('300 long increasing subsequence', () => {
  const nums1 = [10, 9, 2, 5, 3, 7, 101, 18]
  const nums2 = [0, 1, 0, 3, 2, 3]
  const nums3 = [7, 7, 7, 7, 7, 7, 7]
  const nums4 = [1, 3, 6, 7, 9, 4, 10, 5, 6]

  expect(lengthOfLIS(nums1)).toBe(4)
  expect(lengthOfLIS(nums2)).toBe(4)
  expect(lengthOfLIS(nums3)).toBe(1)
  expect(lengthOfLIS(nums4)).toBe(6)
})

it('apples plates', () => {
  const item1 = [7, 3]

  expect(hj61ApplesPlates(item1[0], item1[1])).toBe(8)
})

it(' 0 1 knappack', () => {
  const weights = [2, 4, 1]
  const values = [10, 5, 4]
  const volume = 5

  expect(knapPack(weights, values, volume)).toEqual(14)
  expect(fullPack(weights, values, volume)).toEqual(9)
})

it('1143 最长公共子序列', () => {
  const sss1 = ['cdad', 'abcde']
  const sss2 = ['ace', 'abc']
  const sss3 = ['def', 'abc']
  const sss4 = ['a', 'abc']

  expect(longestCommonSubsequence(sss1[0], sss1[1])).toBe(2)
  expect(longestCommonSubsequence(sss2[0], sss2[1])).toBe(2)
  expect(longestCommonSubsequence(sss3[0], sss3[1])).toBe(0)
  expect(longestCommonSubsequence(sss4[0], sss4[1])).toBe(1)
})
