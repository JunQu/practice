/**
 * 使用 setTimeout 模拟实现 setInterval
 * setInterval 的缺点 ：和 setTimeout 一样，不准确
 * 模拟的优点，可能也许大概可以避免卡住页面(这样的卡住应该是对V8的挑衅，现实应该是不会被它卡住)， setInterval 给我感觉是性能上比不过 setTimeout
 * */
const timeoutToInterval = (handler: Function, delay = 0, ...args: any[]) => {
  const timeId = setTimeout(() => {
    handler(...args)
    // 这样做是否存在 bug, 目前情况是工作正常
    clearTimeout(timeId)
    timeoutToInterval(handler, delay, ...args)
  }, delay)
}

// 既然是模拟，那么就不能使用 setInterval 模拟 setTimeout
const intervalToTimeout = (handler: Function, delay = 0, ...args: any[]) => {
  const timeId = setInterval(() => {
    handler(...args)
    clearInterval(timeId)
  }, delay)
}

// 相对准确的实现，这不是替代品，因为它会阻塞页面
const handlerOnTime = (handler: Function, delay = 0, ...args: any[]) => {
  const now = Date.now()
  let offset = new Date().getTime()
  while (offset - now < delay) {
    offset = new Date().getTime()
  }
  handler(...args)
}
