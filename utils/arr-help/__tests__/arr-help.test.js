import { swap } from '../src'
import { expect } from 'vitest'

describe('swap item in arr', () => {
  it('swap number', () => {
    const arr = [1, 2, 3]
    swap(arr, 0, 2)
    expect(arr).toEqual([3,2,1])
  })
})
