export const findRedundantConnection = (edges: number[][]): number[] => {
  // 遍历,没有连接的进行连接
  // 找到已经能够连通的点，返回
  // 1 - n
  const unionFind = new UnionFind(edges.length)

  for (const [idxA, idxB] of edges) {
    if (!unionFind.union(idxA, idxB)) {
      return [idxA, idxB]
    }
  }
  return []
}

class UnionFind {
  parents: number[] = []

  constructor(size: number) {
    this.parents = Array(size + 1)
      .fill(1)
      .map((_, idx) => idx)
  }

  find(idx: number): number {
    if (this.parents[idx] !== idx) {
      this.parents[idx] = this.find(this.parents[idx])
    }
    return this.parents[idx]
  }

  union(idxA: number, idxB: number): boolean {
    const pa = this.find(idxA)
    const pb = this.find(idxB)
    if (pa === pb) {
      return false
    }
    this.parents[pb] = pa
    return true
  }
}
