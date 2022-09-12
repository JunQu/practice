// eslint-disable-next-line max-params
const changeArr = (arr: number[], start: number, end: number, direction: number) => {
  for (let i = start; i <= end; i++) {
    arr[i] = direction === 0 ? arr[i] - 1 : arr[i] + 1
  }
}

const removeLetter = (letter: string, index: number) => {
  if (index === 0) {
    return letter
  }
  const start = 'a'.charCodeAt(0)
  const end = 'z'.charCodeAt(0)
  const code = letter.charCodeAt(0) + (index % 26)
  const charCode = code >= start && code <= end ? code : code < start ? code + 26 : code - 26
  return String.fromCharCode(charCode)
}
// 暴力法
export const shiftingLettersOld = (str: string, shifts: number[][]): string => {
  let ret = ''
  const arr = Array(str.length).fill(0)

  for (const shift of shifts) {
    changeArr(arr, shift[0], shift[1], shift[2])
  }

  for (let i = 0; i < str.length; i++) {
    ret += removeLetter(str[i], arr[i])
  }
  return ret
}
// 差分数组的方法
export const shiftingLetters = (str: string, shifts: number[][]): string => {
  const len = str.length
  const difArr = Array(len + 1).fill(0)
  const strList: Record<string, string | number> = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
    8: 'i',
    9: 'j',
    10: 'k',
    11: 'l',
    12: 'm',
    13: 'n',
    14: 'o',
    15: 'p',
    16: 'q',
    17: 'r',
    18: 's',
    19: 't',
    20: 'u',
    21: 'v',
    22: 'w',
    23: 'x',
    24: 'y',
    25: 'z',
  }

  for (const [start, end, direction] of shifts) {
    difArr[start] += direction === 0 ? -1 : 1
    difArr[end + 1] -= direction === 0 ? -1 : 1
  }

  const getLetter = (index: number, deviation: number): string => {
    let idx: number = ((strList[str[index]] as number) + deviation) % 26
    idx += idx >= 0 ? 0 : 26
    return strList[idx] as string
  }
  let deviation = difArr[0]
  let res: string = getLetter(0, deviation)

  for (let i = 1; i < len; i++) {
    deviation += difArr[i]
    if (deviation !== 0) {
      res += getLetter(i, deviation)
    } else {
      res += str[i]
    }
  }

  return res
}
