export const readBinaryWatch = (turnedOn: number): string[] => {
  if (turnedOn < 0 || turnedOn > 8) {
    return []
  }
  const res: string[] = []
  const hourList = [1, 2, 4, 8, 0, 0, 0, 0, 0, 0]
  const minsList = [0, 0, 0, 0, 1, 2, 4, 8, 16, 32]

  // eslint-disable-next-line max-params
  const backtracking = (count = 0, start = 0, hour = 0, mins = 0) => {
    if (hour > 11 || mins > 59 || count > turnedOn) {
      return
    }
    if (count === turnedOn) {
      res.push(`${hour}:${mins <= 9 ? '0' : ''}${mins}`)
      return
    }
    for (let i = start; i < 10; i++) {
      // 第一个参数计数，第二个用来选择后面的进行组合，然后就是小时和分钟用来提取结果
      backtracking(count + 1, i + 1, hour + hourList[i], mins + minsList[i])
    }
  }
  backtracking()
  return res
}
