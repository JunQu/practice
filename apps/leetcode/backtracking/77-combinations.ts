export const combine = (n: number, k: number): number[][] => {
  const res: number[][] = []

  const backtracking = (current = 1, path: number[] = []) => {
    if (path.length > k) {
      return
    }
    if (path.length === k) {
      res.push([...path])
      return
    }
    for (let i = current; i <= n; i++) {
      path.push(i)
      backtracking(i + 1, path)
      path.pop()
    }
  }

  backtracking()
  return res
}
