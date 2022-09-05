import { TreeNode } from 'binary-help'

export const longestUnivaluePath = (root: TreeNode | null): number => {
  let max = 0
  const dfs = (root: TreeNode | null): number => {
    if (!root) {
      return 0
    }

    let left = dfs(root.left)
    let right = dfs(root.right)

    let countLeft = 0
    let countRight = 0
    if (root.left && root.val === root.left.val) {
      countLeft = left + 1
    }
    if (root.right && root.val === root.right.val) {
      countRight = right + 1
    }
    max = Math.max(max, countLeft + countRight)

    return Math.max(countLeft, countRight)
  }
  dfs(root)
  return max
}
