import { expect } from 'vitest'
import { judgePoint24 } from '../backtracking/679-24-game'
import { subsets } from '../backtracking/78-subsets'
import { subsetsWithDup } from '../backtracking/90-subsets-II'
import { mazeSolution } from '../backtracking/hj43-maze'
import { permuteUnique } from '../backtracking/47-permutations-II'
import { solveSudoku } from '../backtracking/37-sudoku-solver'

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

it('全排列 permutations II', () => {
  const arr = [1, 1, 2]
  permuteUnique(arr)
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

it('37 解数独', () => {
  const sudoku = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ]
  const ansSudoku = [
    ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
    ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
    ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
    ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
    ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
    ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
    ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
    ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
    ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
  ]

  expect(sudoku).not.toEqual(ansSudoku)
  solveSudoku(sudoku)
  expect(sudoku).toEqual(ansSudoku)
})
