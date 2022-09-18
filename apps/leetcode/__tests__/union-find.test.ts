import { expect } from 'vitest'
import { calcEquation } from '../union-find/399-evaluate-division'
import { numIslandsUnionFind } from '../dfs/200-number-of-islands'
import { numIslands2 } from '../union-find/305-number-of-island-II'
import { findCircleNum } from '../union-find/547-number-of-provinces'
import { longestConsecutive } from '../union-find/128-longest-consecutive-sequence'
import { solve } from '../union-find/130-surrounded-regions'
import { findRedundantConnection } from '../union-find/684-redundant-connection'
import { findRedundantDirectedConnection } from '../union-find/685-redundant-connection-II'
import { minSwapsCouples } from '../union-find/765-couples-holding-hands'
import { maxAreaOfIsland } from '../union-find/695-max-area-of-island'
import { hitBricks } from '../union-find/803-bricks-falling-when-hit'
import { largestIsland } from '../union-find/827-making-a-large-island'

/**
 *
 * 前面两题就是并查集的模版题
 * 几乎是并查集的模版题目
 * 它就是按照并查集的样子而出的题目
 * 实践并查集的不二选择
 *
 */

it('547 省份数量 findCircleNum', () => {
  const isConnected1 = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]
  const isConnected2 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]

  expect(findCircleNum(isConnected1)).toBe(2)
  expect(findCircleNum(isConnected2)).toBe(3)
})

it('684 冗余连接', () => {
  const edges1 = [
    [1, 2],
    [1, 3],
    [2, 3],
  ]
  const edges2 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5],
  ]

  expect(findRedundantConnection(edges1)).toEqual([2, 3])
  expect(findRedundantConnection(edges2)).toEqual([1, 4])
})

it('685 冗余连接 II', () => {
  const edges1 = [
    [1, 2],
    [1, 3],
    [2, 3],
  ]
  const edges2 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
    [1, 5],
  ]
  const edges3 = [
    [2, 1],
    [3, 1],
    [4, 2],
    [1, 4],
  ]

  expect(findRedundantDirectedConnection(edges1)).toEqual([2, 3])
  expect(findRedundantDirectedConnection(edges2)).toEqual([4, 1])
  expect(findRedundantDirectedConnection(edges3)).toEqual([2, 1])
})

it('128 最长连续序列', () => {
  const nums1 = [100, 4, 200, 1, 3, 2]
  const nums2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
  const nums3 = [2, 2, 3, 1, 500, 12, 5, 6, 9, 10, 8, 3, 7]

  expect(longestConsecutive(nums1)).toBe(4)
  expect(longestConsecutive(nums2)).toBe(9)
  expect(longestConsecutive(nums3)).toBe(6)
})

it('130 被围绕的区域', () => {
  const board = [
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'O', 'X'],
    ['X', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'X'],
  ]
  const ans = [
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'X', 'X'],
  ]
  expect(board).not.toBe(ans)
  solve(board)
  expect(board).toEqual(ans)
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

it('305 岛屿的数量2', () => {
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

it('695 岛屿的最大面积', () => {
  const grid1 = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ]
  const grid2 = [[0, 0, 0, 0, 0, 0, 0, 0]]

  expect(maxAreaOfIsland(grid1)).toBe(6)
  expect(maxAreaOfIsland(grid2)).toBe(0)
})

it('765 情侣牵手', () => {
  const row1 = [0, 2, 1, 3]
  const row2 = [3, 2, 0, 1]

  expect(minSwapsCouples(row1)).toBe(1)
  expect(minSwapsCouples(row2)).toBe(0)
})

it.skip('399 除法求值 题目真的有点难,虽然是中等,因为浮点数问题导致验证不正确', () => {
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

// 逆向思维的不错题目
it('803 打砖块', () => {
  const grid1 = [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
  ]
  const hits1 = [[1, 0]]
  const ans1 = [2]

  const grid2 = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
  ]

  const hits2 = [
    [1, 1],
    [1, 0],
  ]
  const ans2 = [0, 0]

  const grid3 = [[1], [1], [1], [1], [1]]
  const hits3 = [
    [3, 0],
    [4, 0],
    [1, 0],
    [2, 0],
    [0, 0],
  ]
  const ans3 = [1, 0, 1, 0, 0]

  const grid4 = [
    [1, 0, 1],
    [1, 1, 1],
  ]
  const hits4 = [
    [0, 0],
    [0, 2],
    [1, 1],
  ]
  const ans4 = [0, 3, 0]

  expect(hitBricks(grid1, hits1)).toEqual(ans1)
  expect(hitBricks(grid2, hits2)).toEqual(ans2)
  expect(hitBricks(grid3, hits3)).toEqual(ans3)
  expect(hitBricks(grid4, hits4)).toEqual(ans4)
})

it('827 最大人工岛', () => {
  const grid1 = [
    [1, 0],
    [0, 1],
  ]

  const grid2 = [
    [1, 1],
    [1, 0],
  ]

  const grid3 = [
    [1, 1],
    [1, 1],
  ]

  expect(largestIsland(grid1)).toBe(3)
  expect(largestIsland(grid2)).toBe(4)
  expect(largestIsland(grid3)).toBe(4)
})
