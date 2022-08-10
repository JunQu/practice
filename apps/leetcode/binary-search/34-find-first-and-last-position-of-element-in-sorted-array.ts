const searchRange = (nums: number[], target: number): number[] => {
  // 普通法： 直接遍历，复杂度为 O(n)
  const ans: number[] = []
  let tmpIndex = -1
  let left = 0
  let right = nums.length - 1
  while (left <= right && tmpIndex === -1) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      tmpIndex = mid
    }
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  left = right = tmpIndex
  // 这样写是不对的，而且是复杂的，所有情况下都不应该这么做，这里仅仅是为了演示这种特性
  while ((ans[0] = left) > -1 && --left >= 0 && nums[left] === target) {}
  while ((ans[1] = right) > -1 && ++right < nums.length && nums[right] === target) {}
  return ans
}

console.log(searchRange([1, 1], 1))
