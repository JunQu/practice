export const hitBricks = (grid: number[][], hits: number[][]): number[] => {
  const fall = Array<number>(hits.length)

  // 建立并查集
  const unionFind = new UnionFind(grid)

  const rowLen = grid.length
  const colLen = grid[0].length
  // 虚拟一个房顶，用于顶部砖的联合
  const virtual = rowLen * colLen + 1

  const getIdx = (row: number, col: number) => {
    return row * colLen + col
  }

  // 首先去掉打掉的砖块
  // 因为打掉的砖块以及连接的都会消除
  for (let i = 0; i < hits.length; i++) {
    const [row, col] = hits[i]
    if (grid[row][col] === 1) {
      grid[row][col] = 0
    } else {
      fall[i] = 0
    }
  }

  // 把剩余砖块联合起来，类似岛屿
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] === 1) {
        const idx = i * colLen + j
        // 让顶部的砖全部同步虚拟的房顶联合
        if (i === 0) {
          unionFind.union(virtual, idx)
        }
        if (j < colLen - 1 && grid[i][j + 1] === 1) {
          unionFind.union(idx, idx + 1)
        }
        if (i < rowLen - 1 && grid[i + 1][j] === 1) {
          unionFind.union(idx, idx + colLen)
        }
      }
    }
  }
  // 四个方向有没有砖块
  const position: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  // 再把打掉的砖块补上
  for (let i = hits.length - 1; i >= 0; i--) {
    // 打的地方本来就是空白
    if (fall[i] === 0) {
      continue
    }
    // 进行补砖再连通的操作
    const [hRow, hCol] = hits[i]
    const idx = getIdx(hRow, hCol)
    // 先保存未打前顶部的数量
    const originSize = unionFind.getTopSize()
    // 如果是顶部的，需要先连接，有可能没有和顶部连接的，仅仅这块把下面的砖块连接了
    if (hRow === 0) {
      unionFind.union(virtual, idx)
    }

    // 然后把上下左右的都给和顶部联合
    for (const [left, right] of position) {
      const row = hRow + left
      const col = hCol + right
      // 如果周围有砖就联合起来，这时候顶部也会被联合
      if (row >= 0 && row < rowLen && col >= 0 && col < colLen && grid[row][col] === 1) {
        unionFind.union(idx, getIdx(row, col))
      }
    }
    // 顶部多了的砖块，即为掉落的砖块
    const nowSize = unionFind.getTopSize()
    // 这里 0 是有可能它没有掉落，那么仅仅是敲掉了一块，-1 是因为敲掉的砖不算在掉落里面
    fall[i] = Math.max(0, nowSize - originSize - 1)
    // 补上这块砖
    grid[hRow][hCol] = 1
  }

  return fall
}

class UnionFind {
  parents: number[]
  rank: number[]
  top: number

  constructor(grid: number[][]) {
    const rowLen = grid.length
    const colLen = grid[0].length
    this.top = rowLen * colLen + 1
    this.parents = Array(this.top).fill(-1)
    this.rank = Array(rowLen * colLen).fill(0)
    // 设置虚拟节点 用于判断顶层
    this.parents[this.top] = this.top
    // 确保虚拟节点rank大，更方便查找
    this.rank[this.top] = rowLen * colLen

    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        const idx = row * colLen + col
        this.parents[idx] = idx
        this.rank[idx] = 1
      }
    }
  }

  find(idx: number) {
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
    if (this.rank[parentA] >= this.rank[parentB]) {
      this.parents[parentB] = parentA
      this.rank[parentA] += this.rank[parentB]
    } else {
      this.parents[parentA] = this.parents[parentB]
      this.rank[parentB] += this.rank[parentA]
    }
  }

  // 查询房顶的砖，这里我们的房顶是虚拟的
  getTopSize() {
    const p = this.find(this.top)
    return this.rank[p]
  }
}
