import { TreeNode } from 'binary-help'

export const bfs = (root: TreeNode): TreeNode[] => {
  if (!root) {
    return []
  }
  // 使用队列而不是栈
  const queue: (TreeNode | null)[] = []
  const result: TreeNode[] = []
  // 层数
  let leve = 0
  queue.unshift(root)
  // 直到清空队列
  while (queue.length) {
    // 当前层的长度
    const size = queue.length
    // 每一层一层的处理
    for (let i = 0; i < size; i++) {
      // 处理当前层每个数据，依次出列，使得当前层数据处理完
      const node = queue.shift()!
      // 下面的条件是添加与当前节点离的最近的路径，二叉树最多两个路径
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    leve += 1
  }

  return result
}
