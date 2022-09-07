class UnionFind {
  parents: number[]
  counts: number[]

  constructor(size: number) {
    this.parents = Array<number>(size)
    this.counts = Array<number>(size).fill(1)
    for (let i = 0; i < size; i++) {
      this.parents[i] = i
    }
  }
  find(index: number) {
    if (this.parents[index] !== index) {
      this.parents[index] = this.find(this.parents[index])
    }
    // 曾在此跳坑
    return this.parents[index]
  }
  union(idxA?: number, idxB?: number) {
    if (typeof idxA !== 'number' || typeof idxB !== 'number') {
      return
    }
    const pA = this.find(idxA)
    const pB = this.find(idxB)
    if (pA === pB) {
      return
    }
    this.parents[pA] = pB
    this.counts[pB] += this.counts[pA]
  }
  getMaxCount() {
    return Math.max(...this.counts)
  }
}

export const longestConsecutive = (nums: number[]): number => {
  const hash = new Map()
  const unionFind = new UnionFind(nums.length)
  for (let i = 0; i < nums.length; i++) {
    if (!hash.has(nums[i])) {
      // hash 仅仅是为了方便寻找下标
      hash.set(nums[i], i)
      // 与它相邻的数字相连，因为是连续数字的长度
      unionFind.union(i, hash.get(nums[i] - 1))
      unionFind.union(i, hash.get(nums[i] + 1))
    }
  }

  return unionFind.getMaxCount()
}
