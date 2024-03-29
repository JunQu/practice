import type { TreeNode } from 'binary-help'

export const inorderTraversal = (root: TreeNode | null, ret: number[] = []): number[] => {
  if (!root) {
    return ret
  }

  inorderTraversal(root.left, ret)
  ret.push(root.val)
  inorderTraversal(root.right, ret)

  return ret
}
