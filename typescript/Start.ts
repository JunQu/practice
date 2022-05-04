// core types

const num: number = 1
const str: string = 'abc'
const bool: boolean = true
const sybm: symbol = Symbol('acc')
const undef: undefined = undefined
const nul: null = null
const void0: void = undefined

// type only run in dev

// object types
const person: {
  name: string
  age: number
  hobbies: string[]
  role: [number, string]
} = {
  name: 'zhangsan',
  age: 18,
  hobbies: ['sing', 'dance'],
  role: [2, 'coco'],
}

// 未能识别类型
// person.role.push(2)

console.log(person.role)

enum Mao {
  ADMIN = 8,
  AUTHOR,
}

const ss = (): void => {
  return undefined
}

// unknow type

let userInput: unknown
let unserName: string

userInput = 1
userInput = '1'
userInput = true

unserName = 'ssss'

userInput = unserName

console.log(userInput)
