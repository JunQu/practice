export const hj61ApplesPlates = (apples: number, plates: number) => {
  // 定义dp[i][j] 把i个苹果放入j个盘子的所有分法
  // dp[i][j] = dp[i][j - 1] + dp[i - j][j]
  // 当 苹果比盘子少（i<j），那么多余的盘子是重复的
  // 初始化很重要
  const dp = []
  // 初始化
  for (let i = 0; i <= apples; i++) {
    // j 为 0 ，没有盘子，就没有放，为0；j为1，只能放在那个盘子里面
    dp[i] = [0, 1]
  }
  for (let i = 1; i < plates; i++) {
    // i 为 0，没有苹果，但是盘子允许为空，所以是一种分法
    dp[0][i] = 1
  }
  // 遍历
  for (let i = 1; i <= apples; i++) {
    for (let j = 1; j <= plates; j++) {
      if (i < j) {
        dp[i][j] = dp[i][i]
      } else {
        dp[i][j] = dp[i][j - 1] + dp[i - j][j]
      }
    }
  }
  // 打印  console.log(dp)
  return dp[apples][plates]
}
