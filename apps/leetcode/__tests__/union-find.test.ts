import { expect } from 'vitest'
import { calcEquation } from '../union-find/399-evaluate-division'

it('399 除法求值 题目真的有点难', () => {
  const equations = [
    ['a', 'b'],
    ['b', 'c'],
  ]
  const values = [2.0, 3.0]
  const queries = [
    ['a', 'c'],
    ['b', 'a'],
    ['a', 'e'],
    ['a', 'a'],
    ['x', 'x'],
  ]
  const ans = [6.0, 0.5, -1.0, 1.0, -1.0]

  const eq2 = [
    ['a', 'b'],
    ['e', 'f'],
    ['b', 'e'],
  ]
  const val2 = [3.4, 1.4, 2.3]
  const query2 = [
    ['b', 'a'],
    ['a', 'f'],
    ['f', 'f'],
    ['e', 'e'],
    ['c', 'c'],
    ['a', 'c'],
    ['f', 'e'],
  ]
  const ans2 = [0.29412, 10.948, 1.0, 1.0, -1.0, -1.0, 0.71429]

  expect(calcEquation(equations, values, queries)).toEqual(ans)
  expect(calcEquation(eq2, val2, query2)).toEqual(ans2)
})
