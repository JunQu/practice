export const maxArea = (height: number[]): number => {
  let left = 0
  let right = height.length - 1
  let max = 0
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right])
    max = area > max ? area : max
    if (height[left] <= height[right]) {
      left += 1
    } else {
      right -= 1
    }
  }

  return max
}

export const maxArea1 = (height: number[]): number => {
  let max = 0
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = height[i] >= height[j] ? height[j] : height[i]
      const area = (j - i) * width
      max = area > max ? area : max
    }
  }
  return max
}
