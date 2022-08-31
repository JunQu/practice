export const minPathSum = (grid: number[][]): number => {
  const row = grid[0].length
  const col = grid.length
  const dp = []
  // 定义： dp[i][j] 是到达第 i行j列格子的路径最小值
  dp[0] = [grid[0][0]]

  // 初始化 需要加上自身的值
  for (let m = 1; m < col; m++) {
    dp[m] = [grid[m][0] + dp[m - 1][0]]
  }
  for (let n = 1; n < row; n++) {
    dp[0][n] = grid[0][n] + dp[0][n - 1]
  }

  // 公式 dp[i] = min(dp[i-1][j], dp[i][j-1]) + val[i]
  // 遍历过程由于是与左边的值有关，需要顺序遍历，逆序遍历则先要求出右边的值
  for (let m = 1; m < col; m++) {
    for (let n = 1; n < row; n++) {
      dp[m][n] = Math.min(dp[m - 1][n], dp[m][n - 1]) + grid[m][n]
    }
  }
  // console.log(dp)
  return dp[col - 1][row - 1]
}
