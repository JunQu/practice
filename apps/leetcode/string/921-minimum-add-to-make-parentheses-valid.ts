export const minAddToMakeValid = (str: string): number => {
  if (!str.length) {
    return 0
  }

  let left = 0
  let right = 0

  for (const s of str) {
    if (s === '(') {
      left += 1
    }

    if (s === ')') {
      if (left > 0) {
        left -= 1
      } else {
        right += 1
      }
    }
  }

  return left + right
}
