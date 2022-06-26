import { arrToTree } from './binary'
import { describe, expect, it } from 'vitest'

describe('二叉与树数组转换', () => {
  it('arr to tree', () => {
    const arr = [1, 2, 3, 4, null, 4, 5, null, 2, null, null, null]
    const tree = arrToTree(arr)
    const airm = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4,
          left: null,
          right: {
            val: 2,
            left: null,
            right: null,
          },
        },
        right: null,
      },
      right: {
        val: 3,
        left: { val: 4, left: null, right: null },
        right: { val: 5, left: null, right: null },
      },
    }

    expect(tree).toEqual(airm)
  })

  it('empty tree', () => {
    const tree1 = arrToTree([])
    const tree2 = arrToTree([null])
    const tree3 = arrToTree([null, null, null, 1, 2, 3])

    expect(tree1).toBe(null)
    expect(tree2).toBe(null)
    expect(tree3).toBe(null)
  })

  it('single val', () => {
    const arr1 = [1]
    const arr2 = [1, null, null]
    const arr3 = [1, null, null, 1, 2]
    const ans = { val: 1, left: null, right: null }

    expect(arrToTree(arr1)).toEqual(ans)
    expect(arrToTree(arr2)).toEqual(ans)
    expect(arrToTree(arr3)).toEqual(ans)
  })
})
