export const grayCode = (n: number): number[] => {
  const ret = []
  for (let i = 0; i < 1 << n; i++) {
    ret.push((i >> 1) ^ i)
  }
  return ret
}
