type Middleware = (next: Function) => void

const middleware: Middleware[] = [
  (next) => {
    console.log(1)
    next()
    console.log(1.1)
  },
  (next) => {
    console.log(2)
    next()
    console.log(2.2)
  },
]

function manualCompose() {
  const middleware: Middleware[] = [
    (next) => {
      console.log(1)
      next()
      console.log(1.1)
    },
    (next) => {
      console.log(2)
      next()
      console.log(2.2)
    },
  ]

  const firstFn = middleware[0]
  const lastFn = middleware[1]

  const lastNext = () => {}

  const next = () => {
    lastFn(lastNext)
  }

  firstFn(next)
}

// manualCompose()

function esCompose([fn, ...fns]: Middleware[]) {
  return () => fn?.(esCompose(fns))
}

const fn = esCompose(middleware)

// fn()

const reduceRight = middleware.reduceRight(
  (next, fn) => {
    return () => fn(next)
  },
  () => {}
)

// reduceRight()

const recursiveCompose = (middleware: Middleware[] = [], current = 0) => {
  if (current === middleware.length) {
    return () => {}
  }
  const next = current + 1
  return () => middleware[current](recursiveCompose(middleware, next))
}

const fs = recursiveCompose(middleware)
// fs()

const reduce = function (middleware: Function[] = []) {
  return middleware.reduce((current, next) => {
    return (arg: any) => current(next(arg))
  })
}

const reducerArr = [(a: number) => a + 1, (a: number) => a * 2, (a: number) => a + 3]

// console.log(reduce(ss)(5))

const reduceCompose = function (middleware: Middleware[] = []) {
  return middleware.reduce((current, next) => {
    return (arg) => current(() => next(arg))
  })(() => {})
}

// reduceCompose(middleware)

const asyncCompose = (middleware: Middleware[]) => {
  return Promise.resolve(
    // @ts-ignore
    middleware.reduceRight(
      (next, fn) => () => Promise.resolve(fn(next)),
      () => Promise.resolve()
    )()
  )
}

asyncCompose(middleware)
