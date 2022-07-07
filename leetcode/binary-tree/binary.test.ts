import { it, expect, describe } from 'vitest'
import { numsToTree as arrToTree } from 'numstree'
import { isSymmetric } from './101-symmetric-tree'
import { inorderTraversal } from './94-binary-tree-inorder-traversal'
import { preorderTraversal } from './144-binary-tree-preorder-traversal'
import { postorderTraversal } from './145-binary-tree-postorder-traversal'

describe('二叉树的基本遍历', () => {
  it('前序遍历', () => {
    const tree1 = arrToTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    const tree2 = arrToTree([1, 2, 3, 4, 5, null, 4, 5])

    expect(preorderTraversal(tree1)).toEqual([1, 2, 4, 8, 9, 5, 0, 3, 6, 7])
    expect(preorderTraversal(tree2)).toEqual([1, 2, 4, 5, 5, 3, 4])
  })

  it('中序遍历', () => {
    const arr = [5, 6, 3, null, 0, 3, 5]
    const ans = [6, 0, 5, 3, 3, 5]

    const tree = arrToTree(arr)
    const ret = inorderTraversal(tree)
    expect(ret).toEqual(ans)
  })

  it('后序遍历', () => {
    const tree2 = arrToTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    expect(postorderTraversal(tree2)).toEqual([8, 9, 4, 0, 5, 2, 6, 7, 3, 1])
  })

  it('层序遍历', () => {})
})

describe('二叉树的比较', () => {
  it('101 对称二叉树', () => {
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
