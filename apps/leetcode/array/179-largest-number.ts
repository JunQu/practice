export const largestNumber = (nums: number[]): string => {
  if (nums.length < 2) {
    return nums.join('')
  }

  nums.sort((nums1, nums2) => {
    const str1 = nums1.toString()
    const str2 = nums2.toString()

    if (str1[0] > str2[0]) {
      return -1
    }
    if (str1 + str2 > str2 + str1) {
      return -1
    }

    return 1
  })
  // 前面为 0 即大伙都是 0， 这是值得注意的前导零
  if (nums[0] === 0) {
    return '0'
  }

  return nums.join('')
}
