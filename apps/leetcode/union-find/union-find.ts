class UnionFind {
  parents: number[] // 保存parent的下标
  rank: number[] // 这里以每个节点拥有的节点数目作为权重，至少是1个
  count: number // 树的数目，也就是集合的个数

  constructor(size: number) {
    this.parents = Array<number>(size)
    for (let i = 0; i < size; i++) {
      // 一开始每个都是子集，代表自己
      this.parents[i] = i
    }
    this.rank = Array<number>(size).fill(1)
    this.count = size
  }

  findByIndex(index: number): number {
    // 寻找集合，顺便路径压缩
    if (this.parents[index] !== index) {
      this.parents[index] = this.findByIndex(this.parents[index])
    }
    return this.parents[index]
  }

  unionByIndex(indexA: number, indexB: number): boolean {
    const parentA = this.findByIndex(indexA)
    const parentB = this.findByIndex(indexB)
    if (parentA === parentB) {
      return false
    }
    // 每次联合就是形成一个大集合，减少一个集合
    this.count -= 1
    // 估算两个树的大小,谁大听谁的
    if (this.rank[parentA] < this.rank[parentB]) {
      this.parents[parentA] = parentB
      this.rank[parentB] += this.rank[parentA]
    } else if (this.rank[parentA] > this.parents[parentB]) {
      this.parents[parentB] = parentA
      this.rank[parentA] += this.rank[parentB]
    } else {
      // 如果大家都差不多，那么随便一个
      this.parents[parentB] = parentA
      this.rank[parentA] += this.rank[parentB]
    }

    return true
  }

  isConnected(indexA: number, indexB: number): boolean {
    return this.findByIndex(indexA) === this.findByIndex(indexB)
  }

  getCount() {
    return this.count
  }
  // 因为我们统计了每个集合的数目，所以很方便实现这个
  getCollectionSize(index: number) {
    const parent = this.findByIndex(index)
    return this.rank[parent]
  }
}

const arr = []
