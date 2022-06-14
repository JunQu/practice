import { it, expect } from 'vitest'
import { shuffle } from './helper'
import { heapsort, heapsort2 } from './heapsort'

// shift + command + option + o
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const shuffledArr = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
const shuffledArr2 = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]

it('basic sort', () => {
  expect(shuffledArr).not.toEqual(arr)
  heapsort(shuffledArr)
  expect(shuffledArr).toEqual(arr)
})

it('22 sort', () => {
  expect(shuffledArr2).not.toEqual(arr)
  heapsort2(shuffledArr2)
  expect(shuffledArr2).toEqual(arr)
})
