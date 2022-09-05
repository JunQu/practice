export function longestNiceSubarray(nums: number[]): number {
  let min = 2
  let max = nums.length > 30 ? 30 : nums.length
  if (!hasElegant(nums, 2)) {
    return 1
  }
  if (hasElegant(nums, max)) {
    return max
  }
  while (min < max) {
    const mid = ~~((max + min) / 2)
    if (hasElegant(nums, mid)) {
      if (min === mid) {
        return mid
      }
      min = mid
    } else {
      max = mid
    }
  }
  return min
}

const hasElegant = (nums: number[], size: number) => {
  console.log('size', size)
  for (let i = 0; i < nums.length; i++) {
    if (i + size <= nums.length && isElegant(nums.slice(i, i + size))) {
      return true
    }
  }
  return false
}

const isBite = (a: number, b: number) => (a & b) === 0

const isElegant = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (!isBite(arr[i], arr[j])) {
        return false
      }
    }
  }
  return true
}
