const lengthOfLongestSubstring = (str: string): number => {
  let max = 0
  let tmp = ''
  for (const char of str) {
    const findIndex = tmp.indexOf(char)
    tmp += char
    if (findIndex > -1) {
      tmp = tmp.slice(findIndex + 1)
    }
    if (tmp.length > max) {
      max = tmp.length
    }
  }
  return max
}
console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring(''))
console.log(lengthOfLongestSubstring('a'))
console.log(lengthOfLongestSubstring('leetcode'))
console.log(lengthOfLongestSubstring('aabaab!bb'))
