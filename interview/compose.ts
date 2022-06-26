// const arr = [
//   (next: Function) => {
//     console.log(1)
//     next()
//     console.log(1.1)
//   },
//   (next: Function) => {
//     console.log(2)
//     next()
//     console.log(2.1)
//   },
//   (next: Function) => {
//     console.log(3)
//     next()
//     console.log(3.1)
//   },
// ]
//
// export const compose = (arr: ((next: Function) => void)[]) => {
//   const fns = [...arr]
//   const recursion = () => {
//     while (fns.length) {
//       const fn = fns.shift()!
//       fn(recursion)
//     }
//   }
//   return recursion
// }
//
// const t1 = performance.now()
// const fn = compose(arr)
// fn()
// const t2 = performance.now()
// console.log(t2 - t1)
