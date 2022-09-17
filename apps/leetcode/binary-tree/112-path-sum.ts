import { TreeNode } from 'binary-help'

export const hasPathSum = (root: TreeNode | null, targetSum: number, sum = 0): boolean => {
  if (!root) {
    return false
  }
  if (!root.left && !root.right && root.val + sum === targetSum) {
    return true
  }
  return hasPathSum(root.left, targetSum, sum + root.val) || hasPathSum(root.right, targetSum, sum + root.val)
}

export const hasPathSumBFS = (root: TreeNode | null, targetSum: number): boolean => {
  if (!root) {
    return false
  }
  const queue: [number, TreeNode][] = [[root.val, root]]

  while (queue.length) {
    const [sum, node] = queue.shift()!
    if (!node.right && !node.left && sum === targetSum) {
      return true
    }
    if (node.left) {
      queue.push([sum + node.left.val, node.left])
    }

    if (node.right) {
      queue.push([sum + node.right.val, node.right])
    }
  }
  return false
}
