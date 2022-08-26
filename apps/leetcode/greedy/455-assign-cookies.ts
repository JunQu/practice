export const findContentChildren = (g: number[], s: number[]): number => {
  g.sort((a, b) => b - a)
  s.sort((a, b) => b - a)

  let i = 0
  let j = 0
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      j += 1
    }
    i += 1
  }

  return j
}
