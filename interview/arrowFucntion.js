/*  eslint-disable */
var a = 1

const fn1 = () => {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  this.a = 2
}

console.log(a)
