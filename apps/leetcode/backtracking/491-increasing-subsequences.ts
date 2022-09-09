export const findSubsequences = (nums: number[]): number[][] => {
  if (nums.length <= 1) {
    return []
  }

  const collect: number[][] = []

  const backtracking = (nums: number[], start = 0, path: number[] = []) => {
    if (path.length >= 2) {
      collect.push([...path])
    }
    if (start >= nums.length) {
      return
    }
    // 给当前层，排除重复数字的操作
    const may = new Set()
    for (let i = start; i < nums.length; i++) {
      if ((!path.length || nums[i] >= path[path.length - 1]) && !may.has(nums[i])) {
        path.push(nums[i])
        // 避免后续继续徐啊
        may.add(nums[i])
        backtracking(nums, i + 1, path)
        // 回溯 不需要撤销当前层的筛选，因为不影响递归里面
        path.pop()
      }
    }
  }
  backtracking(nums)

  return collect
}
