const getInvalid = (str: string) => {
  const stack = []
  for (const s of str) {
    switch (s) {
      case '(':
        stack.push(s)
        break
      case ')':
        if (stack[stack.length - 1] === '(') {
          stack.pop()
        } else {
          stack.push(s)
        }
        break
    }
  }
  return stack
}

export const removeInvalidParentheses = (str: string): string[] => {
  // 结果不能重复
  const set = new Set<string>()
  // 需要被删除的列表， 更好的做法是用数字统计，加快速度
  const bracketList = getInvalid(str)
  // 循环列表，选择列表，路径保存
  const backtracking = (str: string, list: string[], path: string) => {
    // 已经没有可以选择的了，或者不需要删除了
    if (list.length === 0 || !str) {
      // eslint-disable-next-line no-param-reassign
      path += !str ? '' : str.slice()
      // 合法的就添加进入结果
      if (!getInvalid(path).length) {
        set.add(path)
      }
      return
    }

    for (let i = 0; i < str.length; i++) {
      // 这里选择是按照列表顺序来的，但是结果是对的，我没法知道道理，可能保证了删除列表里面的，就能保持合法的括号
      if (str[i] === list[0]) {
        // 当前需要删除的在列表，选择删除
        const bracket = list.shift()
        // 进入回溯操作
        backtracking(str.slice(i + 1), list, path)
        // 撤销选择
        list.unshift(bracket!)
      }
      // 无论是回溯回退还是其他符号，都是要添加进路径
      // eslint-disable-next-line no-param-reassign
      path += str[i]
    }
  }

  backtracking(str, bracketList, '')

  return [...set]
}
