import { inorderTraversal } from './94-binary-tree-inorder-traversal'
import { it, expect, describe } from 'vitest'
import { arrToTree } from '../helper/binary'

describe('二叉树的基本遍历', () => {
  it('前序遍历', () => {})

  it('中序遍历', () => {
    const arr = [5, 6, 3, null, 0, 3, 5]
    const ans = [6, 0, 5, 3, 3, 5]

    const tree = arrToTree(arr)
    const ret = inorderTraversal(tree)
    expect(ret).toEqual(ans)
  })

  it('后序遍历', () => {})

  it('层序遍历', () => {})
})
