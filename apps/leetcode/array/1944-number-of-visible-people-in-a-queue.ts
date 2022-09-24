export const canSeePersonsCount = (heights: number[]): number[] => {
  if (heights.length === 1) {
    return [0]
  }
  if (heights.length === 2) {
    return [1, 0]
  }
  const ret: number[] = Array(heights.length).fill(0)

  const stack: number[] = [heights[heights.length - 1]]

  for (let i = heights.length - 2; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= heights[i]) {
      ret[i] += 1
      stack.pop()
    }
    stack.push(heights[i])
  }

  return ret
}
