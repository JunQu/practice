// I can't believe how easy it is.
const findMagicIndex = (nums: number[]): number => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === i) {
      return i
    }
  }
  return -1
}
