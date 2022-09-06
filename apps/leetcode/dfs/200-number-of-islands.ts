export const numIslands = (grid: string[][]): number => {
  let count = 0

  const dfs = (grid: string[][], x: number, y: number): void => {
    if (y < 0 || x < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] !== '1') {
      return
    }
    grid[x][y] = '2'
    if (x > 0 && grid[x - 1][y] === '1') {
      dfs(grid, x - 1, y)
    }
    if (y > 0 && grid[x][y - 1] === '1') {
      dfs(grid, x, y - 1)
    }
    if (x < grid.length - 1 && grid[x + 1][y] === '1') {
      dfs(grid, x + 1, y)
    }
    if (y < grid[0].length - 1 && grid[x][y + 1] === '1') {
      dfs(grid, x, y + 1)
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count += 1
        dfs(grid, i, j)
      }
    }
  }

  return count
}

// 使用并查集解决问题

export const numIslandsUnionFind = (grid: string[][]) => {
  const unionFind = new UnionFind(grid)

  const rowLen = grid.length
  const colLen = grid[0].length

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < colLen; col++) {
      // 因为全部都顺序遍历，关注右边和下边就行
      if (grid[row][col] === '1') {
        const idx = row * colLen + col
        if (row < rowLen - 1 && grid[row + 1][col] === '1') {
          unionFind.union(idx, (row + 1) * colLen + col)
        }
        if (col < colLen - 1 && grid[row][col + 1] === '1') {
          unionFind.union(idx, row * colLen + col + 1)
        }
      }
    }
  }

  return unionFind.getCount()
}

class UnionFind {
  parents: number[] = []
  rank: number[] = []
  count = 0

  constructor(grid: string[][]) {
    const rowLen = grid.length
    const colLen = grid[0].length
    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        // 把每一行的元素进行平铺，所以乘列的数量，主要是方便找
        let idx = row * colLen + col
        // 每个岛屿首先是代表自己岛屿
        this.parents[idx] = grid[row][col] === '1' ? idx : -1
        this.rank[idx] = grid[row][col] === '1' ? 1 : 0
        // 先统计每个岛屿，在合并的时候进行剪除
        this.count = grid[row][col] === '1' ? this.count + 1 : this.count
      }
    }
  }

  find(index: number): number {
    if (this.parents[index] !== index) {
      this.parents[index] = this.find(this.parents[index])
    }
    return this.parents[index]
  }

  union(indexA: number, indexB: number): void {
    const pA = this.find(indexA)
    const pB = this.find(indexB)
    if (pA === pB) {
      return
    }
    // 此时相邻的块合并，连通分量减一
    this.count -= 1
    if (this.rank[pA] >= this.rank[pB]) {
      this.parents[pB] = pA
      // rank 是让小的合并到大的
      this.rank[pA] += this.rank[pB]
    } else {
      this.parents[pA] = pB
      this.rank[pB] += this.rank[pA]
    }
  }

  getCount() {
    return this.count
  }
}
