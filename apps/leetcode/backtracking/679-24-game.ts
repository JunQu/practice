export const judgePoint24 = (nums: number[]): boolean => {
  if (nums.length !== 4) {
    return false
  }
  const find24 = (arr: number[]): boolean => {
    if (arr.length === 1 && Math.abs(arr[0] - 24) < 0.0000001) {
      return true
    }
    let isValidate = false

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        // 选取两张
        const numX = arr[i]
        const numY = arr[j]
        const other = []
        // 另外两张重新处理
        for (let k = 0; k < arr.length; k++) {
          if (k !== i && k !== j) {
            other.push(arr[k])
          }
        }
        // 对于四则运算没有什么好的循环办法，直接手写
        isValidate =
          find24([...other, numX + numY]) ||
          find24([...other, numX * numY]) ||
          find24([...other, numX - numY]) ||
          find24([...other, numY - numX])

        if (numX !== 0) {
          isValidate = isValidate || find24([...other, numY / numX])
        }
        if (numY !== 0) {
          isValidate = isValidate || find24([...other, numX / numY])
        }
        if (isValidate) {
          return isValidate
        }
      }
    }

    return isValidate
  }

  return find24(nums)
}
