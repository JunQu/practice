console.log('start 1')

setTimeout(() => {
  console.log('start 2')
  queueMicrotask(() => {
    queueMicrotask(() => console.log('microtask 1'))
  })
  Promise.resolve()
    .then()
    .then()
    .then(() => {
      console.log('microtask 2')
    })
  setTimeout(() => {
    console.log('start 3')
  }, 0)
  console.log('end 2')
}, 0)

queueMicrotask(() => {
  console.log('microtask 3')
  queueMicrotask(() => {
    console.log('microtask 4')
    queueMicrotask(() => {
      console.log('microtask 5')
    })
  })
})
console.log('end 1')
