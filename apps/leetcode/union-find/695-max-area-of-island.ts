export const maxAreaOfIsland = (grid: number[][]): number => {
  const unionFind = new UnionFind(grid)
  const rowLen = grid.length
  const colLen = grid[0].length
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] === 1) {
        const idx = i * colLen + j
        // 因为从左到右，从上到下，所以扫描两个方向就行
        // 下部分连接
        if (i < rowLen - 1 && grid[i + 1][j] === 1) {
          unionFind.union(idx, idx + colLen)
        }
        // 右部分连接
        if (j < colLen - 1 && grid[i][j + 1] === 1) {
          unionFind.union(idx, idx + 1)
        }
      }
    }
  }
  return unionFind.getMaxRank()
}

class UnionFind {
  parents: number[] = []
  rank: number[] = []

  constructor(grid: number[][]) {
    const rowLen = grid.length
    const colLen = grid[0].length
    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        const idx = row * colLen + col
        this.parents[idx] = grid[row][col] === 1 ? idx : -1
        this.rank[idx] = grid[row][col] === 1 ? 1 : 0
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

  getMaxRank(): number {
    return Math.max(...this.rank)
  }
}
