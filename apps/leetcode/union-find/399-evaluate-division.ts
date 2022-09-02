// 带权并查集并维护权重的一道题
// 这题可以先了解图的基本知识，有向图以及边的权重就好多了
export const calcEquation = (equations: string[][], values: number[], queries: string[][]): number[] => {
  // 预处理把id（下标）和对应的边关系上
  const edges = new Map<string, number>()
  let ids = 0
  // 需要两杯的数量，每个有两个元素
  const unionFind = new UnionFind(equations.length * 2)
  for (const [strA, strB] of equations) {
    if (!edges.has(strA)) {
      // 给每个点一个id，联系起来
      edges.set(strA, ids)
      ids += 1
    }
    if (!edges.has(strB)) {
      edges.set(strB, ids)
      ids += 1
    }
    // 两个点的合并，把边赋值
    unionFind.union(edges.get(strA)!, edges.get(strB)!, values.shift()!)
  }
  const ret = []
  // 查询每个边
  for (const [strA, strB] of queries) {
    const edgA = edges.get(strA)
    const edgB = edges.get(strB)
    // 查不到的情况就是 -1
    let val = unionFind.connect(edgA!, edgB!)
    ret.push(val)
  }
  return ret
}

class UnionFind {
  weight: number[] // 各个除法的值，a/b =2 转化为 (a-> b),weight[i] 为 2
  parents: number[]

  constructor(size: number) {
    this.parents = Array(size)
    for (let i = 0; i < size; i++) {
      this.parents[i] = i
    }
    // 权重必须初始化为 1 ，因为初始的 i 都是代表自己，即权重为 1 因为是乘法，这样子节点到这边不用转化，如果是加减初始是 0
    this.weight = Array(size).fill(1)
  }

  find(index: number) {
    if (this.parents[index] !== index) {
      // 这里又是神奇的一步，不仅仅是路径压缩，还有权重合并
      // 因为路径压缩，所以权重需要合并
      // 权重合并显然是相乘，，但是如何相乘
      // 首先我们需要得到的就是当前index 与 root 之前的权重，也就是合并后当前的权重
      // 这里依旧利用了递归的特性，虽然当前的权值，就是当前权重乘以parent节点的权重，但是这是结算后的parent权重，利用了递归回溯的特点
      let parent = this.parents[index]
      this.parents[index] = this.find(this.parents[index])
      this.weight[index] *= this.weight[parent]
    }
    return this.parents[index]
  }

  union(indexA: number, indexB: number, edgeValue: number) {
    const parentA = this.find(indexA)
    const parentB = this.find(indexB)
    if (parentA === parentB) {
      return
    }
    // 因为除法，我们这里定位是这样，a/b => a->b
    this.parents[parentA] = parentB
    // 因为选择B作为顶点，那么需要重新计算权重，这一步很难，我应该做不出来
    // https://leetcode.cn/problems/evaluate-division/solution/399-chu-fa-qiu-zhi-nan-du-zhong-deng-286-w45d/
    this.weight[parentA] = (this.weight[indexB] * edgeValue) / this.weight[indexA]
  }

  connect(indexA: number, indexB: number): number {
    if (indexA >= 0 && indexB >= 0) {
      const parentA = this.find(indexA)
      const parentB = this.find(indexB)
      if (parentA === parentB) {
        // 因为到达对称的点的权重应当是相同的，所以是除以，类似 a->b->c 20 d->c 10 那么 a -> d 应该就是 20/10 = 2
        // 当然也可以转化 a = 20c , d = 10c， 那自然点 a -> d = 20c/10c = 2
        return this.weight[indexA] / this.weight[indexB]
      }
    }
    return -1
  }
}
