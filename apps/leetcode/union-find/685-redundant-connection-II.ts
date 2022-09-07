// 有根树：只有一个根节点，其他节点只有一个parent节点，其他节点都是根节点的后代
// 有根树的入度(in-degree) 最多为 1 ，其中根节点的入度为 0
export const findRedundantDirectedConnection = (edges: number[][]): number[] => {
  // 首先判断入度为 2 的节点,因为每个节点入度不超过1，根的入度为0
  // 这一步是为了获得入度超过1的节点下标
  const [edgIdxA, edgIdxB] = degreeThanOne(edges)
  // 因为要返回后出现的答案，所以先判断后面的
  if (edgIdxB >= 0 && isTreeAfterRemove(edges, edgIdxB)) {
    return edges[edgIdxB]
  }
  // 移除一条边，看是否能形成树
  if (edgIdxA >= 0 && isTreeAfterRemove(edges, edgIdxA)) {
    return edges[edgIdxA]
  }

  // 最后判断类似前一道的冗余连接
  return hasRedundantEdge(edges)
}

const degreeThanOne = (edges: number[][]): number[] => {
  const hash = new Map<number, number>()
  for (let i = 0; i < edges.length; i++) {
    const child = edges[i][1]
    if (!hash.has(child)) {
      hash.set(child, i)
    } else {
      // @ts-ignore
      return [hash.get(child), i]
    }
  }
  return []
}

const isTreeAfterRemove = (edges: number[][], removeIdx: number) => {
  const unionFind = new UnionFind(edges.length + 1)
  for (let i = 0; i < edges.length; i++) {
    if (i !== removeIdx && !unionFind.union(edges[i][1], edges[i][0])) {
      return false
    }
  }
  return true
}

const hasRedundantEdge = (edges: number[][]): number[] => {
  const unionFind = new UnionFind(edges.length + 1)
  for (const [parent, child] of edges) {
    if (!unionFind.union(child, parent)) {
      return [parent, child]
    }
  }
  return []
}

class UnionFind {
  parents: number[]
  constructor(size: number) {
    this.parents = Array(size)
      .fill(1)
      .map((_, idx) => idx)
  }
  find(idx: number): number {
    if (this.parents[idx] !== idx) {
      this.parents[idx] = this.find(this.parents[idx])
    }
    return this.parents[idx]
  }

  union(idxChild: number, idxParent: number): boolean {
    const parentChild = this.find(idxChild)
    const parentParent = this.find(idxParent)
    if (parentChild === parentParent) {
      return false
    }
    this.parents[parentChild] = parentParent
    return true
  }
}
