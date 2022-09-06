import { expect } from 'vitest'
import { calcEquation } from '../union-find/399-evaluate-division'
import { numIslandsUnionFind } from '../dfs/200-number-of-islands'
import { numIslands2 } from '../union-find/305-number-of-island-II'

it.skip('399 除法求值 题目真的有点难,虽然是中等', () => {
  const equations = [
    ['a', 'b'],
    ['b', 'c'],
  ]
  const values = [2.0, 3.0]
  const queries = [
    ['a', 'c'],
    ['b', 'a'],
    ['a', 'e'],
    ['a', 'a'],
    ['x', 'x'],
  ]
  const ans = [6.0, 0.5, -1.0, 1.0, -1.0]

  const eq2 = [
    ['a', 'b'],
    ['e', 'f'],
    ['b', 'e'],
  ]
  const val2 = [3.4, 1.4, 2.3]
  const query2 = [
    ['b', 'a'],
    ['a', 'f'],
    ['f', 'f'],
    ['e', 'e'],
    ['c', 'c'],
    ['a', 'c'],
    ['f', 'e'],
  ]
  const ans2 = [0.29412, 10.948, 1.0, 1.0, -1.0, -1.0, 0.71429]

  expect(calcEquation(equations, values, queries)).toEqual(ans)
  expect(calcEquation(eq2, val2, query2)).toEqual(ans2)
})

it('200 岛屿数量', () => {
  const grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ]

  const grid2 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ]
  const grid3 = [
    ['1', '1', '1'],
    ['0', '1', '0'],
    ['1', '1', '1'],
  ]

  expect(numIslandsUnionFind(grid1)).toBe(1)
  expect(numIslandsUnionFind(grid2)).toBe(3)
  expect(numIslandsUnionFind(grid3)).toBe(1)
})

it.only('305 岛屿的数量2', () => {
  const n = 4
  const m = 5
  const operations = [
    [1, 1],
    [0, 1],
    [3, 3],
    [3, 4],
  ]
  const ans = [1, 1, 2, 2]

  expect(numIslands2(n, m, operations)).toEqual(ans)
  expect(
    numIslands2(3, 3, [
      [0, 0],
      [0, 1],
      [2, 2],
      [2, 1],
    ])
  ).toEqual([1, 1, 2, 2])
})
