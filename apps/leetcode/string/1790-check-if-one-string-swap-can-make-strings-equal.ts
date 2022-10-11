export const areAlmostEqual = (s1: string, s2: string): boolean => {
  if (s1.length !== s2.length) {
    return false
  }
  if (s1 === s2) {
    return true
  }
  const len = s1.length
  let charS1 = ''
  let charS2 = ''
  for (let i = 0; i < len; i++) {
    if (s1[i] !== s2[i] && charS1) {
      if (s1[i] === charS2 && s2[i] === charS1) {
        charS1 = '$'
        charS2 = '$'
      } else {
        return false
      }
    }
    if (s1[i] !== s2[i] && !charS1) {
      charS1 = s1[i]
      charS2 = s2[i]
    }
  }
  return charS1 === '$'
}

export const areAlmostEqual2 = (s1: string, s2: string): boolean => {
  if (s1.length !== s2.length) {
    return false
  }
  if (s1 === s2) {
    return true
  }
  const diff: string[][] = []
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diff.push([s1[i], s2[i]])
    }
  }
  if (diff.length !== 2) {
    return false
  }

  return diff[0][0] === diff[1][1] && diff[0][1] === diff[1][0]
}
