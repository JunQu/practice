import { expect } from 'vitest'
import { minimumRecolors } from './6156-minimum-recolors-to-get-k-consecutive-black-blocks'
import { secondsToRemoveOccurrences } from './6157-time-needed-to-rearrange-a-binary-string'
import { shiftingLetters } from './6158-shifting-letters-ii'
import { maximumSegmentSum } from './6159-maximum-segment-sum-after-removals'

it('6156', () => {
  const blocks = 'WBWBBBW'
  const k = 2

  expect(minimumRecolors(blocks, k)).toBe(0)
})

it('6157', () => {
  // 暴力法超时
  // TODO 学习并查集
  const s1 = '0110101'
  const s2 = '001011'
  const s3 = '11100'

  expect(secondsToRemoveOccurrences(s1)).toBe(4)
  expect(secondsToRemoveOccurrences(s2)).toBe(4)
  expect(secondsToRemoveOccurrences(s3)).toBe(0)
})

it.only('6158', () => {
  // 暴力法不超时
  // TODO 差分数组，区间合并
  const s = 'abc'
  const shifts = [
    [0, 1, 0],
    [1, 2, 1],
    [0, 2, 1],
  ]

  const s2 = 'dztz'
  const shifts2 = [
    [0, 0, 0],
    [1, 1, 1],
  ]

  expect(shiftingLetters(s, shifts)).toEqual('ace')
  expect(shiftingLetters(s2, shifts2)).toEqual('catz')
})

it('6159', () => {
  const nums = [1, 2, 5, 6, 1]
  const removeQueries = [0, 3, 2, 4, 1]
  expect(maximumSegmentSum(nums, removeQueries)).toEqual([14, 7, 2, 2, 0])
})
