import { inorderTraversal } from './94-binary-tree-inorder-traversal'
import { it, expect, describe } from 'vitest'
import { arrToTree } from '../helper/binary'
import { isSymmetric } from './101-symmetric-tree'

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

describe('二叉树的比较', () => {
  it.only('101 对称二叉树', () => {
    const tree1 = arrToTree([1])
    const tree2 = arrToTree([1, 2, 2, 3, 4, 4, 3])
    const tree3 = arrToTree([1, 2, 2, null, 3, 3, null])

    const tree4 = arrToTree([1, 2, 2, null, 3, null, 3])
    const tree5 = arrToTree([1, 2, 3])
    const tree6 = arrToTree([1, 2, 3, null, 3, null])

    expect(isSymmetric(tree1)).toBe(true)
    expect(isSymmetric(tree2)).toBe(true)
    expect(isSymmetric(tree3)).toBe(true)

    expect(isSymmetric(tree4)).toBe(false)
    expect(isSymmetric(tree5)).toBe(false)
    expect(isSymmetric(tree6)).toBe(false)
  })
})
