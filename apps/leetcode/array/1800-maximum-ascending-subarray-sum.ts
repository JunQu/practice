export const maxAscendingSum = (nums: number[]): number => {
  let sum = nums[0]
  let max = sum
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      sum += nums[i]
    }
    if (nums[i] <= nums[i - 1] || i === nums.length - 1) {
      max = sum > max ? sum : max
      // 因为元素范围是1～100，如果都为负数，那么选择最大的负数
      sum = nums[i]
    }
  }

  return max
}
