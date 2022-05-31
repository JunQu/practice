/* eslint-disable */
declare module 'promises-aplus-tests' {
  /**
   * this is learned from the promises-tests repo on github
   * repo link: https://github.com/promises-aplus/promises-tests
   * repo description: Promises/A+ Tests
   * repo license: MIT https://github.com/promises-aplus/promises-tests/blob/master/LICENSE.txt
   */

  export interface Adapter {
    /**
     * creates a promise that is resolved with value
     */
    resolved?: (value: any) => void
    /**
     *  creates an object consisting of { promise, resolve, reject }
     */
    rejected?: (reason: any) => void
    /**
     *  creates an object consisting of { promise, resolve, reject }
     *  - promise is a promise that is currently in the pending state.
     *  - resolve(value) resolves the promise with value.
     *  - reject(reason) moves the promise from the pending state to the rejected state, with rejection reason.
     */
    deferred: () => { promise: { then: Function }; resolve?: (value: any) => void; reject?: (reason: any) => void }
  }

  interface MochaOptions {
    /**
     * I don't know how many Mocha options it has
     */
    timeout?: number
    ui?: string
    reporter?: string
  }

  interface PromiseTestsError extends Error {
    /**
     * I don't know error data type
     * form： https://github.com/promises-aplus/promises-tests/blob/4786505fcb0cafabc5f5ce087e1df86358de2da6/lib/programmaticRunner.js#L58-L59
     */
    failures: number
  }

  interface ErrorCallback {
    /**
     * I don't know error data type
     * form： https://github.com/promises-aplus/promises-tests/blob/4786505fcb0cafabc5f5ce087e1df86358de2da6/lib/programmaticRunner.js#L58-L59
     */
    (err: PromiseTestsError | NodeJS.ErrnoException | null | undefined): void
  }

  /**
   *  function export type from: https://github.com/promises-aplus/promises-tests/blob/4786505fcb0cafabc5f5ce087e1df86358de2da6/lib/programmaticRunner.js#L28
   */
  export default function PromisesAplusTests(adapter: Adapter, errorCallback?: ErrorCallback): void

  export default function PromisesAplusTests(
    adapter: Adapter,
    mochaOpts?: MochaOptions,
    errorCallback?: ErrorCallback
  ): void

  /**
   * Use with Mocha, but not recommended, outed mocha version
   * to use this, you should install mocha
   * and import like: import * as  PromisesAplusTests from 'promises-aplus-tests'
   * from: https://github.com/promises-aplus/promises-tests#within-an-existing-mocha-test-suite
   */
  export function mocha(adapter: Adapter): void
}
