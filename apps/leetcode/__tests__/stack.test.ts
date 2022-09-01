import { expect } from 'vitest'
import { nextGreaterElements } from '../stack/503-next-greater-element-II'
import { nextGreaterElement3 } from '../stack/556-next-greater-element-III'

it('503 下一个更大的元素', () => {
  const nums1 = [100, 1, 11, 1, 120, 111, 123, 1, -1, -100]
  const ans1 = [120, 11, 120, 120, 123, 123, -1, 100, 100, 100]

  expect(nextGreaterElements(nums1)).toEqual(ans1)
})
it.only('556 下一个更大的元素 3', () => {
  const nums1 = [100, 1, 11, 1, 120, 111, 123, 1, -1, -100]

  expect(nextGreaterElement3(12)).toEqual(21)
  expect(nextGreaterElement3(21)).toEqual(-1)
  expect(nextGreaterElement3(2987343)).toEqual(2987433)
})
