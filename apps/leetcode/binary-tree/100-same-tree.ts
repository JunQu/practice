import type { TreeNode } from 'binary-help'

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) {
    return true
  }
  if (p === null || q === null) {
    return false
  }
  if (p.val !== q.val) {
    return false
  }
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// eslint-disable-next-line complexity
function isSameTreeBFS(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) {
    return true
  }
  if (!p || !q) {
    return false
  }
  const queue: TreeNode[] = []

  queue.push(p)
  queue.push(q)

  while (queue.length) {
    const first = queue.shift()!
    const last = queue.shift()!

    if (!first && !last) {
      continue
    }
    if ((first && !last) || (!first && last) || first.val !== last.val) {
      return false
    }

    if (last.left && first.left) {
      queue.push(last.left, first.left)
    }

    if (last.right && first.right) {
      queue.push(last.right, first.right)
    }

    if (
      (!last.left && first.left) ||
      (last.left && !first.left) ||
      (!last.right && first.right) ||
      (last.right && !first.right)
    ) {
      return false
    }
  }
  return true
}
