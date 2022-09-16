// 简单滑动窗口
export const huyang = (n: number, list: number[], k: number): number => {
  // 刚好够补上 k <= M
  if (k === list.length) {
    return n
  }
  let max = 0
  // 取K个进行补种
  for (let i = k - 1; i < list.length; i++) {
    // 补种第一次 找到缺口
    if (i === k - 1) {
      // 那么下一次的缺口就是最大的数目
      max = Math.max(max, list[k] - 1)
    }
    // 后面的都补上了
    if (i === list.length - 1) {
      // 总数减去前面的缺口
      max = Math.max(max, n - list[list.length - k - 1])
    }
    // 中间树的数量
    if (i > k - 1 && i < list.length - 1) {
      // 最大缺口的地方，减去最小缺口 [2,4,7,9] 补4,7 则是 9-2-1
      max = Math.max(max, list[i + 1] - list[i - k] - 1)
    }
  }
  return max
}
