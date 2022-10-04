import { expect } from 'vitest'
import { maximumSwap } from '../number/670-maximum-swap'
import { findAllConcatenatedWordsInADict } from '../string/472-concatenated-words'
import { minAddToMakeValid } from '../string/921-minimum-add-to-make-parentheses-valid'

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

it('472 连接词', () => {
  const word1 = ['cat', 'cats', 'catsdogcats', 'dog', 'dogcatsdog', 'hippopotamuses', 'rat', 'ratcatdogcat']

  const ans1 = ['catsdogcats', 'dogcatsdog', 'ratcatdogcat']

  const word2 = ['cat', 'dog', 'catdog']
  const ans2 = ['catdog']

  expect(findAllConcatenatedWordsInADict(word1)).toEqual(ans1)
  expect(findAllConcatenatedWordsInADict(word2)).toEqual(ans2)
})

it('921. 使括号有效的最少添加', () => {
  const s1 = '())'
  const s2 = '((('
  const s3 = ')('

  expect(minAddToMakeValid(s1)).toBe(1)
  expect(minAddToMakeValid(s2)).toBe(3)
  expect(minAddToMakeValid(s3)).toBe(2)
})
