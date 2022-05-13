// interface
interface printLabel {
  label: string
  readonly name: string
  color?: string
  size?: number
  [key: string | symbol]: string | number | undefined
}

export function outLabel(label: printLabel): void {
  console.log(label.label)
}

const obj = {
  size: 1,
  color: 'red',
  label: 'hello',
  name: 'world',
}

outLabel(obj)

interface SquareConfig {
  color?: string
  width?: number
}

const createSquare = (config: SquareConfig): void => {
  console.log(config.color)
}

const mySquare = createSquare({ color: 'red', width: 100 })

// function type
interface SearchFunc {
  (source: string, substring: string): boolean
}

let meSearch: SearchFunc
meSearch = (source, substring) => {
  let result = source.search(substring)
  return result > -1
}

const mfSearch = (source: string, substring: string) => {
  let result = source.search(substring)
  return result > -1
}

interface StringAttay {
  [arrIndex: number]: symbol
}
const myArray: StringAttay = [Symbol('12'), Symbol(22)]

const strt = myArray[3]

console.log('strt:', strt)

// type alias
type keyType = string | symbol

const live = (x: number | null) => {
  console.log(1)
  console.log(x!.toFixed(2))
}

console.log(live(1))
