export const subsetsWithDup = (nums: number[]): number[][] => {
  const result: number[][] = []

  nums.sort((a, b) => a - b)

  const backtracking = (nums: number[], track: number[], startIndex = 0) => {
    result.push([...track])
    for (let i = startIndex; i < nums.length; i++) {
      if (i === startIndex || (i > startIndex && nums[i] !== nums[i - 1])) {
        track.push(nums[i])
        backtracking(nums, track, i + 1)
        track.pop()
      }
    }
  }
  backtracking(nums, [], 0)
  return result
}
