import { expect } from 'vitest'
import { judgePoint24 } from '../backtracking/679-24-game'
import { subsets } from '../backtracking/78-subsets'
import { subsetsWithDup } from '../backtracking/90-subsets-II'
import { mazeSolution } from '../backtracking/hj43-maze'
import { permuteUnique } from '../backtracking/47-permutations-II'
import { solveSudoku } from '../backtracking/37-sudoku-solver'
import { removeInvalidParentheses } from '../backtracking/301-remove-invalid-parentheses'
import { countArrangement } from '../backtracking/526-beautiful-arrangement'
import { letterCombinations } from '../backtracking/17-letter-combinations-of-a-phone-number'
import { generateParenthesis } from '../backtracking/22-generate-parentheses'
import { combinationSum } from '../backtracking/39-combination-sum'
import { combinationSum2 } from '../backtracking/40-combination-sum-ii'
import { combinationSum3 } from '../backtracking/216-combination-sum-iii'
import { combine } from '../backtracking/77-combinations'
import { readBinaryWatch } from '../backtracking/401-binary-watch'
import { findSubsequences } from '../backtracking/491-increasing-subsequences'
import { solveNQueens } from '../backtracking/51-n-queens'
import { exist } from '../backtracking/79-word-search'

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

it('301 删除无效的括号', () => {
  const str1 = '()())()'
  const ans1 = ['(())()', '()()()']

  const str2 = '(a)())()'
  const ans2 = ['(a())()', '(a)()()']

  const str3 = ')('
  const ans3 = ['']

  const str4 = '(r(()()('
  const ans4 = ['r()()', 'r(())', '(r)()', '(r())']

  expect(removeInvalidParentheses(str1)).toEqual(ans1)
  expect(removeInvalidParentheses(str2)).toEqual(ans2)
  expect(removeInvalidParentheses(str3)).toEqual(ans3)
  expect(removeInvalidParentheses(str4)).toEqual(ans4)
})

it('526 优美的排列', () => {
  const num1 = 1
  const num2 = 2
  const num3 = 3

  expect(countArrangement(num1)).toBe(1)
  expect(countArrangement(num2)).toBe(2)
  expect(countArrangement(num3)).toBe(3)
})

it('17 电话号码字母组合', () => {
  const digits1 = '23'
  const ans1 = ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']

  const digits2 = ''
  const ans2: string[] = ['']

  const digits3 = '2'
  const ans3 = ['a', 'b', 'c']

  expect(letterCombinations(digits1)).toEqual(ans1)
  expect(letterCombinations(digits2)).toEqual(ans2)
  expect(letterCombinations(digits3)).toEqual(ans3)
})

it('22 括号生成', () => {
  const n1 = 1
  const ans1 = ['()']
  const n2 = 3
  const ans2 = ['((()))', '(()())', '(())()', '()(())', '()()()']

  expect(generateParenthesis(n1)).toEqual(ans1)
  expect(generateParenthesis(n2)).toEqual(ans2)
})

it('39 组合总和', () => {
  const candidates1 = [2, 3, 6, 7]
  const target1 = 7
  const ans1 = [[2, 2, 3], [7]]

  const candidates2 = [2, 3, 5]
  const target2 = 8
  const ans2 = [
    [2, 2, 2, 2],
    [2, 3, 3],
    [3, 5],
  ]

  const candidates3 = [2]
  const target3 = 1
  const ans3: number[][] = []

  expect(combinationSum(candidates1, target1)).toEqual(ans1)
  expect(combinationSum(candidates2, target2)).toEqual(ans2)
  expect(combinationSum(candidates3, target3)).toEqual(ans3)
})

it('40 组合总和 II ', () => {
  const candidates1 = [10, 1, 2, 7, 6, 1, 5]
  const target1 = 8
  const ans1 = [
    [1, 1, 6],
    [1, 2, 5],
    [1, 7],
    [2, 6],
  ]

  const candidates2 = [2]
  const target2 = 1
  const ans2: number[][] = []

  const candidates3 = [2]
  const target3 = 2
  const ans3 = [[2]]

  const candidates4 = [2, 5, 2, 1, 2]
  const target4 = 5
  const ans4 = [[1, 2, 2], [5]]

  const candidates5 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const target5 = 20
  const ans5 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

  expect(combinationSum2(candidates1, target1)).toEqual(ans1)
  expect(combinationSum2(candidates2, target2)).toEqual(ans2)
  expect(combinationSum2(candidates3, target3)).toEqual(ans3)
  expect(combinationSum2(candidates4, target4)).toEqual(ans4)
  expect(combinationSum2(candidates5, target5)).toEqual(ans5)
})

it('216  组合总和 III', () => {
  const k1 = 3
  const n1 = 7
  const ans1 = [[1, 2, 4]]

  const k2 = 3
  const n2 = 9
  const ans2 = [
    [1, 2, 6],
    [1, 3, 5],
    [2, 3, 4],
  ]

  const k3 = 4
  const n3 = 1
  const ans3: number[][] = []

  expect(combinationSum3(k1, n1)).toEqual(ans1)
  expect(combinationSum3(k2, n2)).toEqual(ans2)
  expect(combinationSum3(k3, n3)).toEqual(ans3)
})

it('77 组合', () => {
  const n1 = 4
  const k1 = 2
  const ans1 = [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4],
  ]

  const n2 = 1
  const k2 = 1
  const ans2 = [[1]]

  expect(combine(n1, k1)).toEqual(ans1)
  expect(combine(n2, k2)).toEqual(ans2)
})

it('401 二进制手表', () => {
  const turnOn1 = 1
  const turnOn2 = 9
  const turnOn3 = 2

  const ans1 = ['1:00', '2:00', '4:00', '8:00', '0:01', '0:02', '0:04', '0:08', '0:16', '0:32']
  const ans2: string[] = []
  const ans3 = [
    '3:00',
    '5:00',
    '9:00',
    '1:01',
    '1:02',
    '1:04',
    '1:08',
    '1:16',
    '1:32',
    '6:00',
    '10:00',
    '2:01',
    '2:02',
    '2:04',
    '2:08',
    '2:16',
    '2:32',
    '4:01',
    '4:02',
    '4:04',
    '4:08',
    '4:16',
    '4:32',
    '8:01',
    '8:02',
    '8:04',
    '8:08',
    '8:16',
    '8:32',
    '0:03',
    '0:05',
    '0:09',
    '0:17',
    '0:33',
    '0:06',
    '0:10',
    '0:18',
    '0:34',
    '0:12',
    '0:20',
    '0:36',
    '0:24',
    '0:40',
    '0:48',
  ] // 顺序不唯一

  expect(readBinaryWatch(turnOn1)).toEqual(ans1)
  expect(readBinaryWatch(turnOn2)).toEqual(ans2)
  expect(readBinaryWatch(turnOn3)).toEqual(ans3)
  expect(readBinaryWatch(0)).toEqual(['0:00'])
})

it('491 递增子序列', () => {
  const nums1 = [4, 6, 7, 7]
  const ans1 = [
    [4, 6],
    [4, 6, 7],
    [4, 6, 7, 7],
    [4, 7],
    [4, 7, 7],
    [6, 7],
    [6, 7, 7],
    [7, 7],
  ]

  // 整数需要考虑负数，非负数需要考虑小数
  // 不要用 - 作为数字的连接
  const nums2 = [-100, -99, -98, -97, -96, -96]
  const ans2 = [
    [-100, -99],
    [-100, -99, -98],
    [-100, -99, -98, -97],
    [-100, -99, -98, -97, -96],
    [-100, -99, -98, -97, -96, -96],
    [-100, -99, -98, -96],
    [-100, -99, -98, -96, -96],
    [-100, -99, -97],
    [-100, -99, -97, -96],
    [-100, -99, -97, -96, -96],
    [-100, -99, -96],
    [-100, -99, -96, -96],
    [-100, -98],
    [-100, -98, -97],
    [-100, -98, -97, -96],
    [-100, -98, -97, -96, -96],
    [-100, -98, -96],
    [-100, -98, -96, -96],
    [-100, -97],
    [-100, -97, -96],
    [-100, -97, -96, -96],
    [-100, -96],
    [-100, -96, -96],
    [-99, -98],
    [-99, -98, -97],
    [-99, -98, -97, -96],
    [-99, -98, -97, -96, -96],
    [-99, -98, -96],
    [-99, -98, -96, -96],
    [-99, -97],
    [-99, -97, -96],
    [-99, -97, -96, -96],
    [-99, -96],
    [-99, -96, -96],
    [-98, -97],
    [-98, -97, -96],
    [-98, -97, -96, -96],
    [-98, -96],
    [-98, -96, -96],
    [-97, -96],
    [-97, -96, -96],
    [-96, -96],
  ]

  expect(findSubsequences(nums1)).toEqual(ans1)
  expect(findSubsequences(nums2)).toEqual(ans2)
})

// 没做过 8 皇后的回溯，总觉得缺少点什么
it('51 N 皇后', () => {
  const n1 = 4
  const ans1 = [
    ['.Q..', '...Q', 'Q...', '..Q.'],
    ['..Q.', 'Q...', '...Q', '.Q..'],
  ]

  const n2 = 1
  const ans2 = [['Q']]

  expect(solveNQueens(n1)).toEqual(ans1)
  expect(solveNQueens(n2)).toEqual(ans2)
})

it.only('79 单词搜索', () => {
  const board1 = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ]
  const word1 = 'ABCCED'

  const board2 = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ]
  const word2 = 'SECB'

  const board3 = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ]
  const word3 = 'SEE'

  const board4 = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ]
  const word4 = 'ABCB'

  const board5 = [
    ['C', 'A', 'A'],
    ['A', 'A', 'A'],
    ['B', 'C', 'D'],
  ]

  const word5 = 'AAB'

  const board6 = [['b'], ['a'], ['b'], ['b'], ['a']]
  const word6 = 'baa'

  expect(exist(board1, word1)).toEqual(true)
  expect(exist(board2, word2)).toEqual(true)
  expect(exist(board3, word3)).toEqual(true)
  expect(exist(board4, word4)).toEqual(false)
  expect(exist(board5, word5)).toEqual(true)
  expect(exist(board6, word6)).toEqual(false)
})
