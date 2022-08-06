import { describe, expect, it } from 'vitest'
import { composeLabel } from './zaihui'

describe('再惠笔试，一道基本的轻松转化题目，感谢当时给我的提示', () => {
  it('', () => {
    const chapterTree = {
      name: '总章节',
      children: [
        {
          name: '章节一',
          children: [
            {
              name: '第一节',
              children: [{ name: '第一小节' }, { name: '第二小节' }],
            },
            { name: '第二节' },
          ],
        },
        {
          name: '章节二',
          children: [{ name: '章节2-1' }, { name: '章节2-2' }],
        },
      ],
    }

    const units = [
      '总章节',
      '(1)章节一',
      '(1.1)第一节',
      '(1.1.1)第一小节',
      '(1.1.2)第二小节',
      '(1.2)第二节',
      '(2)章节二',
      '(2.1)章节2-1',
      '(2.2)章节2-2',
    ]

    expect(composeLabel(chapterTree)).toEqual(units)
  })
})
