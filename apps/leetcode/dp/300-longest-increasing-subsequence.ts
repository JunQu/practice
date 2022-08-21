export const lengthOfLIS = (nums: number[]): number => {
  // 在第i项，递增子序列的长度
  // 第一项只有一个元素
  const dp = Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 往前寻找，比当前小的，但是递增序列dp最大的
      if (nums[i] >= nums[j] && dp[j] >= dp[i]) {
        dp[i] = nums[i] === nums[j] ? dp[j] : dp[j] + 1
      }
    }
  }
  return Math.max(...dp)
}
