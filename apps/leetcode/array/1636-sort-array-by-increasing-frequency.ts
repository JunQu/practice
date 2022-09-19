export const frequencySort = (nums: number[]): number[] => {
  const counter = new Map()
  for (const n of nums) {
    counter.set(n, (counter.get(n) || 0) + 1)
  }
  nums.sort((a, b) => counter.get(a) - counter.get(b) || b - a)
  return nums
}
