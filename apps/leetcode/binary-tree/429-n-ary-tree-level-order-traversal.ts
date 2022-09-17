// Definition for node.
// @ts-ignore
class NodeN {
  val: number
  children: NodeN[]
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val
    this.children = []
  }
}

function levelOrder(root: NodeN | null): number[][] {
  if (!root) {
    return []
  }

  const result: number[][] = []
  const queue: NodeN[] = []
  queue.push(root)

  while (queue.length) {
    let levelSize = queue.length

    const level = []
    while (levelSize) {
      // 取出这层的节点
      const node = queue.shift()!
      level.push(node.val)
      // 把该节点能到达的路径加入队列
      for (const child of node.children) {
        queue.push(child)
      }
      levelSize -= 1
    }
    result.push(level)
  }

  return result
}
