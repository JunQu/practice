function arrangeCoins(n: number): number {
  let sum = 0
  for (let i = 0; i <= n; i++) {
    sum += i
    if (sum > n) {
      return i - 1
    }
  }
  return 1
}

console.log(arrangeCoins(3))
