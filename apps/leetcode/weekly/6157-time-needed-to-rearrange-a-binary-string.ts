export const secondsToRemoveOccurrences = (s: string) => {
  let len = s.lastIndexOf('1')
  let ret = 0
  let zero = 0

  for (let i = 0; i <= len; i++) {
    if (s[i] === '0') {
      zero += 1
    } else if (zero > 0) {
      ret = Math.max(ret + 1, zero)
    }
  }
  return ret
}
