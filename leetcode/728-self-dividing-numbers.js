
const selfDividingNumbers = function(left, right) {
  let result = [];
  for (let i = left; i <= right; i++) {
    let num = i
    let isDividingNumber = true
    while (num && isDividingNumber) {
      const lastDigit = num % 10
      num = (num - lastDigit) / 10
      isDividingNumber =  i % lastDigit === 0
    }
    if (isDividingNumber) {
      result.push(i)
    }
  }
  return result;
}

const resultArr = [1,2,3,4,5,6,7,8,9,11,12,15,22]
console.log(selfDividingNumbers(1,22).every((num,i)=>num===resultArr[i]));
