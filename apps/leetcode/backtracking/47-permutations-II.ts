export const permuteUnique = (nums: number[]): number[][] => {
  const ret: number[][] = []
  nums.sort((a, b) => a - b)

  const backtracking = (nums: number[], track: number[], used: boolean[]) => {
    if (track.length === nums.length) {
      ret.push([...track])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      // 已经被使用，或者前面相同的被使用
      const isUsed = used[i] || (i > 0 && nums[i] === nums[i - 1] && used[i - 1])
      if (!isUsed) {
        track.push(nums[i])
        used[i] = true
        backtracking(nums, track, used)
        track.pop()
        used[i] = false
      }
    }
  }
  backtracking(nums, [], [])
  return ret
}
