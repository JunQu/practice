export const binarySearch = (nums: number[], target: number) => {
  let left = 0
  let right = nums.length - 1
  // 这里是需要等于的部分，为了全面的覆盖
  while (left <= right) {
    // 采取 right - left 是为了避免数子太大而溢出
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}

// 此方法特点，要求小，两个元素也可以，而且left和right都在变化，相对好记忆一些
// 此时的状态：  right + 1 = left
