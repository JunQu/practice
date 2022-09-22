export const eraseOverlapIntervals = (intervals: number[][]): number => {
  // 采取终点最小的原因是为了最小移除，而采取终点则不用担心
  // 如果采用起点，那么终点可能非常大而导致需要采取特别措施，变成了求最大子序列的问题
  intervals.sort((a, b) => a[1] - b[1])
  let count = 0
  let prev = intervals[0]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prev[1]) {
      // 重叠了，移除
      count += 1
    } else {
      // 没有重叠，保留
      prev = intervals[i]
    }
  }

  return count
}
