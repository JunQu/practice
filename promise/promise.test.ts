import PromisesAplusTests from 'promises-aplus-tests'
import type { Adapter } from 'promises-aplus-tests'
import { APromise } from './APromise'
import { expect, describe, it } from 'vitest'

describe('APromise Tests', () => {
  const resolvePromise = (val: number, delay = 1000) => {
    return new APromise<number>((resolve) => {
      setTimeout(() => resolve(val), delay)
    })
  }

  const rejectPromise = (val?: string, delay = 1000) => {
    return new APromise<number>((resolve, reject) => {
      setTimeout(() => reject(new Error(val ?? 'reject')), delay)
    })
  }

  it('promise a+ test', async () => {
    const adapter: Adapter = {
      resolved: function (val: unknown) {
        return new APromise((_resolve) => {
          _resolve(val)
        })
      },
      rejected: function (val: unknown) {
        return new APromise((_resolve, _reject) => {
          _reject(val)
        })
      },
      deferred() {
        let resolve
        let reject
        const promise = new APromise((_resolve, _reject) => {
          resolve = _resolve
          reject = _reject
        })
        return { resolve, reject, promise }
      },
    }
    const testPromise = (adapter: Adapter) => {
      return new APromise<string>((resolve, reject) => {
        PromisesAplusTests(adapter, (err) => {
          if (err !== undefined && err !== null) {
            // @ts-ignore
            console.log('err', err.failures)
            reject(err)
          } else {
            resolve('passed')
          }
        })
      })
    }
    await expect(testPromise(adapter)).resolves.toBe('passed')
  })

  it('APromise and standard promise convert', async () => {
    const standardPromise = new Promise((resolve) => {
      resolve('standardPromise passed')
    }).then((val) => {
      return new APromise((_resolve) => {
        _resolve(val)
      })
    })

    const myAPromise = new APromise((resolve) => {
      resolve('APromise passed')
    }).then((val) => {
      return new Promise((_resolve) => {
        _resolve(val)
      })
    })

    await expect(standardPromise).resolves.toBe('standardPromise passed')
    await expect(myAPromise).resolves.toBe('APromise passed')
  })

  // test method that not specified in the A-plus-promise specification
  it('APromise catch', async () => {
    const catchPromise = new APromise((resolve, reject) => {
      reject('catch passed')
    }).catch((reason) => reason)

    await expect(catchPromise).resolves.toBe('catch passed')
  })

  it('APromise finally', () => {
    const randomPromise = new APromise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve('resolved')
      } else {
        reject('rejected')
      }
    })
    randomPromise
      .then((val) => {
        console.log(val)
        return val
      })
      .catch((reason) => {
        console.log(reason)
        return reason
      })
      .finally(() => {
        console.log('finally')
      })
  })

  it('APromise resolve', async () => {
    const resolvePromise = new APromise<{ message: string }>((resolve) => {
      resolve({ message: 'resolve promise passed' })
    })
    const errorPromise = new APromise<{ message: string }>((_resolve) => {
      throw new Error('error promise passed')
      // eslint-disable-next-line no-unreachable
      _resolve({ message: 'error promise passed' })
    })
    const resolvedPromise = APromise.resolve(resolvePromise)
    const myPromise = APromise.resolve({ message: 'static resolve passed' })

    await expect(resolvedPromise instanceof APromise).toBe(true)
    await expect(resolvedPromise).resolves.toEqual({ message: 'resolve promise passed' })
    await expect(myPromise instanceof APromise).toBe(true)
    await expect(myPromise).resolves.toEqual({ message: 'static resolve passed' })
    await expect(errorPromise instanceof APromise).toBe(true)
    await expect(errorPromise).rejects.toEqual(new Error('error promise passed'))
  })

  it('APromise reject', async () => {
    const rejectPromise = new APromise<{ message: string }>((_resolve, reject) => {
      reject(new Error('reject promise passed'))
    })
    const resolvedPromise = APromise.reject(rejectPromise)
    const myPromise = APromise.reject({ message: 'static reject passed' })
    await expect(resolvedPromise).rejects.toEqual(new Error('reject promise passed'))
    await expect(myPromise).rejects.toEqual({ message: 'static reject passed' })
  })

  it('APromise all', async () => {
    const promises = [resolvePromise(1, 4000), resolvePromise(2, 2000), resolvePromise(3, 1000)]
    await expect(APromise.all(promises)).resolves.toEqual([1, 2, 3])
    await expect(APromise.all([...promises, rejectPromise('reject', 1000)])).rejects.toEqual(new Error('reject'))
  })

  it('APromise allSettled', async () => {
    const promises = [
      resolvePromise(1, 4000),
      resolvePromise(2, 2000),
      resolvePromise(3, 1000),
      rejectPromise('reject', 500),
    ]
    const expectValue = [
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 },
      { status: 'rejected', reason: new Error('reject') },
    ]
    await expect(APromise.allSettled(promises)).resolves.toEqual(expectValue)
  })

  it('APromise any', async () => {
    const promises = [resolvePromise(1, 4000), resolvePromise(2, 1000), rejectPromise('reject', 3000)]
    await expect(APromise.any(promises)).resolves.toBe(2)
    // eslint-disable-next-line no-undef
    await expect(APromise.any([rejectPromise('reject', 500)])).rejects.toBeInstanceOf(AggregateError)
  })

  it('APromise race', async () => {
    const promises = [resolvePromise(1, 4000), resolvePromise(2, 1000), rejectPromise('reject', 2000)]
    const promise2 = [resolvePromise(1, 4000), rejectPromise()]
    await expect(APromise.race(promises)).resolves.toBe(2)
    await expect(APromise.race(promise2)).rejects.toEqual(new Error('reject'))
  })
})
