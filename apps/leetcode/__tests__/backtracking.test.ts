import { expect } from 'vitest'
import { judgePoint24 } from '../backtracking/679-24-game'
import { subsets } from '../backtracking/78-subsets'
import { subsetsWithDup } from '../backtracking/90-subsets-II'
import { mazeSolution } from '../backtracking/hj43-maze'
import { permuteUnique } from '../backtracking/47-permutations-II'

it('24 game', () => {
  const nums1 = [7, 2, 1, 10]
  const nums2 = [1, 2, 1, 2]

  expect(judgePoint24(nums1)).toBe(true)
  expect(judgePoint24(nums2)).toBe(false)
})

it('子集 subset I, all element is unique', () => {
  const arr = [1, 2, 3]
  const path = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]

  expect(subsets(arr)).toEqual(path)
})

it('子集 subset II, element ', () => {
  const arr = [1, 2, 2]
  const path = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]

  expect(subsetsWithDup(arr)).toEqual(path)
})

it.only('全排列 permutations II', () => {
  const arr = [1, 1, 2]
  permuteUnique(arr)
  expect(2).toBe(3)
})

it('find path in maze', () => {
  const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
  ]
  const path = ['(0,0)', '(1,0)', '(2,0)', '(2,1)', '(2,2)', '(2,3)', '(2,4)', '(3,4)', '(4,4)']

  expect(mazeSolution(maze)).toEqual(path)
})
