// 元素少于 16 个，要么是回溯，那么是非常难的题目
export const canPartitionKSubsets = (nums: number[], k: number): boolean => {
  const sum = nums.reduce((s, n) => s + n, 0)
  if (sum % k) {
    return false
  }
  // 每个桶应该得到的值
  const subSum = sum / k
  const bucket = Array(k).fill(0)

  const backtrack = (nums: number[], bucket: number[] = [], index = 0) => {
    // 一个个球的处理
    if (index === nums.length) {
      // return bucket.every((sum) => sum === subSum)
      // 因为是 k 个桶，而且每个桶的值不超过 subSum ，在放完所有元素，桶的值必然为 subSum
      return true
    }

    // 分成 k 个桶子
    for (let i = 0; i < k; i++) {
      // 其他桶子不尝试第一个球，因为都是一样的
      if (i > 0 && index === 0) {
        break
      }
      const isLess = bucket[i] + nums[index] <= subSum
      const same = i > 0 && bucket[i] === bucket[i - 1]
      // 能否放入该桶
      if (isLess && !same) {
        bucket[i] += nums[index]
        // 准备下一个放置
        if (backtrack(nums, bucket, index + 1)) {
          return true
        }
        // 拿出来
        bucket[i] -= nums[index]
      }
    }

    return false
  }

  return backtrack(nums, bucket, 0)
}
