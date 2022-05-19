type StatusType = 'pending' | 'fulfilled' | 'rejected'
type ResolveFn<T = unknown> = (value: T) => void
type RejectFn = (reason: any) => void
type ExecutorFn<T> = (resolve: ResolveFn<T>, reject: RejectFn) => void

type FulfilledCallbackFn<T> = (value: T) => void
type RejectedCallbackFn = (reason: any) => void

type OnFulFilledFn<T, TResult1 = T> = ((value: T) => TResult1 | APromise<TResult1>) | undefined | null
type OnRejectedFn<TResult2> = ((reason: any) => TResult2 | APromise<TResult2>) | undefined | null

type SettledValue<T> = { status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = (fn: any): fn is Function => typeof fn === 'function'

const isObject = (obj: any): obj is Object => obj !== null && typeof obj === 'object'

const resolvePromise = <T>(promise2: APromise<T>, x: any, resolve: ResolveFn<T>, reject: RejectFn) => {
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
          (value: T) => {
            if (!called) {
              resolvePromise(promise2, value, resolve, reject)
              called = true
            }
          },
          (reason: any) => {
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

export class APromise<T = unknown> {
  private status: StatusType = PENDING
  private value: T | undefined = undefined
  private reason: any = null

  private fulfilledCallbacks: FulfilledCallbackFn<T>[] = []
  private rejectedCallbacks: RejectedCallbackFn[] = []

  constructor(executor: ExecutorFn<T>) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  private resolve = (value: T) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.fulfilledCallbacks.forEach((callback) => callback(value))
    }
  }

  private reject = (reason: any) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.rejectedCallbacks.forEach((callback) => callback(reason))
    }
  }

  public then<TResult1 = T>(onFulfilled?: OnFulFilledFn<T, TResult1>, onRejected?: OnRejectedFn<any>) {
    const defaultOnFulfilled: OnFulFilledFn<T, T> = (value: T) => value
    const coverOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : defaultOnFulfilled
    const defaultOnReject: OnRejectedFn<any> = (reason: any) => {
      throw reason
    }
    const coverOnRejected = typeof onRejected === 'function' ? onRejected : defaultOnReject

    const promise2 = new APromise<T>((resolve, reject) => {
      const microtask = (data: any, handler: (...args: any[]) => any): void => {
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

  public catch = (onReject: RejectFn) => {
    this.then(null, onReject)
  }

  public finally = (onFinally: (...args: any[]) => void) => {
    return this.then(
      (value) => APromise.resolve(onFinally()).then(() => value),
      (reason) =>
        APromise.resolve(onFinally()).then(() => {
          throw reason
        })
    )
  }

  public static all<T>(values: Array<APromise<T>>) {
    return new APromise<T[]>((resolve, reject) => {
      let count = 0
      const dataCollector: T[] = Array(values.length)
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

  public static allSettled<T>(promises: Array<APromise<T>>) {
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
    return new APromise<Array<SettledValue<T>>>((resolve) => {
      let count = 0
      const dataCollector: Array<SettledValue<T>> = []
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

  public static any<T>(promises: Array<APromise<T>>) {
    return new APromise<T>((resolve, reject) => {
      let count = 0
      const errMessage = 'All promises were rejected'
      const errors: Error[] = Array(promises.length)

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

  public static race<T>(values: Array<APromise<T>>) {
    return new APromise<T>((resolve, reject) => {
      for (const promiseVal of values) {
        promiseVal.then(resolve, reject)
      }
    })
  }

  public static resolve<T>(value: T) {
    if (value instanceof APromise) {
      return value
    }
    return new APromise<T>((_resolve) => {
      _resolve(value)
    })
  }

  public static reject(reason: any) {
    if (reason instanceof APromise) {
      return reason
    }
    return new APromise((resolve, _reject) => {
      _reject(reason)
    })
  }

  // this static method is used to promises-aplus-tests test
  public static deferred() {
    let resolve
    let reject
    const promise = new APromise((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })
    return { resolve, reject, promise }
  }
}
