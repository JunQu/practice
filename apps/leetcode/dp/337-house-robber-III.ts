import { TreeNode } from 'binary-help'

export const rob3 = (root: TreeNode | null): number => {
  const getRoot = new Map()
  const exRoot = new Map()

  const dfs = (root: TreeNode | null) => {
    if (!root) {
      return 0
    }
    dfs(root.left)
    dfs(root.right)
    getRoot.set(root, root.val + (exRoot.get(root.left) || 0) + (exRoot.get(root.right) || 0))
    exRoot.set(
      root,
      Math.max(getRoot.get(root.left) || 0, exRoot.get(root.left) || 0) +
        Math.max(getRoot.get(root.right) || 0, exRoot.get(root.right) || 0)
    )
  }

  dfs(root)
  return Math.max(getRoot.get(root) || 0, exRoot.get(root) || 0)
}
