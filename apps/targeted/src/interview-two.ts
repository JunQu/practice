/*
原题： leetcode 200 岛屿数量
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。
示例 1：
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
示例 2：
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
*/

class UnionFind {
  parents: number[]
  count: number
  constructor(grid: string[][]) {
    const rowLen = grid.length
    const colLen = grid[0].length
    this.parents = Array<number>(rowLen * colLen)
    this.count = 0

    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        if (grid[row][col] === '1') {
          const idx = row * colLen + col
          this.parents[idx] = idx
          this.count += 1
        }
      }
    }
  }
  find(idx: number): number {
    if (this.parents[idx] !== idx) {
      this.parents[idx] = this.find(this.parents[idx])
    }
    return this.parents[idx]
  }
  union(idxA: number, idxB: number) {
    const parentA = this.find(idxA)
    const parentB = this.find(idxB)
    if (parentA === parentB) {
      return
    }
    this.count -= 1
    this.parents[parentB] = parentA
  }

  get countOfGrid() {
    return this.count
  }
}

const getCount = (grid: string[][]) => {
  const unionFind = new UnionFind(grid)
  const rowLen = grid.length
  const colLen = grid[0].length

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] === '1') {
        const idx = i * colLen + j
        if (i < rowLen - 1 && grid[i + 1][j] === '1') {
          unionFind.union(idx, idx + colLen)
        }
        if (j < colLen - 1 && grid[i][j + 1] === '1') {
          unionFind.union(idx, idx + 1)
        }
      }
    }
  }

  return unionFind.countOfGrid
}

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

console.log(getCount(grid1))
console.log(getCount(grid2))
