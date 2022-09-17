import { TreeNode } from 'binary-help'

export const binaryTreePaths = (root: TreeNode | null): string[] => {
  const paths: string[] = []

  const dfs = (root: TreeNode | null, path = '') => {
    if (!root) {
      if (path) {
        paths.push(path)
      }
      return
    }

    let newPath = path + (path ? '' : '->') + String(root.val)

    dfs(root.left, newPath)
    dfs(root.right, newPath)
  }

  dfs(root, '')

  return paths
}

export const binaryTreePathsBFS = (root: TreeNode | null): string[] => {
  if (!root) {
    return []
  }

  const result: string[] = []
  const hasChild = root.left || root.right
  const firstPath = String(root.val) + (hasChild ? '->' : '')
  const queue: [string, TreeNode][] = [[firstPath, root]]

  while (queue.length) {
    const [path, node] = queue.shift()!
    if (!node.left && !node.right) {
      result.push(path)
    }
    if (node.left) {
      queue.push([path + '->' + String(node.left.val), node.left])
    }
    if (node.right) {
      queue.push([path + '->' + String(node.right.val), node.right])
    }
  }

  return result
}
