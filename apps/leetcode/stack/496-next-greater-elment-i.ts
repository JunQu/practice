export const nextGreaterElement2 = (nums1: number[], nums2: number[]): number[] => {
  const arr = []

  for (const num of nums1) {
    let len = arr.length
    let find = false
    for (const num2 of nums2) {
      if (num === num2) {
        find = true
      }
      if (find && num2 > num) {
        arr.push(num2)
        break
      }
    }
    if (len === arr.length) {
      arr.push(-1)
    }
  }
  return arr
}

// 使用单调栈进行预处理

export const nextGreaterElement = (nums1: number[], nums2: number[]): number[] => {
  // 从后往前遍历，遇到比栈顶大的就出栈，保证栈顶都是比当前元素大的，而且栈是从底部到顶部递减
  const stack: number[] = []
  const map: Record<number, number> = {}
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= nums2[i]) {
      stack.pop()
    }
    map[nums2[i]] = stack.length ? stack[stack.length - 1] : -1
    // 此时栈内没有比它小的元素了
    stack.push(nums2[i])
  }
  // 因为元素是不重复的 -> 哈希表
  return nums1.map((n) => map[n])
}
