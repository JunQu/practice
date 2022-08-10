import type { TreeNode } from 'binary-help'

export const preorderTraversal = (root: TreeNode | null, ret: number[] = []): number[] => {
  if (!root) {
    return ret
  }
  ret.push(root.val)
  preorderTraversal(root.left, ret)
  preorderTraversal(root.right, ret)
  return ret
}
