class Point {
  x: number
  y: number

  constructor(indexX?: number, indexY?: number) {
    this.x = indexX || 0
    this.y = indexY || 0
  }
}

class UnionFind {
  parents: number[] = []
  rank: number[] = []
  count = 0

  constructor(rowLen: number, colLen: number) {
    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        const idx = row * colLen + col
        this.parents[idx] = idx
        this.rank[idx] = 1
      }
    }
  }

  find(idx: number): number {
    if (this.parents[idx] !== idx) {
      this.parents[idx] = this.find(this.parents[idx])
    }
    return this.parents[idx]
  }

  union(idxA: number, idxB: number): boolean {
    const pA = this.find(idxA)
    const pB = this.find(idxB)

    if (pA === pB) {
      return false
    }

    this.count -= 1

    if (this.rank[pA] >= this.rank[pB]) {
      this.parents[pB] = pA
      this.rank[pA] += this.rank[pB]
    } else {
      this.parents[pA] = pB
      this.rank[pB] += this.rank[pA]
    }
    return true
  }
}

// 题目地址 https://www.lintcode.com/problem/434/description?showListFe=true&page=1&tagIds=399&pageSize=50
export const numIslands2 = (rowLen: number, colLen: number, operators: number[][]): number[] => {
  const res: number[] = []
  const unionFind = new UnionFind(rowLen, colLen)
  const getIdx = (row: number, col: number) => row * colLen + col
  const grid: number[][] = Array(rowLen)
    .fill(0)
    .map((_) => Array(colLen).fill(0))
  let count = 0

  for (const [x, y] of operators) {
    const currentIdx = getIdx(x, y)
    if (grid[x][y] !== 1) {
      grid[x][y] = 1
      count += 1
    } else {
      // 考虑操作在本来就是陆地的情况
      res.push(count)
      continue
    }

    if (x > 0 && grid[x - 1][y] === 1) {
      const leftIdx = getIdx(x - 1, y)
      count = unionFind.union(currentIdx, leftIdx) ? count - 1 : count
    }
    if (y > 0 && grid[x][y - 1] === 1) {
      const topIdx = getIdx(x, y - 1)
      count = unionFind.union(currentIdx, topIdx) ? count - 1 : count
    }

    if (x < rowLen - 1 && grid[x + 1][y] === 1) {
      const rightIdx = getIdx(x + 1, y)
      count = unionFind.union(currentIdx, rightIdx) ? count - 1 : count
    }
    if (y < colLen - 1 && grid[x][y + 1] === 1) {
      const bottomIdx = getIdx(x, y + 1)
      count = unionFind.union(currentIdx, bottomIdx) ? count - 1 : count
    }
    res.push(count)
  }

  return res
}
