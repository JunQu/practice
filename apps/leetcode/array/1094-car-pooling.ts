export const carPooling = (trips: number[][], capacity: number): boolean => {
  const max = 1002
  const diffArr = Array(max)
  let toMax = 0
  for (const [val, from, to] of trips) {
    diffArr[from] = (diffArr[from] || 0) + val
    diffArr[to] = (diffArr[to] || 0) - val
    toMax = to > toMax ? to : toMax
  }
  // 指向前一个
  let prev = diffArr[0] || 0
  for (let i = 1; i <= toMax; i++) {
    if (prev > capacity) {
      return false
    }
    prev = prev + (diffArr[i] || 0)
  }

  return true
}
