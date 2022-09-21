//  Definition for Node.

class Node {
  val: number
  neighbors: Node[]
  constructor(val?: number, neighbors?: Node[]) {
    this.val = val === undefined ? 0 : val
    this.neighbors = neighbors === undefined ? [] : neighbors
  }
}
// 基础的题目
export const cloneGraph = (node: Node | null): Node | null => {
  if (!node) {
    return node
  }
  // 保存已经去过的节点
  const visited = new Map()
  // bfs
  const queue: Node[] = []
  const root = new Node(node.val)
  // 启动
  queue.push(node)
  // 创建新节点，加入，也是root节点
  visited.set(node, root)

  while (queue.length) {
    // 取出队列节点
    const curNode = queue.shift()!
    // 找到能到达的节点，即邻居
    for (const neighbor of curNode.neighbors) {
      // 没有被访问过
      if (!visited.has(neighbor)) {
        // 复制它
        visited.set(neighbor, new Node(neighbor.val))
        queue.push(neighbor)
      }
      // 把当前的节点加入邻居,再次复制
      visited.get(curNode).neighbors.push(visited.get(neighbor))
    }
  }

  return visited.get(node)
}
