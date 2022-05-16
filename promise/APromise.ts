const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

type StatusType = 'pending' | 'fulfilled' | 'rejected'
type DataIsAnyType = any

type AnyDataFnType = (...args: DataIsAnyType[]) => any
type ExecutorType = (resolve: AnyDataFnType, reject: AnyDataFnType) => void
type ThenType = (onFulfilled?: AnyDataFnType, onRejected?: AnyDataFnType) => APromise
type ThenAbleType = {
  then: Function
}

type ResolveFnType = (data?: DataIsAnyType) => void
type RejectFnType = (reason?: DataIsAnyType) => void
type InvokeCallbackType = {
  resolve: ResolveFnType
  reject: RejectFnType
  promise: APromise
  onFulfilled: AnyDataFnType
  onRejected: AnyDataFnType
}

const isFunction = (fn: any): fn is Function => typeof fn === 'function'
const isAPromise = (obj: any): obj is APromise => obj instanceof APromise
const isObject = (obj: any): obj is Object => obj !== null && typeof obj === 'object'
const isThenable = (obj: any): obj is ThenAbleType => isObject(obj) && isFunction(obj.then)

const resolvePromise = (promise2: APromise, x: any, resolve: ResolveFnType, reject: RejectFnType) => {
  if (x === promise2) {
    throw new TypeError('The promise and the return value are the same')
  }
  if (isAPromise(x)) {
    x.then((value: DataIsAnyType) => resolvePromise(promise2, value, resolve, reject), reject)
  } else if (isFunction(x) || isObject(x)) {
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
          (value: DataIsAnyType) => {
            if (!called) {
              resolvePromise(promise2, value, resolve, reject)
              called = true
            }
          },
          (reason: DataIsAnyType) => {
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

const invokeCallbacks = (
  callbacks: InvokeCallbackType[] = [],
  status: 'fulfilled' | 'rejected',
  value: unknown,
  reason: unknown
) => {
  queueMicrotask(() => {
    callbacks.forEach(({ resolve, reject, onFulfilled, onRejected, promise }) => {
      const statusToFallbackFn = {
        [FULFILLED]: resolve,
        [REJECTED]: reject,
      }
      const statusToCallbackFn = {
        [FULFILLED]: onFulfilled,
        [REJECTED]: onRejected,
      }
      const statusToArgs = {
        [FULFILLED]: value,
        [REJECTED]: reason,
      }

      const callbackFn = statusToCallbackFn[status]
      const data = statusToArgs[status]

      if (status === FULFILLED) {
        const fallbackFn = statusToFallbackFn[status]
        fallbackFn(data)
      } else {
        try {
          const x = callbackFn(data)
          resolvePromise(promise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}

export class APromise {
  private status: StatusType = PENDING
  private value: DataIsAnyType = null
  private reason: DataIsAnyType = null

  private fulfilledCallbacks: AnyDataFnType[] = []
  private rejectedCallbacks: AnyDataFnType[] = []

  constructor(executor: ExecutorType) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  resolve = (value: any) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.fulfilledCallbacks.forEach((callback) => callback(value))
    }
  }

  reject = (reason: any) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.rejectedCallbacks.forEach((callback) => callback(reason))
    }
  }

  then: ThenType = (onFulfilled?, onRejected?) => {
    const coverOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value: DataIsAnyType) => value
    const coverOnRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason: DataIsAnyType) => {
            throw reason
          }

    const promise2 = new APromise((resolve, reject) => {
      const microtask = (data: DataIsAnyType, handler: (...args: any[]) => any): void => {
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

  catch = (onReject: AnyDataFnType) => {
    this.then(undefined, onReject)
  }

  finally = (callback: () => void) => {
    return this.then(
      (value) => APromise.resolve(callback()).then(() => value),
      (reason) =>
        APromise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }

  public static deferred: () => {}

  public static resolve(value: any) {
    if (value instanceof APromise) {
      return value
    }
    return new APromise((resolve) => {
      resolve(value)
    })
  }

  public static reject(reason: any) {
    if (reason instanceof APromise) {
      return reason
    }
    return new APromise((resolve, reject) => {
      reject(reason)
    })
  }

  public static any() {}

  public static race() {}
}

APromise.deferred = () => {
  const adapter: any = {}
  adapter.promise = new APromise((resolve, reject) => {
    adapter.resolve = resolve
    adapter.reject = reject
  })
  return adapter
}

// module.exports = APromise

const aPromise = new APromise((resolve, reject) => {
  resolve('resolve')
}).then((value) => {
  console.log(value)
  return 'then resolve'
})
