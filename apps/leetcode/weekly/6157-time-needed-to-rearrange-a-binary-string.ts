export const secondsToRemoveOccurrences = (s: string) => {
  let ret = 0
  while (s.indexOf('01') >= 0) {
    // eslint-disable-next-line no-param-reassign
    s = s.replace(/01/g, '10')
    console.log(s)
    ret += 1
  }
  return ret
}
