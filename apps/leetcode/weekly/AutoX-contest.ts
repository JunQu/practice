export const getLengthOfWaterfallFlow = (num: number, block: number[]) => {
  if (num === 0 || !block.length) {
    return 0
  }
  if (num === 1 || num >= block.length) {
    return Math.max(...block)
  }
  // 最小顶堆，二叉堆
  const priorityQueue = block.slice(0, num)
  // 建堆，递增排序是最小顶堆的一种
  // 其他建堆方式在我这都有问题，可能我写的堆函数有点问题
  priorityQueue.sort((a, b) => a - b)

  // 不断的添加
  for (let i = num; i < block.length; i++) {
    priorityQueue[0] += block[i]
    heapfiy(priorityQueue, 0, num)
  }
  return Math.max(...priorityQueue)
}

const heapfiy = (queue: number[], parentIndex: number, size: number) => {
  if (parentIndex > size || parentIndex < 0) {
    return
  }
  let left = parentIndex * 2 + 1
  let minIndex = parentIndex

  if (queue[minIndex] > queue[left]) {
    minIndex = left
  }
  // 对比又分支
  let right = left + 1
  if (right < size && queue[minIndex] > queue[right]) {
    minIndex = right
  }
  // 与比它小分支交换
  if (minIndex !== parentIndex) {
    ;[queue[parentIndex], queue[minIndex]] = [queue[minIndex], queue[parentIndex]]
    heapfiy(queue, minIndex, size)
  }
}

export const minCostToTravelOnDays = (days: number[], tickets: number[][]): number => {
  // 定义
  const dp: number[] = []
  // dp[i] days[i] 天的最小开销
  // 买票持续时间[ days[i] , days[i] + tickets[j][0] -1]
  // 下一次买票 < days[i] + tickets[j][0]
  // 初始化
  dp[0] = 0
  // 遍历
  for (let i = 0; i < days.length; i++) {
    if (typeof dp[i] === 'number') {
      // 每个票都进行尝试
      for (const ticket of tickets) {
        let day = days[i] + ticket[0]
        let nextBuyDay = days.length
        for (let k = 0; k < days.length; k++) {
          if (day === days[k]) {
            nextBuyDay = k
            break
          }
          if (k > 0 && day > days[k - 1] && day < days[k]) {
            nextBuyDay = k
            break
          }
        }

        const price = dp[i] + ticket[1]
        dp[nextBuyDay] = typeof dp[nextBuyDay] === 'number' ? Math.min(dp[nextBuyDay], price) : price
      }
    }
  }
  return dp[days.length]
}
