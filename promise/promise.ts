const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export class APromise {
  public static resolve(value) {
    if (value instanceof APromise) {
      return value
    }
    return new APromise((resolve) => {
      resolve(value)
    })
  }

  public static reject(reason) {
    if (reason instanceof APromise) {
      return reason
    }
    return new APromise((resolve, reject) => {
      reject(reason)
    })
  }

  public static any() {}
  public static race() {}

  private _status = PENDING
  value = null
  reason = null
  fulfilledCallbacks = []
  rejectedCallbacks = []

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  resolve = (value) => {
    if (this._status === PENDING) {
      this._status = FULFILLED
      this.value = value
      this.fulfilledCallbacks.forEach((callback) => callback(value))
    }
  }

  reject = (reason) => {
    if (this._status === PENDING) {
      this._status = REJECTED
      this.reason = reason
      this.rejectedCallbacks.forEach((callback) => callback(reason))
    }
  }

  resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
      throw new TypeError('The promise and the return value are the same')
    }
    const isThenable = x !== null && (typeof x === 'object' || typeof x === 'function')
    if (isThenable) {
      let then
      try {
        then = x.then
      } catch (e) {
        reject(e)
      }
      if (typeof then === 'function') {
        let called = false
        try {
          then.call(
            x,
            (y) => {
              if (!called) {
                called = true
                this.resolvePromise(promise2, y, resolve, reject)
              }
            },
            (r) => {
              if (!called) {
                called = true
                reject(r)
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

  then = (onFulfilled?, onRejected?) => {
    const coverOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    const coverOnRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    const promise2 = new APromise((resolve, reject) => {
      const microtask = (data, handler) => {
        queueMicrotask(() => {
          try {
            const x = handler(data)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      switch (this._status) {
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

  catch = (onReject) => {
    this.then(null, onReject)
  }

  finally = (callback) => {
    return this.then(
      (value) => APromise.resolve(callback()).then(() => value),
      (reason) =>
        APromise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }
}

// APromise.deferred = () => {
//   const adapter = {}
//   adapter.promise = new APromise((resolve, reject) => {
//     adapter.resolve = resolve
//     adapter.reject = reject
//   })
//   return adapter
// }

// module.exports = APromise

// const aPromise = new APromise((resolve, reject) => {
//   resolve('resolve')
// }).then((value) => {
//   console.log(value)
//   return 'then resolve'
// })
