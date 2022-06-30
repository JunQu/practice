import type { TreeNode } from '../helper/binary'

export function isSymmetric(root: TreeNode | null): boolean {
  return checkSame(root, root)
}

function checkSame(tree: TreeNode | null, otherTree: TreeNode | null): boolean {
  if (!tree && !otherTree) {
    return true
  }
  if (!tree || !otherTree) {
    return false
  }
  // 重要的就是把一棵树镜像看待，镜像成另一棵树进行对比
  return tree.val === otherTree.val && checkSame(tree.left, otherTree.right) && checkSame(tree.right, otherTree.left)
}
