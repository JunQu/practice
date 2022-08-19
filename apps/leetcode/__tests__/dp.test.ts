import { rob } from '../dp/198-house-robber'
import { expect } from 'vitest'
import { fullpack, knappack } from "../dp/knappack";

it('198 hose robber', () => {
  const arr = [1, 2, 3, 1]
  const arr2 = [2, 7, 9, 3, 1]
  expect(rob(arr)).toEqual(4)
  expect(rob(arr2)).toEqual(12)
})

it(" 0 1 knappack", () => {
  const weights = [2,4,1]
  const values = [10, 5, 4]
  const volume = 5

  expect(knappack(weights, values, volume)).toEqual(14)
  expect(fullpack(weights, values, volume)).toEqual(9)
});
