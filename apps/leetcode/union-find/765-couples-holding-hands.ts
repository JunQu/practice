class UnionFind {
  parents: number[] = []
  count: number
  constructor(size: number) {
    this.count = size
    this.parents = Array.from({ length: size }, (_, i) => i)
  }
  find(idx: number) {
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
    this.count -= 1
    this.parents[pB] = pA
  }
  getCount() {
    return this.count
  }
}

/**
 *
 * 未能邻座的情侣必定组成的是环路，也就是说他们整体形成一个圈
 * 假如有N对未牵手的情侣，那么他们需要N-1次调整的次数
 * 并查集能让所有未牵手的情侣合并成一个连通分量
 * 总的连通分量包含了，各个已经牵手的情侣，他们是单独连通分量，和一个整合所有未牵手情侣的连通分量
 * 那么此时只需要把所有情侣的数量减去这个总的连通分量就是：未牵手的情侣数量减去一的结果
 */
export const minSwapsCouples = (row: number[]): number => {
  const couple = row.length / 2
  const unionFind = new UnionFind(couple)
  let index = 0
  while (index < row.length) {
    unionFind.union(~~(row[index] / 2), ~~(row[index + 1] / 2))
    index += 2
  }
  // 此时 unionFind 的连通分量包含两种：已经牵手的情侣的连通分量，他们各自独立，以及一个联合所有未牵手情侣的连通分量
  return couple - unionFind.getCount()
}
