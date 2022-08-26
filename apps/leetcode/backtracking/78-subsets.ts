export const subsets = (nums: number[]): number[][] => {
  if (!nums.length) {
    return [[]]
  }
  if (nums.length === 1) {
    return [[], nums]
  }

  const result: number[][] = []

  const backtracking = (nums: number[], startIndex = 0, track: number[]): void => {
    result.push([...track])

    for (let i = startIndex; i < nums.length; i++) {
      track.push(nums[i])
      backtracking(nums, i + 1, track)
      track.pop()
    }
  }

  backtracking(nums, 0, [])

  return result
}
