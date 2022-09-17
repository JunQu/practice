// 双色标记法
// 模拟栈
import { TreeNode } from 'binary-help'

// 前序遍历 root -> left -> right
export const preorderTraversal = (root: TreeNode | null): number[] => {
  const result: number[] = []

  return result
}

// 中序遍历 left->root->right
export const inorderTraversal = (root: TreeNode | null): number[] => {
  if (!root) {
    return []
  }
  // 新节点为白色
  const WHITE = 0
  // 已访问过的为灰色
  const Gray = 1
  // 遇到白色节点，标记为灰色，将左右子节点，自身 按照不同顺序入栈
  // 遇到节点为灰色，将节点值输出
  // 存放结果
  const result: number[] = []
  const stack: [number, TreeNode | null][] = [[WHITE, root]]

  while (stack.length) {
    const [color, node] = stack.pop()!
    if (!node) {
      continue
    }
    if (color === WHITE) {
      // 顺序是相反的，因为是从后取出，保证取出的顺序
      // 从后往前看就是正常顺序
      stack.push([WHITE, node.right])
      stack.push([Gray, node])
      stack.push([WHITE, node.left])
    } else {
      result.push(node.val)
    }
  }
  return result
}

// 后序遍历 left->right->root
export const postorderTraversal = (root: TreeNode | null): number[] => {
  const result: number[] = []

  return result
}
