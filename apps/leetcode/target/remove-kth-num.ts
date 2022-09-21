export const removeKthNum = (n: string, k: number): number => {
  const nums = n.split('').map((v) => parseInt(v, 10))
  let ret = 0
  let prevIndex = 0
  let count = nums.length - k

  for (let i = 0; i < count; i++) {
    let min = 10
    for (let j = prevIndex + 1; j <= nums.length - count + i; j++) {
      if (nums[j] < min) {
        min = nums[j]
        prevIndex = j
      }
    }
    ret = ret * 10 + min
  }
  return ret
}
