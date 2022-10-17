export const totalFruit = (fruits: number[]): number => {
  if (fruits.length <= 2) {
    return fruits.length
  }

  let firstBasket = -1
  let secondBasket = -1

  let countFirst = 0
  let countSecond = 0
  let max = 0

  for (let i = 0; i < fruits.length; i++) {
    if (firstBasket < 0 || fruits[i] === fruits[firstBasket]) {
      // 能放进第一篮子
      // 记录最后出现的位置，用于后面的舍弃
      firstBasket = i
      countFirst += 1
    } else if (secondBasket < 0 || fruits[i] === fruits[secondBasket]) {
      // 能放进第二个篮子
      secondBasket = i
      countSecond += 1
    } else {
      if (secondBasket < firstBasket) {
        countFirst = firstBasket - secondBasket
        countSecond = 1
        secondBasket = i
      } else {
        countSecond = secondBasket - firstBasket
        countFirst = 1
        firstBasket = i
      }
    }
    // 收集最大的那个
    max = countFirst + countSecond > max ? countFirst + countSecond : max
  }
  return max
}
