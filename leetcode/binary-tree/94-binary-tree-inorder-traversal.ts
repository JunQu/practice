import type { TreeNode } from '../helper/binary'

export const inorderTraversal = (root: TreeNode | null, ret: number[] = []): number[] => {
  console.log('root: ', root)
  if (!root) {
    return ret
  }

  inorderTraversal(root.left, ret)
  ret.push(root.val)
  inorderTraversal(root.right, ret)

  return ret
}
