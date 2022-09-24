import { TreeNode } from 'binary-help'

export const longestZigZag = (root: TreeNode | null): number => {
  if (!root) {
    return 0
  }
  let max = 0
  const dfs = (root: TreeNode | null, count = 1, isRight = false) => {
    if (!root) {
      return
    }

    max = count > max ? count : max

    if (isRight) {
      // 在这此是 right ,那么只有 left 能做贡献，而 right 将会被重制为 1
      if (root.right) {
        dfs(root.right, 1, true)
      }
      if (root.left) {
        dfs(root.left, count + 1, false)
      }
    } else {
      // 如果这次访问了left，那么下次只有right能做出贡献
      if (root.left) {
        dfs(root.left, 1, false)
      }
      if (root.right) {
        dfs(root.right, count + 1, true)
      }
    }
  }
  // 主要是要重制为 1
  dfs(root.left, 1, false)
  dfs(root.right, 1, true)

  return max
}
