export const specialArray = (nums: number[]): number => {
  nums.sort((a, b) => b - a)
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i - 1] > i && nums[i] < i) {
      return i
    }
  }
  return -1
}
