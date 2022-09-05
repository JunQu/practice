import { longestUnivaluePath } from '../binary-tree/687-longest-univalue-path'
import { numsToTree } from 'numstree'
import { expect } from 'vitest'

it('687 最长相同值路径', () => {
  const tree1 = numsToTree([1, 4, 5, 4, 4, 5])

  expect(longestUnivaluePath(tree1)).toBe(2)
})
