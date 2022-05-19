// compile from APromise.ts by use 'https://www.typescriptlang.org/play'
// format by prettier
// passed promises-aplus-tests test suite, run `pnpm run test-promise`.

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const isFunction = (fn) => typeof fn === 'function'
const isObject = (obj) => obj !== null && typeof obj === 'object'
const resolvePromise = (promise2, x, resolve, reject) => {
  if (x === promise2) {
    throw new TypeError('The promise and the return value are the same')
  }
  let called = false
  if (isFunction(x) || isObject(x)) {
    let then
    try {
      then = x.then
    } catch (e) {
      if (!called) {
        reject(e)
      }
    }
    if (isFunction(then)) {
      try {
        then.call(
          x,
          (value) => {
            if (!called) {
              resolvePromise(promise2, value, resolve, reject)
              called = true
            }
          },
          (reason) => {
            if (!called) {
              reject(reason)
              called = true
            }
          }
        )
      } catch (e) {
        if (!called) {
          reject(e)
        }
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}
class APromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = null
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
    this.resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.fulfilledCallbacks.forEach((callback) => callback(value))
      }
    }
    this.reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach((callback) => callback(reason))
      }
    }
    this.catch = (onReject) => {
      this.then(null, onReject)
    }
    this.finally = (callback) => {
      return this.then(
        (value) => APromise.resolve(callback()).then(() => value),
        (reason) =>
          APromise.resolve(callback()).then(() => {
            throw reason
          })
      )
    }
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    const defaultOnFulfilled = (value) => value
    const coverOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : defaultOnFulfilled
    const defaultOnReject = (reason) => {
      throw reason
    }
    const coverOnRejected = typeof onRejected === 'function' ? onRejected : defaultOnReject
    const promise2 = new APromise((resolve, reject) => {
      const microtask = (data, handler) => {
        queueMicrotask(() => {
          try {
            const x = handler(data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      switch (this.status) {
        case FULFILLED:
          microtask(this.value, coverOnFulfilled)
          break
        case REJECTED:
          microtask(this.reason, coverOnRejected)
          break
        default:
          this.fulfilledCallbacks.push(() => microtask(this.value, coverOnFulfilled))
          this.rejectedCallbacks.push(() => microtask(this.reason, coverOnRejected))
      }
    })
    return promise2
  }
  static all(values) {
    return new APromise((resolve, reject) => {
      let count = 0
      const dataCollector = Array(values.length)
      values.forEach((promiseVal, index) => {
        promiseVal.then((val) => {
          dataCollector[index] = val
          count += 1
          if (count === values.length) {
            resolve(dataCollector)
          }
        }, reject)
      })
    })
  }
  static allSettled(promises) {
    // APromise.all is only collect fulfilled or rejected data
    // return APromise.all(
    //   promises.map((promise) => {
    //     return promise.then<{ status: 'fulfilled'; value: T }>(
    //       (value) => ({ status: FULFILLED, value }),
    //       (reason) => ({ status: REJECTED, reason })
    //     )
    //   })
    // )
    // do same thing but not use APromise.all
    return new APromise((resolve) => {
      let count = 0
      const dataCollector = []
      promises.forEach((promiseVal, index) => {
        promiseVal
          .then((value) => {
            dataCollector[index] = { status: FULFILLED, value }
            count += 1
            if (count === promises.length) {
              resolve(dataCollector)
            }
          })
          .catch((reason) => {
            dataCollector[index] = { status: REJECTED, reason }
            count += 1
            if (count === promises.length) {
              resolve(dataCollector)
            }
          })
      })
    })
  }
  static any(promises) {
    return new APromise((resolve, reject) => {
      let count = 0
      const errMessage = 'All promises were rejected'
      const errors = Array(promises.length)
      promises.forEach((promiseVal, index) => {
        promiseVal.then(resolve).catch((reason) => {
          count += 1
          errors[index] = reason
          if (count === promises.length) {
            try {
              // eslint-disable-next-line no-undef
              throw new AggregateError(errors, errMessage)
            } catch (e) {
              reject(e)
            }
          }
        })
      })
    })
  }
  static race(values) {
    return new APromise((resolve, reject) => {
      for (const promiseVal of values) {
        promiseVal.then(resolve, reject)
      }
    })
  }
  static resolve(value) {
    if (value instanceof APromise) {
      return value
    }
    return new APromise((resolve) => {
      resolve(value)
    })
  }
  static reject(reason) {
    if (reason instanceof APromise) {
      return reason
    }
    return new APromise((resolve, reject) => {
      reject(reason)
    })
  }
  static deferred() {
    let resolve
    let reject
    const promise = new APromise((res, rej) => {
      resolve = res
      reject = rej
    })
    return { resolve, reject, promise }
  }
}

// to use in nodejs
module.exports = APromise
