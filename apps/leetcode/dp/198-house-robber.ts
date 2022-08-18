export function rob(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  let dp = []
  dp[0] = nums[0]
  dp[1] = nums[1] > dp[0] ? nums[1] : dp[0]
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[dp.length - 1]
}
