export const combinationSum3 = (k: number, n: number): number[][] => {
  const res: number[][] = []
  if (n <= 0 || n > 45) {
    return []
  }
  if (n === 1) {
    return k === 1 ? [[1]] : []
  }
  if (n === 45) {
    return k === 9 ? [[1, 2, 3, 4, 5, 6, 7, 8, 9]] : []
  }

  // eslint-disable-next-line max-params
  const backtracking = (start = 1, sum = 0, path: number[] = []) => {
    if (path.length > k || sum > n) {
      return
    }
    if (path.length === k) {
      if (sum === n) {
        res.push([...path])
      }
      return
    }

    for (let i = start; i <= 9; i++) {
      if (sum + i <= n) {
        path.push(i)
        backtracking(i + 1, sum + i, path)
        path.pop()
      }
    }
  }

  backtracking()

  return res
}
