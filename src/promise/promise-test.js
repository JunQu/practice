// simple tests
const APromise = require('./APromise')

const promise1 = new APromise((resolve, reject)=>{
  resolve('promise1: test fine')
}).then(val=>{
  console.log('promise1: ',val)
})


const promise2 = new APromise((resolve, reject)=>{
  setTimeout( ()=>{
    reject('test reject')
  },1000)
})
promise2.then(val=>{
    console.log('promise2: ', val)
  },
  reason=>{
    console.log('promise2: ',reason)
  })

const promise3 = new APromise((resolve)=>{
  setTimeout( ()=>{
    resolve('promise3: test call me')
  },2000)
})

promise3.then(val=>{
  console.log('promise3: ',val+' 1')
})

promise3.then(val=>{
  console.log('promise3: ',val+' 2')
})

promise3.then(val=>{
  console.log('promise3: ',val+' 3')
})


// error hand test
const errPromise = new APromise((resolve)=>{
  const aaa = 'aaa'
  if (aaa) {
    throw new Error('Error message')
  }
  setTimeout(()=>{
    resolve('resolve, error')
  }, 3000)
})
errPromise.then(val=>{
  console.log(val)
},reason=>{
  console.log('errPromise: '+reason)
})
