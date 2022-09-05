export const mostBooked = (n: number, meetings: number[][]): number => {
  // 存放每个结束时间，如果延期会议，则合并时间
  const rooms = Array(n).fill(0)
  // 存放每个会议室开过会议的次数，当然也可以和结束时间放在一个数组里面，都是同时操作
  const count = Array(n).fill(0)
  // 按开始时间排序，因为优先给开始时间更早的会议
  meetings.sort((a, b) => a[0] - b[0])

  for (const [start, end] of meetings) {
    // 会议延期的情况时，选择最早结束的会议室
    let minEnd = 0
    for (let i = 0; i < n; i++) {
      if (rooms[i] < rooms[minEnd]) {
        minEnd = i
      }
      // 有空闲的房间直接分配
      if (rooms[i] <= start) {
        rooms[i] = end
        count[i] += 1
        break
      } else if (i === n - 1) {
        // 没有找到空闲房间,把整个会议结束时间合并，因为延期会议的持续时间不变
        rooms[minEnd] += end - start
        count[minEnd] += 1
      }
    }
  }
  // 取出次数最大的房间号
  let max = 0
  for (let i = 0; i < n; i++) {
    if (count[i] > count[max]) {
      max = i
    }
  }
  return max
}
