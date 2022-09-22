export const numRescueBoats = (people: number[], limit: number): number => {
  // const sum = people.reduce((s, w) => s + w, 0)
  // // 最少指派的救生艇，这是建立在大家能完美组合到一艘船的情况下
  // const min = Math.ceil(sum / limit)

  people.sort((a, b) => a - b)
  let left = 0
  let right = people.length - 1
  let boat = 0
  while (left < right) {
    // 放入一个重的
    if (people[right] === limit || people[right] + people[left] > limit) {
      // 这是一个人占一条船的情况
      right -= 1
    } else if (people[right] + people[left] <= limit) {
      // 两个人坐一条船
      right -= 1
      left += 1
    }
    boat += 1
  }
  if (left === right) {
    boat += 1
  }
  return boat
}
