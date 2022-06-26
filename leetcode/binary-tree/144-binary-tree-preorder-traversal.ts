import type { TreeNode } from '../helper/binary'

export const preorderTraversal = (root: TreeNode | null, ret: number[] = []): number[] => {
  if (!root) {
    return ret
  }
  ret.push(root.val)
  preorderTraversal(root.left, ret)
  preorderTraversal(root.right, ret)
  return ret
}
