export const cuttingRopeDp = (n: number): number => {
  if (n < 2) {
    return n
  }
  if (n === 2) {
    return 1
  }
  if (n === 3) {
    return 2
  }
  if (n === 4) {
    return 4
  }
  // 在大于等于 5 有 3(n-3) >= 2(n-2)
  // 当前段绳子剪能得到的最大乘积
  const dp: number[] = Array(n + 1).fill(0)
  // 初始化前面几个
  dp[1] = 1
  dp[2] = 1
  dp[3] = 2
  dp[4] = 4
  dp[5] = 6

  for (let i = 5; i <= n; i++) {
    // 寻找当前段最大的数,超过一半就是相同的，最少也是剪2米
    for (let j = 2; j <= i / 2; j++) {
      // 剩下的一段可以选择剪，或者不剪
      dp[i] = Math.max(dp[i], j * dp[i - j], j * (i - j))
    }
  }

  return dp[n]
}

export const cuttingRope = (n: number): number => {
  if (n < 2) {
    return 0
  }
  if (n === 2) {
    return 1
  }
  if (n === 3) {
    return 2
  }
  if (n === 4) {
    return 4
  }
  if (n === 5) {
    return 6
  }

  return n % 3 === 0 ? 3 ** (n / 3) : 3 ** (Math.floor(n / 3) - 1) * 4
}
