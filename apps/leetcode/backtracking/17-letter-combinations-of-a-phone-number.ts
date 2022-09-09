// 常规组合题目
export const letterCombinations = (digits: string): string[] => {
  const ret: string[] = []
  const phone = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const list = digits.split('').map((i) => phone[parseInt(i, 10) - 2])

  const backtracking = (list: string[], current = 0, path = '') => {
    // 结束条件,每次选择一个,和按钮的数目相同就是完成
    if (current >= digits.length) {
      if (current === digits.length) {
        ret.push(path)
      }
      return
    }
    // 主要是要把每个index + 1
    const str = list[current]
    for (const s of str) {
      // 因为选择这个，就得选下一个index，不会在这里重复
      backtracking(list, current + 1, path + s)
    }
  }

  backtracking(list)
  return ret
}
