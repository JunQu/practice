export const nextGreaterElements = (nums: number[]): number[] => {
  const stack: number[] = []
  const map: Record<number, number> = {}
  // 循环数组最多也是遍历两次，那么可以复制两次
  for (let i = nums.length * 2 - 1; i >= 0; i--) {
    const real = i % nums.length
    while (stack.length && stack[stack.length - 1] <= nums[real]) {
      stack.pop()
    }
    // 可能重复所以存下标
    map[real] = stack.length ? stack[stack.length - 1] : -1
    stack.push(nums[real])
  }

  return nums.map((it, index) => map[index])
}
