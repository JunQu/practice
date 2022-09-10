export const leastInterval = (tasks: string[], n: number): number => {
  if (n <= 0) {
    return tasks.length
  }
  const map: Record<string, number> = {}
  let max = 0 // 最多次数的任务，首先安排最多的，然后安排剩下里面不在冷却中且次数最多的

  for (const task of tasks) {
    const count = (map[task] ?? 0) + 1
    map[task] = count
    max = count > max ? count : max
  }
  // 多少种最多的任务
  const kind = Object.values(map).filter((v) => v === max).length

  const time = (max - 1) * (n + 1) + kind

  return Math.max(time, tasks.length)
}
