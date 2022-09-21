export const removeKdigits = (n: string, k: number): string => {
  const nums = n.split('')
  let ret = ''
  let prevIndex = -1
  let count = nums.length - k

  for (let i = 0; i < count; i++) {
    let min = '9'
    for (let j = prevIndex + 1; j <= nums.length - count + i; j++) {
      if (nums[j] < min) {
        min = nums[j]
        prevIndex = j
      }
    }
    ret += !ret && min === '0' ? '' : min
  }
  return ret || '0'
}
