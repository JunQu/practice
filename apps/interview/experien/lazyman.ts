const lazyMan = (name: string) => {
  const queue: Function[] = []

  const next = () => {
    const nextTask = queue.shift()
    nextTask?.()
  }

  const task = () => {
    console.log(`I am ${name}`)
    next()
  }

  queue.push(task)

  const man = {
    sleep(n: number) {
      const task = () => {
        setTimeout(() => {
          console.log(`sleep ${n} seconds`)
          next()
        }, n * 1000)
      }
      queue.push(task)
      return man
    },
    eat(type: string) {
      const task = () => {
        console.log(`eat ${type}`)
        next()
      }
      queue.push(task)

      return man
    },
    sleepFirst(n: number) {
      const task = () => {
        setTimeout(() => {
          console.log(`sleep First ${n} seconds`)
          next()
        }, n * 1000)
      }
      queue.unshift(task)
      return man
    },
  }

  setTimeout(next)

  return man
}

lazyMan('hi')

lazyMan('bob').sleepFirst(5).eat('lunch')

const time = Date.now()

console.log(time)
