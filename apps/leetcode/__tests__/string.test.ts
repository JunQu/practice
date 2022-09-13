import { expect } from 'vitest'
import { maximumSwap } from '../number/670-maximum-swap'

it('670 最大交换', () => {
  const num1 = 2736
  const num2 = 9973
  const num3 = 2896893
  const num4 = 98368

  expect(maximumSwap(num1)).toBe(7236)
  expect(maximumSwap(num2)).toBe(num2)
  expect(maximumSwap(num3)).toBe(9896823)
  expect(maximumSwap(num4)).toBe(98863)
})
