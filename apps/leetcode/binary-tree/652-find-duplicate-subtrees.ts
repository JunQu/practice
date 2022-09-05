import { TreeNode } from 'binary-help'

// 今天每日一题没做出来，而且答案也没看懂，需要把树好好补补
export const findDuplicateSubtrees = (root: TreeNode | null): Array<TreeNode | null> => {
  const path: Array<TreeNode | null> = []
  const hash = new Map()
  const dfs = (root: TreeNode | null): string => {
    if (!root) {
      return ' '
    }
    let key = root.val + '-'
    key += dfs(root.left)
    key += dfs(root.right)
    console.log('key: ', key)
    if (!hash.has(key)) {
      hash.set(key, 1)
    } else {
      hash.set(key, hash.get(key) + 1)
    }
    if (hash.get(key) === 2) {
      path.push(root)
    }
    return key
  }
  dfs(root)
  return path
}
