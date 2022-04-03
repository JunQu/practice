/**
 * @param {number} x
 * @return {boolean}
 */
// 此方法主要采用位数对比，没有反转整个数，而是首位和尾数对比
const isPalindrome1 =  (x) => {
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false
  }

  let digit = 0   // x 的位数
  let num = x     // 缓存 x
  while (num >= 1) {
    num = (num - (num % 10)) / 10
    digit++
  }

  // 这里可以直接使用 x
  num = x
  // 使用 || 是为了避免中间位是0 例如 100021
  while (digit > 0 || num >= 10) {
    // 取出首位，每一步都是整数运算避免JS小数运算问题
    const headDigit = (num / 10 ** (digit - 1)) | 0
    // 取出最后一位
    const lastDigit = num % 10
    // 进行判断是否相同
    if (headDigit !== lastDigit) {
      return false
    }
    // 去掉首位
    num -= headDigit * 10 ** (digit - 1)
    // 去掉最后一位
    num = (num - (num % 10)) / 10
    // 同时因为去掉两位数
    digit -= 2
  }
  return true
}

/**
 * @param {number} x
 * @return {boolean}
 */
// 这里是反转后进行对比
const isPalindrome2 = function (x) {
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false
  }
  let num = 0
  let tmp = x
  // 进行整个数的反转
  while (tmp) {
    num = num * 10 + (tmp % 10)
    tmp = (tmp - (tmp % 10)) / 10
  }
  // 反转后是否与原数相同
  return x === num
}

