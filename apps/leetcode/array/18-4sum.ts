export const fourSum = (nums: number[], target: number): number[][] => {
  const ans: number[][] = []
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 3; i++) {
    // 去重
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    // 后面没有答案了
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break
    }
    // 里面就是三数之和
    for (let j = i + 1; j < nums.length - 2; j++) {
      // 一样的去重方式
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break
      }

      let left = j + 1
      let right = nums.length - 1
      while (left < right) {
        const sum = nums[left] + nums[right] + nums[i] + nums[j]
        if (sum > target) {
          right -= 1
        } else if (sum < target) {
          left += 1
        } else {
          ans.push([nums[i], nums[j], nums[left], nums[right]])

          left += 1
          right -= 1
          while (nums[left] === nums[left - 1]) {
            left += 1
          }
          while (nums[right] === nums[right + 1]) {
            right -= 1
          }
        }
      }
    }
  }

  return ans
}
