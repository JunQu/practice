const searchRange = (nums: number[], target: number) => {
  if (!nums.length || target < nums[0] || target > nums[nums.length - 1]) {
    return [-1, -1]
  }
  let left = 0
  let right = nums.length - 1
  while (right > left && (nums[left] !== target || nums[right] !== target)) {
    if (nums[left] < target) {
      left += 1
    }
    if (nums[right] > target) {
      right -= 1
    }
  }
  if (nums[left] !== target) {
    return [-1, -1]
  }

  return [left, right]
}
