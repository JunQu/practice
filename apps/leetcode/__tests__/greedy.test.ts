import { expect } from 'vitest'
import { candy } from '../greedy/135-candy'
import { canJump } from '../greedy/55-jump-game'
import { jump } from '../greedy/45-jump-game-ii'
import { numRescueBoats } from '../greedy/881-boats-to-save-people'
import { eraseOverlapIntervals } from '../greedy/435-non-overlapping-intervals'

// 贪心的策略很重要
it('135 分糖果', () => {
  const ratings1 = [1, 0, 2]
  const ratings2 = [1, 2, 2]

  expect(candy(ratings1)).toBe(5)
  expect(candy(ratings2)).toBe(4)
})

it('55 跳跃游戏', () => {
  const nums1 = [2, 3, 1, 1, 4]
  const nums2 = [3, 2, 1, 0, 4]
  const nums3 = [2, 2, 1, 0, 1, 3, 4]

  expect(canJump(nums1)).toBe(true)
  expect(canJump(nums2)).toBe(false)
  expect(canJump(nums3)).toBe(false)
})

it('45 跳跃游戏', () => {
  const nums1 = [2, 3, 1, 1, 4]
  const nums2 = [2, 3, 0, 1, 4]

  expect(jump(nums1)).toBe(2)
  expect(jump(nums2)).toBe(2)
})

it('881. 救生艇', () => {
  const people1 = [1, 2]
  const limit1 = 3

  const people2 = [3, 2, 2, 1]
  const limit2 = 3

  const people3 = [3, 5, 3, 4]
  const limit3 = 5

  expect(numRescueBoats(people1, limit1)).toBe(1)
  expect(numRescueBoats(people2, limit2)).toBe(3)
  expect(numRescueBoats(people3, limit3)).toBe(4)
})

it('435. 无重叠区间', () => {
  const intervals1 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ]

  const intervals2 = [
    [1, 2],
    [1, 2],
    [1, 2],
  ]

  const intervals3 = [
    [1, 2],
    [2, 3],
  ]

  expect(eraseOverlapIntervals(intervals1)).toBe(1)
  expect(eraseOverlapIntervals(intervals2)).toBe(2)
  expect(eraseOverlapIntervals(intervals3)).toBe(0)
})
