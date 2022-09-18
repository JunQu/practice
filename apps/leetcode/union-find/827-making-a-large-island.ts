// 这看起来是个很复杂的题目或者很不好懂的代码
// 其实思维方式很简单，只是代码实现上看起来很复杂
// 首先把每个岛连起来，形成各个大岛
// 再分别尝试水中的区域，连接周围的岛，这是一个虚假的连接，所以是分别讨论了情况
// eslint-disable-next-line complexity
export const largestIsland = (grid: number[][]): number => {
  let max = 0
  const uf = new UnionFind(grid)
  const rowLen = grid.length
  const colLen = grid[0].length
  const getIdx = (row: number, col: number) => row * colLen + col

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (grid[row][col] === 1) {
        if (row < rowLen - 1 && grid[row + 1][col] === 1) {
          uf.union(getIdx(row, col), getIdx(row + 1, col))
        }
        if (col < colLen - 1 && grid[row][col + 1]) {
          uf.union(getIdx(row, col), getIdx(row, col + 1))
        }
      }
    }
  }
  max = uf.maxRank
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (grid[row][col] === 0) {
        const top = row > 0 && grid[row - 1][col] === 1 ? uf.find(getIdx(row - 1, col)) : -1
        const bottom = row < rowLen - 1 && grid[row + 1][col] === 1 ? uf.find(getIdx(row + 1, col)) : -1
        const left = col > 0 && grid[row][col - 1] === 1 ? uf.find(getIdx(row, col - 1)) : -1
        const right = col < colLen - 1 && grid[row][col + 1] === 1 ? uf.find(getIdx(row, col + 1)) : -1

        let count = top === -1 ? 1 : uf.getSize(top) + 1
        // 把上下左右不是一个岛的连起来
        if (bottom !== -1 && bottom !== top) {
          count += uf.getSize(bottom)
        }
        if (right !== -1 && right !== top && right !== bottom) {
          count += uf.getSize(right)
        }
        if (left !== -1 && left !== top && left !== bottom && left !== right) {
          count += uf.getSize(left)
        }

        max = count > max ? count : max
      }
    }
  }

  return max
}

class UnionFind {
  rank: number[]
  parents: number[]

  constructor(grid: number[][]) {
    const rowLen = grid.length
    const colLen = grid[0].length
    this.rank = Array<number>(rowLen * colLen).fill(1)
    this.parents = Array<number>(rowLen * colLen).fill(-1)

    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        if (grid[row][col] === 1) {
          const idx = row * colLen + col
          this.parents[idx] = idx
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
    const pA = this.find(idxA)
    const pB = this.find(idxB)
    if (pA === pB) {
      return
    }
    if (this.rank[pA] >= this.rank[pB]) {
      this.parents[pB] = pA
      this.rank[pA] += this.rank[pB]
    } else {
      this.parents[pA] = pB
      this.rank[pB] += this.rank[pA]
    }
  }

  getSize(idx: number) {
    return this.rank[this.find(idx)]
  }

  get maxRank() {
    return Math.max(...this.rank)
  }
}
