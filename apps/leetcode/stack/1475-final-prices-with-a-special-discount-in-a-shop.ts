export const finalPrices = (prices: number[]): number[] => {
  const stack: number[] = []
  const map: Record<number, number> = {}

  for (let i = prices.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] > prices[i]) {
      stack.pop()
    }

    map[i] = stack.length ? stack[stack.length - 1] : 0
    stack.push(prices[i])
  }
  return prices.map((price, index) => price - map[index])
}
