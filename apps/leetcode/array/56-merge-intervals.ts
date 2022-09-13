export const merge = (intervals: number[][]): number[][] => {
  intervals.sort((a, b) => a[0] - b[0])

  const res: number[][] = []
  // 相交区间排序后必然连续分布，所以直接判断
  for (const interval of intervals) {
    if (!res.length) {
      res.push(interval)
    } else {
      if (interval[0] > res[res.length - 1][1]) {
        res.push(interval)
      } else if (interval[1] > res[res.length - 1][1]) {
        res[res.length - 1][1] = interval[1]
      }
    }
  }
  return res
}
