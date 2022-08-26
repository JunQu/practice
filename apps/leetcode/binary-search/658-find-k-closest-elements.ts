export const findClosestElements = (arr: number[], k: number, x: number) => {
  if (!arr.length) {
    return []
  }
  if (arr[0] >= x || arr.length <= k) {
    return arr.slice(0, k)
  }

  if (arr[arr.length - 1] < x) {
    return arr.slice(arr.length - k, arr.length)
  }

  let left = 0
  let right = arr.length - 1
  while (right - left > k - 1) {
    if (x - arr[left] > arr[right] - x) {
      left += 1
    } else {
      right -= 1
    }
  }

  return arr.slice(left, right + 1)
}
