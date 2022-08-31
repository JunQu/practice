// 题目并不能像现实一样，横着套不进，可以选择竖着套进去，题目必须严格的横宽对比
const check = (a: number[], b: number[], strict = false): boolean => {
  if (strict) {
    return (a[0] > b[0] && a[1] > b[1]) || (a[0] > b[1] && a[1] > b[0])
  }
  return (a[0] >= b[0] && a[1] >= b[1]) || (a[0] >= b[1] && a[1] >= b[0])
}

// 就是最大上升子序列问题，只是先要排序
export const maxEnvelopes = (envelopes: number[][]): number => {
  if (!envelopes.length) {
    return 0
  }

  envelopes.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    } else {
      return b[1] - a[1]
    }
  })

  // 然后就是最大上升子序列
  const dp = Array(envelopes.length).fill(1)
  for (let i = 1; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][1] >= envelopes[j][1] && dp[j] >= dp[i]) {
        dp[i] = envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1] ? dp[j] + 1 : dp[j]
      }
    }
  }

  return Math.max(...dp)
}
