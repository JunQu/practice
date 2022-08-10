export const selfDividingNumbers = function (left: number, right: number): number[] {
  let result = []
  for (let i = left; i <= right; i++) {
    let num = i
    let isDividingNumber = true
    while (num && isDividingNumber) {
      const lastDigit = num % 10
      num = (num - lastDigit) / 10
      isDividingNumber = i % lastDigit === 0
    }
    if (isDividingNumber) {
      result.push(i)
    }
  }
  return result
}
