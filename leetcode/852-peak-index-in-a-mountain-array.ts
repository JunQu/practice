const peakIndexInMountainArray = (arr: number[]): number => {
  let left = 0
  let right = arr.length - 1
  let ans = 0
  while (left <= right - 1) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
      return mid
    }
    if (arr[mid] > arr[mid + 1]) {
      ans = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return ans
}

console.log(peakIndexInMountainArray([3, 5, 3, 2, 0]))
