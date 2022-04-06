/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {
  if (nums[0] > target) {
    return 0
  }
  if (nums[nums.length - 1] < target) {
    return nums.length
  }
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const mid = Math.floor((right + left) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid
    } else {
      return mid
    }
  }
  return left
}
console.log(searchInsert([1, 3, 5, 6], 5))
console.log(searchInsert([1, 3, 5, 6], 2))
console.log(searchInsert([1, 3, 5, 6], 7))
console.log(searchInsert([1, 3, 5, 6], 0))
