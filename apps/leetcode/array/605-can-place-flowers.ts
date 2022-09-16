export const canPlaceFlowers = (flowerbed: number[], n: number): boolean => {
  if (n === 0) {
    return true
  }
  // 无地自容
  if (!flowerbed.length) {
    return false
  }
  // 只有一个花盆
  if (flowerbed.length === 1) {
    return flowerbed[0] === 0 && n === 1
  }
  let count = 0
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 1) {
      continue
    }
    if (
      (i === 0 && flowerbed[1] === 0) ||
      (i === flowerbed.length - 1 && flowerbed[i - 1] === 0) ||
      (flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0)
    ) {
      count += 1
      // 强行种植
      flowerbed[i] = 1
    }
    if (count >= n) {
      return true
    }
  }
  return count >= n
}
