export function rob2(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  const getMax = (arr: number[]) => {
    // i 到第i家能偷到最大的
    // 前一家和前前家与自家对比,偷这家就只能选择前前家，或者不偷这家
    // dp[i] = max(dp[i-1], dp[i-2]+val[i])
    const dp = [0, arr[0]]
    for (let i = 2; i <= arr.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i - 1])
    }
    return dp[arr.length]
  }

  return Math.max(getMax(nums.slice(0, nums.length - 1)), getMax(nums.slice(1, nums.length)))
}
