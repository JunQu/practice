export const taskDispatch = (tasks: number[], n: number) => {
  let maxKind = 0
  let max = 0
  const hash = new Map()

  for (const task of tasks) {
    hash.set(task, (hash.get(task) || 0) + 1)
  }
  max = Math.max(...hash.values())
  maxKind = [...hash.values()].filter((v) => v === max).length
  const time = (max - 1) * (n + 1) + maxKind
  // 最后是不需要时间的,每次能执行的是n+1个任务
  return Math.max(time, tasks.length)
}
