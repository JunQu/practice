export const combinationSum2 = (candidates: number[], target: number): number[][] => {
  const count = new Map<number, number>()

  for (const candidate of candidates) {
    count.set(candidate, (count.get(candidate) || 0) + 1)
  }

  const keys = [...count.keys()].sort((a, b) => a - b)
  const res: number[][] = []
  // eslint-disable-next-line max-params
  const backtracking = (list: number[], sum = 0, start = 0, path: number[]) => {
    if (sum > target) {
      return
    }
    if (sum === target) {
      res.push([...path])
      return
    }
    for (let i = start; i < list.length; i++) {
      if (count.get(list[i]) && sum + list[i] <= target) {
        path.push(list[i])
        count.set(list[i], count.get(list[i])! - 1)
        backtracking(list, sum + list[i], i, path)
        path.pop()
        count.set(list[i], count.get(list[i])! + 1)
      }
    }
  }

  backtracking(keys, 0, 0, [])
  return res
}
