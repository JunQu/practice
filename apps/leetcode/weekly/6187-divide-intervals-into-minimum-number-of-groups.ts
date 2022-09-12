// 直接模拟，给我超时了
export const minGroups = (intervals: number[][]): number => {
  // 求最大分组，即相同区间必不能在一组，也就是求重叠区间的数量，如果重叠就需要分组
  // 求重叠不能用并查集，因为并查集是扩散的，并不是重叠越多它就越多
  // 用差分数组是合适的，这样的题目，或者类似数轴上的题目都可以使用差分数组去解决
  // 并查集是动态的，但是不能分割；差分数组必须保证数组元素顺序不变，数量不改变，可以修改数值
  const diff: number[] = []
  let max = 0 // 最大 1e5

  // 计算重叠区域
  for (const [left, right] of intervals) {
    diff[left] = (diff[left] || 0) + 1
    // 因为包含right这个点，所以需要加一
    diff[right + 1] = (diff[right + 1] || 0) - 1
    max = right > max ? right : max
  }

  let overlap = diff[0] || 0
  let maxOverlap = overlap
  // 计算最大重叠区域
  for (let i = 1; i <= max; i++) {
    overlap = (diff[i] || 0) + overlap
    maxOverlap = overlap > maxOverlap ? overlap : maxOverlap

    // 最大分组就是每个一组
    if (maxOverlap === intervals.length) {
      break
    }
  }

  return maxOverlap
}
