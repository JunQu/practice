import { expect, test } from 'vitest'
import PromisesAplusTests from 'promises-aplus-tests'
import { APromise } from './APromise'

test('Math.sqrt()', () => {
  expect(Math.sqrt(4)).toBe(2)
  expect(Math.sqrt(144)).toBe(12)
  expect(Math.sqrt(2)).toBe(Math.SQRT2)
})

test('Promise/A+ Test', () => {
  const adapter = {
    resolved: (value) => new APromise((resolve) => resolve(value)),
    rejected: (reason) => new APromise((resolve, reject) => reject(reason)),
    deferred: () => {
      let resolve
      let reject
      const promise = new APromise((resolve_, reject_) => {
        resolve = resolve_
        reject = reject_
      })
      return {
        promise,
        resolve,
        reject,
      }
    },
  }
  PromisesAplusTests(adapter, (err) => {
    console.error(err)
  })
})
