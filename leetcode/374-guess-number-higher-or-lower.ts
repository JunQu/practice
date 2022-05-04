/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

const guess = function (num: number) {
  if (num === 1) {
    return -1
  }
  if (num === 2) {
    return 1
  }
  return 0
}
// 这道题不如直接 704 那种
const guessNumber = (n: number): number => {
  let left = 1
  let right = n
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (guess(mid) === 0) {
      return mid
    }
    if (guess(mid) < 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return 1
}
