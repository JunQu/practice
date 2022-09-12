import { expect } from 'vitest'
import { mostBooked } from '../weekly/6170-meeting-rooms-iii'
import { getLengthOfWaterfallFlow, minCostToTravelOnDays } from '../weekly/AutoX-contest'
import { minimumRecolors } from '../weekly/6156-minimum-recolors-to-get-k-consecutive-black-blocks'
import { secondsToRemoveOccurrences } from '../weekly/6157-time-needed-to-rearrange-a-binary-string'
import { shiftingLetters } from '../weekly/6158-shifting-letters-ii'
import { maximumSegmentSum } from '../weekly/6159-maximum-segment-sum-after-removals'

it('6170 meeting rooms iii', () => {
  const meetings1 = [
    [0, 10],
    [1, 5],
    [2, 7],
    [3, 4],
  ]
  const meetings2 = [
    [1, 20],
    [2, 10],
    [3, 5],
    [4, 9],
    [6, 8],
  ]
  const meetings3 = [
    [1, 10],
    [3, 5],
    [15, 20],
    [30, 40],
  ]

  expect(mostBooked(2, meetings1)).toBe(0)
  expect(mostBooked(3, meetings2)).toBe(1)
  expect(mostBooked(2, meetings3)).toBe(0)
})

it('max', () => {
  expect(getLengthOfWaterfallFlow(3, [9, 5, 8, 6])).toBe(11)
  expect(getLengthOfWaterfallFlow(2, [9, 1, 1, 1, 1, 1])).toBe(9)
})

it('minCostToTravelOnDays', () => {
  const arr1 = [1, 2, 3, 4]
  const tickets1 = [
    [1, 3],
    [2, 5],
    [3, 7],
  ]
  const arr2 = [1, 4, 5]

  const tickets2 = [
    [1, 4],
    [5, 6],
    [2, 5],
  ]
  const arr3 = [4, 5, 6, 500000000, 1000000000]

  const tickets3 = [
    [1, 224],
    [2, 318],
    [3, 432],
  ]

  expect(minCostToTravelOnDays(arr1, tickets1)).toBe(10)
  expect(minCostToTravelOnDays(arr2, tickets2)).toBe(6)
  expect(minCostToTravelOnDays(arr3, tickets3)).toBe(880)
})

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

it('2381 字母偏移', () => {
  // 暴力法不超时
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
