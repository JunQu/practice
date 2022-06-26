export const longestCommonPrefix = (strs: string[]): string => {
  let ret = strs[0] || ''
  for (const str of strs) {
    let tmpStr = ''
    for (let i = 0; i < str.length || i < ret.length; i++) {
      if (str[i] === ret[i]) {
        tmpStr += str[i]
      } else {
        ret = tmpStr
        break
      }
    }
    if (!ret) {
      return ret
    }
  }
  return ret
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']) === 'fl')
