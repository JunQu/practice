export const generateParenthesis = (n: number): string[] => {
  const collect = new Set<string>()

  const backtracking = (path = '', left = 0, right = 0) => {
    if (left === n && right === n) {
      collect.add(path)
      return
    }
    // 两种选择 ( 和 ） 先添加 （
    if (left < n) {
      backtracking(path + '(', left + 1, right)
    }
    // ） 必须比（ 数量少的时候，才能继续添加
    if (right < left) {
      backtracking(path + ')', left, right + 1)
    }
  }

  backtracking()

  return [...collect]
}

const isValid = (str: string): boolean => {
  let left = 0
  for (const s of str) {
    if (s === '(') {
      left += 1
    }
    if (s === ')') {
      if (left) {
        left -= 1
      } else {
        return false
      }
    }
  }
  return !left
}
