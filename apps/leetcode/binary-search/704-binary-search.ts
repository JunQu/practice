const search = (nums: number[], target: number): number => {
  let left = 0
  let right = nums.length - 1
  // 这里需要相等
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return mid
    }
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}
// 最标准的二分方式了
console.log(search([-1, 0, 3, 5, 9, 12], 9))
console.log(search([-1, 0, 3, 5, 9, 12], 2))
console.log(search([5], 5))
