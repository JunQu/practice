import { expect } from 'vitest'
import { huyang } from './huyang'
import { candy2 } from './candy-2'
import { taskDispatch } from './task-dispatch'
import { removeKthNum } from './remove-kth-num'

it('补种胡杨树', () => {
  expect(huyang(5, [2, 4], 1)).toBe(3)
  expect(huyang(10, [2, 4, 7], 1)).toBe(6)
})

it('分糖果II', () => {
  expect(candy2([3, 5, 6])).toBe(11)
  expect(candy2([7, 14, 9])).toBe(23)
  expect(candy2([56, 50, 10])).toBe(106)
  expect(candy2([1, 4, 5])).toBe(9)
})

it('任务调度', () => {
  // leetcode 原题
  expect(taskDispatch([2, 2, 2, 3], 2)).toBe(7)
  expect(taskDispatch([2, 2, 2, 3, 3, 3], 2)).toBe(8)
})

it('移除 K位数字', () => {
  expect(removeKthNum('2615371', 4)).toBe(131)
})
