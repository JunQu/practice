import { TreeNode } from 'binary-help'

export const widthOfBinaryTree = (root: TreeNode | null): number => {
  if (!root) {
    return 0
  }
  let max = 0

  const queque: [TreeNode, number][] = []
  queque.push([root, 1])

  while (queque.length) {
    let leveSize = queque.length
    let minIdx = -1
    let maxIdx = -1

    while (leveSize) {
      const [node, idx] = queque.shift()!
      if (node.left) {
        queque.push([node.left, (2 * idx) % Number.MAX_SAFE_INTEGER])
      }
      if (node.right) {
        queque.push([node.right, (2 * idx + 1) % Number.MAX_SAFE_INTEGER])
      }

      minIdx = minIdx === -1 ? idx : minIdx
      maxIdx = idx
      leveSize -= 1
    }
    max = Math.max(max, maxIdx - minIdx + 1)
  }

  return max
}
