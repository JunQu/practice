import { inputStream } from './until.js'

const readline = inputStream('aabcddd')

let line
// eslint-disable-next-line no-cond-assign
while ((line = readline())) {
  const map = {}
  let min = 100 // max 20
  let ret = ''
  for (const s of line) {
    map[s] = map[s] ? map[s] + 1 : 1
  }
  for (const letter in map) {
    if (map[letter] < min) {
      min = map[letter]
    }
  }
  for (const s of line) {
    if (map[s] !== min) {
      ret += s
    }
  }
  console.log(ret)
}
