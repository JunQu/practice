class UnionFind {
  parents: number[]
  rank: number[]
  count: number

  constructor(size: number) {
    this.parents = Array(size)
    this.rank = Array(size).fill(1)
    this.count = size
    for (let i = 0; i < size; i++) {
      // 每个城市至少指向自己
      this.parents[i] = i
    }
  }

  find(idx: number) {
    if (this.parents[idx] !== idx) {
      this.parents[idx] = this.find(this.parents[idx])
    }
    return this.parents[idx]
  }

  union(idxA: number, idxB: number): boolean {
    const parentA = this.find(idxA)
    const parentB = this.find(idxB)
    // 已经被合并过
    if (parentA === parentB) {
      return false
    }

    this.count -= 1

    if (this.rank[parentA] >= this.rank[parentB]) {
      this.parents[parentB] = parentA
      this.rank[parentA] += this.rank[parentB]
    } else {
      this.parents[parentA] = parentB
      this.rank[parentB] += this.rank[parentA]
    }

    return true
  }

  getCount() {
    return this.count
  }
}

export const findCircleNum = (isConnected: number[][]): number => {
  const len = isConnected.length
  const unionFind = new UnionFind(len)

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (j !== i && isConnected[i][j] === 1) {
        unionFind.union(i, j)
      }
    }
  }

  return unionFind.getCount()
}
