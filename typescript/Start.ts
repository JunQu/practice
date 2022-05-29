/* eslint-disable */

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

// person.role.push(Array(2))

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

const loldasda: Boolean = new Boolean(false)

const voidVal: void = undefined

interface Person {
  name: string | number
  age: number
}

const per: Person = { age: 0, name: '', birth: new Date() }

interface Person {
  birth: Date
  readonly id?: number
  [key: string]: number | Date | string | undefined
}

function sunm() {
  let args: IArguments = arguments
}

interface MyArr {
  readonly length: number
  readonly [n: number]: any
}

const myArr: MyArr = [1, 2, 3]

function pow(x: number, y: number): number {
  return x ** y
}

type func = () => void

const fnVoid: func = () => {
  console.log(123)
}

const fnNum: func = () => {
  return 123
}
const fnStr = (): void => {
  console.log(123)
  return undefined
}

function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else {
    return x.split('').reverse().join('')
  }
}
reverse('321')
reverse(789)

const mmm = <Person>{ age: 123, name: '2313' }

const nnn = mmm!.id!.toFixed()

const dasfsad: string = 123 as any as string

interface ICreate<T> {
  (length: number, value: T): Array<T>
}

const creatArr = <T>(length: number, val: T): T[] => {
  return Array().fill(val)
}

const sda = creatArr<string>(2, '2123')

// 泛型 generic

function identity<T extends { length: number }>(arg: T): T {
  return arg
}

const arr5 = identity(['1', '2', 4, 5])

const foo: fss = (x) => x
type fss = <T>(val: T) => T
const x = foo('123')

const gg = <Person>{ x: '123', name: 'cococo', age: 11, birth: new Date(), id: 121 }

// This works
type Idss = <T>(x: T) => T

type fee<T> = { x: T }

const idss: Idss = (x) => x

let b = idss({ x: '1' })

const obj2 = { x: 1, y: '2' } as const
type Obj22 = typeof gg

const arr3 = [1, 2, { name: 'Alice', age: 15 }, { name: 'Bob', age: 23 }, { name: 'Eve', age: 38 }]
type numssss = typeof arr3[number]

declare let foo3: string | null

if (typeof foo3 === 'string') {
  ;['hello', 'world'].forEach((v) => {
    console.log(v + ' ' + foo3!.toLowerCase())
  })
}

type ValueOf<T> = T extends any[] ? T[number] : T[keyof T]
