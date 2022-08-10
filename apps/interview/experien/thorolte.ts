export const throttle = (fn: Function, time: number, thisArg?: unknown) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timer) {
      return
    }
    fn.call(thisArg, ...args)
    timer = globalThis.setTimeout(() => {
      timer = null
    }, time)
  }
}

export const debounce = (fn: Function, time: number, thisArg?: unknown) => {
  let timer: null | ReturnType<typeof setTimeout> = null
  return (...args: any[]) => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = globalThis.setTimeout(() => {
      fn.call(thisArg, ...args)
      timer = null
    }, time)
  }
}
