import { TreeNode } from 'binary-help'

export const str2tree = (str: string): TreeNode => {
  // write your code here
  const stack: TreeNode[] = []
  let root: TreeNode | null = null
  let tmp = ''
  let isLeft = true
  let nodeTmp: TreeNode
  for (const ch of str) {
    if (ch === '(') {
      stack.push(nodeTmp!)
      isLeft = true
    } else if (ch === ',') {
      // 右孩子
      isLeft = false
    } else if (ch === ')') {
      stack.pop()
    } else {
      nodeTmp = new TreeNode(ch)
      if (root === null) {
        root = nodeTmp
      } else {
        if (isLeft) {
          stack[stack.length - 1].left = nodeTmp
        } else {
          stack[stack.length - 1].right = nodeTmp
        }
      }
    }
  }
  return root!
}
