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

export const shiftingLetters = (str: string, shifts: number[][]): string => {
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
