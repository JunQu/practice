export const combinationSum = (candidates: number[], target: number): number[][] => {
  const res: number[][] = []

  // eslint-disable-next-line max-params
  const backtracking = (candidates: number[], path: number[], sum = 0, start = 0) => {
    if (sum > target) {
      return
    }
    if (sum === target) {
      // 不要忘记复制，不然传入的是地址，而path是不断的改变的
      res.push([...path])
      return
    }
    for (let i = start; i < candidates.length; i++) {
      if (sum + candidates[i] <= target) {
        path.push(candidates[i])
        backtracking(candidates, path, sum + candidates[i], i)
        path.pop()
      }
    }
  }
  backtracking(candidates, [], 0, 0)
  return res
}
