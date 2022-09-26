import { TreeNode } from 'binary-help'

export const maxPathSum = (root: TreeNode | null): number => {
  let max = -Infinity
  const dfs = (root: TreeNode | null): number => {
    if (!root) {
      return 0
    }
    let left = Math.max(dfs(root.left), 0)
    let right = Math.max(dfs(root.right), 0)

    const sum = root.val + left + right

    max = Math.max(max, sum)
    // 这是作为路径的最大贡献
    return root.val + Math.max(left, right)
  }
  dfs(root)

  return max
}
