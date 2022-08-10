/*
* // 将树结构转为数组，注意章节的标题
var chapterTree = {
  name: '总章节',
  children: [
    {
      name: '章节一',
      children: [
        {
          name: '第一节',
          children: [
            {name: '第一小节'},
            {name: '第二小节'}
          ]
        },
        {name: '第二节'}
      ]
    },
    {
      name: '章节二',
      children: [
        {name: '章节2-1'},
        {name: '章节2-2'}
      ]
    }
  ]
}

composeLabel(chapterTree)
// 输出 ["总章节", "(1)章节一", "(1.1)第一节", "(1.1.1)第一小节", "(1.1.2)第二小节", "(1.2)第二节", "(2)章节二", "(2.1)章节2-1", "(2.2)章节2-2"]
* */

type IChapterTree = {
  name: string
  children?: IChapterTree[]
}

export const composeLabel = (chapterTree: IChapterTree, prefix = ''): string[] => {
  if (!chapterTree) {
    return []
  }
  const titles: Array<string> = []
  // 这里多次提示我的字符串性能问题，在这纠结了一段时间
  let name = prefix ? `(${prefix})${chapterTree.name}` : chapterTree.name
  titles.push(name)
  chapterTree.children?.forEach((chapter, index) => {
    // 为了优化字符串拼接的性能问题，每次先计算下一章的标题再传入
    const unitName = prefix ? prefix + `.${index + 1}` : `${index + 1}`
    titles.push(...composeLabel(chapter, unitName))
  })
  return titles
}
