// 和分割 k 个相等的集合几乎是一样的
export const makesquare = (matchsticks: number[]): boolean => {
  const lens = 4
  const sum = matchsticks.reduce((s, m) => s + m, 0)

  if (sum % 4) {
    return false
  }
  const subSum = sum / 4
  // 四条边
  const bucket = Array(lens).fill(0)

  const backtracking = (matchsticks: number[], index = 0, bucket: number[]) => {
    if (index === matchsticks.length) {
      return true
    }
    for (let i = 0; i < lens; i++) {
      // 第一个就放第一个桶子
      if (i > 0 && index === 0) {
        break
      }
      if (bucket[i] + matchsticks[index] > subSum || (i > 0 && bucket[i] === bucket[i - 1])) {
        continue
      }
      // 放入桶子
      bucket[i] += matchsticks[index]
      // 其余的继续放入
      if (backtracking(matchsticks, index + 1, bucket)) {
        return true
      }
      // 拿出来
      bucket[i] -= matchsticks[index]
    }
    return false
  }
  return backtracking(matchsticks, 0, bucket)
}
