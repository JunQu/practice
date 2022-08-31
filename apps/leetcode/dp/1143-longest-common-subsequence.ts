export const longestCommonSubsequence = (text1: string, text2: string): number => {
  if (text1 === text2) {
    return text1.length
  }

  // 定义 dp[0-i] 为strA的子序列
  // dp[0-j]为strB的子序列
  // dp[i][j] 为 strA 和 strB的最长子序列

  // 公式
  // dp[i][j] =
  // 相等 strA[i] = star[j]，此时把他们前一位的子序列加一,strA[i-1][j-1] + 1，因为最长序列会被继承下来，所以直接加一
  // 不相等，则看哪一个比较大，dp[i-1][j] 与 dp[i][j-1]，目的是为了继承当前最大值

  // 初始化
  const dp: number[][] = []
  dp[0] = text1[0] === text2[0] ? [1] : [0]

  for (let i = 1; i < text1.length; i++) {
    // 此时选取strB的0，即一个字符进行对比，确定第Y列,最大值即为1个字符
    dp[i] = dp[i - 1][0] === 1 || text1[i] === text2[0] ? [1] : [0]
  }

  for (let i = 1; i < text2.length; i++) {
    // 此时选取strA的0，即一个字符进行对比，确定第1列,最大值即为1个字符
    dp[0][i] = dp[0][i - 1] === 1 || text2[i] === text1[0] ? 1 : 0
  }

  for (let i = 1; i < text1.length; i++) {
    for (let j = 1; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[text1.length - 1][text2.length - 1]
}
