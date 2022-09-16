import { expect } from 'vitest'
import { huyang } from './huyang'

it('补种胡杨树', () => {
  expect(huyang(5, [2, 4], 1)).toBe(3)
  expect(huyang(10, [2, 4, 7], 1)).toBe(6)
})
