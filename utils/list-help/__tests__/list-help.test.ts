import { arrToList } from '../src'
import { expect } from 'vitest'

it('arr to list', () => {
  const arr = [1, 2, 3]
  const list = {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: null,
      },
    },
  }
  expect(arrToList(arr)).toEqual(list)
})
