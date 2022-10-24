export const partitionDisjoint = (nums: number[]): number => {
  const partitionsLeft = Array(nums.length)
  let leftMax = -Infinity
  let rightMin = Infinity
  let ret = -1
  for (let i = 0; i < nums.length; i++) {
    leftMax = Math.max(leftMax, nums[i])
    partitionsLeft[i] = leftMax
  }

  for (let i = nums.length - 1; i > 0; i--) {
    rightMin = rightMin > nums[i] ? nums[i] : rightMin
    if (partitionsLeft[i - 1] <= rightMin) {
      ret = i
    }
  }

  return ret
}
