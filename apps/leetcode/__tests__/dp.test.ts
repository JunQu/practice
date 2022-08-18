import { rob } from '../dp/198-house-robber'
import { expect } from 'vitest'

it('198 hose robber', () => {
  const arr = [1, 2, 3, 1]
  const arr2 = [2, 7, 9, 3, 1]
  expect(rob(arr)).toEqual(4)
  expect(rob(arr2)).toEqual(12)
})
