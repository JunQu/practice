const shortestToChar = (str: string, char: string): number[] => {
  const tmp: number[] = []
  const ret: number[] = []
  let currentIndex: number
  let oldIndex = -1
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      tmp.push(i)
    }
  }
  currentIndex = (tmp.length ? tmp.shift() : -1) as number
  for (let i = 0; i < str.length; i++) {
    const distance =
      oldIndex < 0 ? Math.abs(i - currentIndex) : Math.min(Math.abs(i - oldIndex), Math.abs(i - currentIndex))
    ret.push(distance)
    if (tmp.length && str[i] === char) {
      oldIndex = currentIndex
      currentIndex = tmp.shift() as number
    }
  }
  return ret
}

console.log(shortestToChar('abbbc', 'b'))
console.log(shortestToChar('abbbc', 'c'))
console.log(shortestToChar('abbbc', 'a'))
console.log(shortestToChar('loveleetcode', 'e'))
