import { TreeNode } from 'binary-help'

export const buildTreePre = (preorder: number[], inorder: number[]): TreeNode | null => {
  if (!preorder.length || !inorder.length) {
    return null
  }
  const val = preorder[0]
  const root = new TreeNode(val)
  const idx = inorder.findIndex((v) => v === val)
  root.left = buildTreePre(preorder.slice(1, idx + 1), inorder.slice(0, idx))
  root.right = buildTreePre(preorder.slice(idx + 1), inorder.slice(idx + 1))

  return root
}
function buildTreePost(inorder: number[], postorder: number[]): TreeNode | null {
  if (!inorder.length || !postorder.length) {
    return null
  }
  const val = postorder[postorder.length - 1]

  const root = new TreeNode(val)
  const idx = inorder.findIndex((v) => v === val)

  root.left = buildTreePost(inorder.slice(0, idx), postorder.slice(0, idx))
  root.right = buildTreePost(inorder.slice(idx + 1), postorder.slice(idx, postorder.length))
  return root
}
