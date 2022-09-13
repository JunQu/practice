export const maximumSwap = (num: number): number => {
  if (num < 10) {
    return num
  }
  const str = num.toString().split('')
  // 不断扫描最大的数
  let maxId = str.length - 1
  // 当前比后面最大数小的数
  let cur = -1
  // 保存在 cur 后面最大的数
  let nextMax = -1

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] > str[maxId]) {
      maxId = i
    } else if (str[i] < str[maxId]) {
      cur = i
      nextMax = maxId
    }
  }

  if (cur < 0) {
    return num
  }
  ;[str[cur], str[nextMax]] = [str[nextMax], str[cur]]
  return parseInt(str.join(''), 10)
}
