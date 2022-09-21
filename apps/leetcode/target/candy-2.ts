export const candy2 = (candy: number[]): number | string => {
  if (!candy.length) {
    return 'NO'
  }
  let val = candy[0]
  let sum = candy[0]
  let min = candy[0]

  for (let i = 1; i < candy.length; i++) {
    val ^= candy[i]
    sum += candy[i]
    min = candy[i] < min ? candy[i] : min
  }
  return val === 0 ? sum - min : 'NO'
}
