export const threeSum = (nums: number[]): number[][] => {
  const sum = 0
  const len = nums.length
  const ans: number[][] = []

  nums.sort((a, b) => a - b)

  for (let i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    const target = sum - nums[i]
    let left = i + 1
    let right = len - 1

    while (left < right) {
      if (nums[left] + nums[right] === target) {
        ans.push([nums[i], nums[left], nums[right]])
        left += 1
        right -= 1
        // 再去重
        while (left < right && nums[left] === nums[left - 1]) {
          left += 1
        }
        while (left < right && nums[right] === nums[right + 1]) {
          right -= 1
        }
      } else if (nums[left] + nums[right] > target) {
        right -= 1
      } else if (nums[left] + nums[right] < target) {
        left += 1
      }
    }
  }

  return ans
}
