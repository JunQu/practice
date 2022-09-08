export const countArrangement = (n: number): number => {
  let c = 0

  const backtracking = (n: number, used: boolean[], collect: number[]) => {
    if (collect.length === n) {
      c += 1
      return
    }
    for (let i = 1; i <= n; i++) {
      const idx = collect.length + 1
      // 里面就是全排列，现在是做了些筛选
      if (!used[i] && (i % idx === 0 || idx % i === 0)) {
        used[i] = true
        collect.push(i)
        backtracking(n, used, collect)
        used[i] = false
        collect.pop()
      }
    }
  }

  backtracking(n, [], [])

  return c
}
