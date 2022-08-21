export const minimumRecolors = (blocks: string, k: number): number => {
  let min = 0
  let count = 0
  for (let i = 0; i < blocks.length; i++) {
    if (i < k && blocks[i] === 'W') {
      count += 1
    }
    if (i >= k && blocks[i] !== blocks[i - k]) {
      count = blocks[i] === 'B' && blocks[i - k] !== 'B' ? count - 1 : count + 1
    }
    min = count < min || i < k ? count : min
  }
  return min
}
