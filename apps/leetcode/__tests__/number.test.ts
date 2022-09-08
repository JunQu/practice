import { expect } from 'vitest'
import { constructArray } from '../number/667-beautiful-arrangement-ii'

it('667 优美的排列 II 数学题目', () => {
  const n1 = 3
  const k1 = 2
  const a1 = [1, 3, 2]

  const n2 = 5
  const k2 = 2
  const a2 = [1, 2, 3, 5, 4] // 答案不唯一

  expect(constructArray(n1, k1)).toEqual(a1)
  expect(constructArray(n2, k2)).toEqual(a2)
})
