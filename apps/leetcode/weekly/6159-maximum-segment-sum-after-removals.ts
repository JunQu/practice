export const maximumSegmentSum = (nums: number[], removeQueries: number[]) => {
  const ret = []
  for (const i of removeQueries) {
    nums[i] = 0
    ret.push(getMaxSubSum(nums))
  }
  return ret
}

const getMaxSubSum = (arr: number[]) => {
  let maxSum = 0
  let sum = 0
  for (const n of arr) {
    if (n > 0) {
      sum += n
    } else {
      maxSum = sum > maxSum ? sum : maxSum
      sum = 0
    }
  }

  return sum > maxSum ? sum : maxSum
}
