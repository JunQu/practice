export const nextGreaterElement3 = (n: number): number => {
  if (n > 2 ** 32 - 1) {
    return -1
  }

  const arr: number[] = n
    .toString()
    .split('')
    .map((v) => parseInt(v, 10))

  const stack: number[][] = []

  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1][0] <= arr[i]) {
      stack.pop()
    }
    if (stack.length) {
      const tmp = stack[stack.length - 1][0]
      const index = stack[stack.length - 1][1]
      arr[index] = arr[i]
      arr[i] = tmp
      const num = parseInt(arr.join(''), 10)
      return num >= 2 ** 32 ? -1 : num
    }
    stack.push([arr[i], i])
  }
  return -1
}
