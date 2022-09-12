export const corpFlightBookings = (bookings: number[][], n: number): number[] => {
  const diffArr = Array(n).fill(0)

  for (const [first, last, seats] of bookings) {
    diffArr[first - 1] += seats
    if (last <= n - 1) {
      diffArr[last] -= seats
    }
  }
  const ans: number[] = [diffArr[0]]

  for (let i = 1; i < n; i++) {
    ans[i] = ans[i - 1] + diffArr[i]
  }

  return ans
}
