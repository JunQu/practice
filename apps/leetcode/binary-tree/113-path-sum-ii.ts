import { TreeNode } from 'binary-help'

export const pathSum = (root: TreeNode | null, targetSum: number): number[][] => {
  if (!root) {
    return []
  }

  const result: number[][] = []
  const queue: [number[], number, TreeNode][] = []
  queue.push([[root.val], root.val, root])

  while (queue.length) {
    const [path, sum, node] = queue.shift()!

    if (!node.left && !node.right && targetSum === sum) {
      result.push(path)
    }
    if (node.left) {
      // @ts-ignore
      queue.push([[...path, node.left.val], sum + node.left.val, node.left])
    }
    if (node.right) {
      // @ts-ignore
      queue.push([[...path, node.right.val], sum + node.right.val, node.right])
    }
  }

  return result
}

const pathSumDFS = (root: TreeNode | null, targetSum: number): number[][] => {
  if (!root) {
    return []
  }
  const result: number[][] = []

  const dfs = (root: TreeNode | null, sum = 0, path: number[] = []) => {
    if (!root) {
      return
    }
    if (!root.left && !root.right && sum === targetSum) {
      result.push([...path])
    }
    if (root.left) {
      dfs(root.left, sum + root.left.val, [...path, root.left.val])
    }
    if (root.right) {
      dfs(root.right, sum + root.right.val, [...path, root.right.val])
    }
  }
  dfs(root, root.val, [root.val])

  return result
}
