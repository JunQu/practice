import { expect } from 'vitest'
import { findClosestElements } from '../binary-search/658-find-k-closest-elements'
import { maxRunTime } from '../binary-search/2141-maximum-running-time-of-n-computers'

it('658 每日一题', () => {
  const arr1 = [1, 2, 3, 4, 5]
  const k1 = 4
  const x1 = 3

  const arr2 = [1, 2, 3, 4]
  const k2 = 4
  const x2 = -1

  const ans1 = [1, 2, 3, 4]

  const arr3 = [1, 1, 1, 10, 10, 10]
  const k3 = 1
  const x3 = 9

  const arr4 = [0, 0, 0, 1, 3, 5, 6, 7, 8, 8]
  const k4 = 2
  const x4 = 2

  expect(findClosestElements(arr1, k1, x1)).toEqual(ans1)
  expect(findClosestElements(arr2, k2, x2)).toEqual(ans1)
  expect(findClosestElements(arr3, k3, x3)).toEqual([10])
  expect(findClosestElements(arr4, k4, x4)).toEqual([1, 3])
})

it.only('2141  同时运行 N 台电脑的最长时间', () => {
  const n1 = 2
  const batteries1 = [3, 3, 3]

  const n2 = 2
  const batteries2 = [1, 1, 1, 1]

  expect(maxRunTime(n1, batteries1)).toBe(4)
  expect(maxRunTime(n2, batteries2)).toBe(2)
})
