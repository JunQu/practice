import { numsToTree } from 'numstree'
import { isSymmetric } from '../binary-tree/101-symmetric-tree'
import { inorderTraversal } from '../binary-tree/94-binary-tree-inorder-traversal'
import { preorderTraversal } from '../binary-tree/144-binary-tree-preorder-traversal'
import { postorderTraversal } from '../binary-tree/145-binary-tree-postorder-traversal'
import { leveOrder } from '../binary-tree/102-binary-tree-level-order-traversal'
import { describe, expect } from 'vitest'
import { findDuplicateSubtrees } from '../binary-tree/652-find-duplicate-subtrees'

describe('二叉树的基本遍历', () => {
  it('前序遍历', () => {
    const tree1 = numsToTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    const tree2 = numsToTree([1, 2, 3, 4, 5, null, 4, 5])

    expect(preorderTraversal(tree1)).toEqual([1, 2, 4, 8, 9, 5, 0, 3, 6, 7])
    expect(preorderTraversal(tree2)).toEqual([1, 2, 4, 5, 5, 3, 4])
  })

  it('中序遍历', () => {
    const arr = [5, 6, 3, null, 0, 3, 5]
    const ans = [6, 0, 5, 3, 3, 5]

    const tree = numsToTree(arr)
    const ret = inorderTraversal(tree)
    expect(ret).toEqual(ans)
  })

  it('后序遍历', () => {
    const tree2 = numsToTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    expect(postorderTraversal(tree2)).toEqual([8, 9, 4, 0, 5, 2, 6, 7, 3, 1])
  })

  it('层序遍历', () => {
    const tree1 = numsToTree([3, 9, 20, null, null, 15, 7])
    const tree2 = numsToTree([1])
    const tree3 = numsToTree([])

    const order1 = [[3], [9, 20], [15, 7]]
    const order2 = [[1]]
    const order3: number[] = []

    expect(leveOrder(tree1)).toEqual(order1)
    expect(leveOrder(tree2)).toEqual(order2)
    expect(leveOrder(tree3)).toEqual(order3)
  })
})

describe('二叉树的比较', () => {
  it('101 对称二叉树', () => {
    const tree1 = numsToTree([1])
    const tree2 = numsToTree([1, 2, 2, 3, 4, 4, 3])
    const tree3 = numsToTree([1, 2, 2, null, 3, 3, null])

    const tree4 = numsToTree([1, 2, 2, null, 3, null, 3])
    const tree5 = numsToTree([1, 2, 3])
    const tree6 = numsToTree([1, 2, 3, null, 3, null])

    expect(isSymmetric(tree1)).toBe(true)
    expect(isSymmetric(tree2)).toBe(true)
    expect(isSymmetric(tree3)).toBe(true)

    expect(isSymmetric(tree4)).toBe(false)
    expect(isSymmetric(tree5)).toBe(false)
    expect(isSymmetric(tree6)).toBe(false)
  })
})

describe('二叉树基本题目', () => {
  it('652 寻找重复子树', () => {
    const tree1 = numsToTree([1, 2, 3, 4, null, 2, 4, null, null, 4])
    const tree2 = numsToTree([2, 1, 1])
    const tree3 = numsToTree([2, 2, 2, 3, null, 3, null])

    const ans1 = [[4], [2, 4]].map((arr) => numsToTree(arr))
    const ans2 = [[1]].map((arr) => numsToTree(arr))
    const ans3 = [[2, 3], [3]].map((arr) => numsToTree(arr))
    console.log(findDuplicateSubtrees(tree1))
    expect(findDuplicateSubtrees(tree1)).toEqual(ans1)
    // expect(findDuplicateSubtrees(tree2)).toEqual(ans2)
    // expect(findDuplicateSubtrees(tree3)).toEqual(ans3)
  })
})
