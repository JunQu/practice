import type { TreeNode } from 'binary-help'

// 递归版
export const preorderTraversalRecursion = (root: TreeNode | null, ret: number[] = []): number[] => {
  if (!root) {
    return ret
  }
  ret.push(root.val)
  preorderTraversalRecursion(root.left, ret)
  preorderTraversalRecursion(root.right, ret)
  return ret
}

// 双色版
export const preorderTraversal = (root: TreeNode | null): number[] => {
  if (!root) {
    return []
  }
  const result: number[] = []
  // 白色未访问过,入栈
  const WHITE = 0
  // 灰色已经访问过
  const GRAY = 1
  const stack: [0 | 1, TreeNode | null][] = []

  stack.push([WHITE, root])

  while (stack.length) {
    const [color, node] = stack.pop()!
    if (!node) {
      continue
    }
    if (color === WHITE) {
      // 与递归相反的方向入栈
      stack.push([WHITE, node.right])
      stack.push([WHITE, node.left])
      stack.push([GRAY, node])
    } else {
      result.push(node.val)
    }
  }

  return result
}
