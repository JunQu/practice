export const canJump = (nums: number[]): boolean => {
  // 只有一个位置，即当前位置就是终点
  if (nums.length < 2) {
    return true
  }

  let max = -1

  for (let i = 0; i < nums.length - 1; i++) {
    // 当前位置都没能跳到的情况
    if (i > 0 && max < i) {
      return false
    }
    // 之前起跳的位置范围大，还是当前范围大
    max = Math.max(nums[i] + i, max)
    // 范围能否覆盖终点
    if (max >= nums.length - 1) {
      return true
    }
  }

  return false
}
