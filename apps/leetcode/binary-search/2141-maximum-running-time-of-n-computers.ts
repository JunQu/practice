export const maxRunTime = (n: number, batteries: number[]): number => {
  let sum = 0
  for (const battery of batteries) {
    sum += battery
  }

  let left = 1
  let right = Math.floor(sum / n)

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    // 电脑数量不超过电池
    if (check(mid, n, batteries)) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return right
}
// check 函数比较难懂
const check = (time: number, n: number, batteries: number[]) => {
  let sum = 0
  for (const battery of batteries) {
    sum += Math.min(battery, time)
  }
  return sum >= n * time
}
