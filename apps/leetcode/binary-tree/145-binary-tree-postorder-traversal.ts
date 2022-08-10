import type { TreeNode } from 'binary-help'

export const postorderTraversal = (root: TreeNode | null, ret: number[] = []): number[] => {
  if (!root) {
    return ret
  }
  postorderTraversal(root.left, ret)
  postorderTraversal(root.right, ret)
  ret.push(root.val)
  return ret
}
