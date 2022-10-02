/**
 *  第一个题目： 工厂流水线调度
 *  题目的意思应该是维护一个堆，然后把任务加入，堆里面的操作
 *  明显是维护一个最小堆，然后任务时间加上堆顶，做下沉操作
 *  因为是第一个题目，所以没想这么做，直接直觉快速解决所以写出这个模拟代码
 *  后面发现，因为任务是确定的，那么经过一次排序后，必然是前面的任务先结束，所以一次排序
 *  再进行逐个添加也可以，这样应该效率会好不少
 *  我的通过率是95，应该是差一个测试用例，大概率是性能问题的测试用例
 *  也是唯一一个没有全部通过的题目
 */
const factory = (arr: number[], count = 0) => {
  const time = Array<number>(count).fill(0)

  arr.sort((a, b) => b - a)

  while (arr.length) {
    let task = arr.pop()!
    let min = 0
    // 寻找里面最先完成的流水线
    for (let i = 0; i < count; i++) {
      if (time[i] < time[min]) {
        min = i
      }
    }
    // 安排任务
    time[min] += task
  }

  return Math.max(...time)
}
console.log('--------第一题-------------')
console.log(factory([8,4,3,2,10], 3), 13)
console.log()

/**
 * 第二个：数组里找任意两个数之和的绝对值最小值，输出两个数和它们和的绝对值
 * 没啥好说的，直接暴力求值，然后取最小，我这里直接这么转化在大规模情况可能有性能问题，不过这里并不在意，因为题目确实很简单
 * 好像可以优化到一次遍历，但是这样在生活中可以多思考一层
 */
const getMinVal = (arr:number[]) => {
  let min = Number.MAX_SAFE_INTEGER
  let result = ''
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const sum = Math.abs(arr[i] + arr[j])
      if (sum < min) {
        min = sum
        result = arr[i] <= arr[j] ? arr[i] + ' ' + arr[j] + ' ' + sum : arr[j] + ' ' + arr[i] + ' ' + sum
      }
    }
  }
  return result
}
console.log('--------第二题-------------')
console.log(getMinVal([-3,-1,5,7,11,15]), '  -3 5 2')
console.log()


/**
 * 第三题：德州扑克，就是给五张牌判定类型
 * 这其实是一个一百分的题目，看到它的时候，我感觉我已经过了，慢慢的做就行
 * 因为确定有且仅有五张牌，所以其实完全可以枚举（打表），牌也就 13 张，花色四种
 * 我用的办法有点笨拙，因为我就想着最稳妥的最能让我自己理解的方式去解决它，慢慢做。
 * 三道题花了一个小时，给它的评价是有手就行，运气比较好的情况，或者运气算得上非常好了，后面两道题简直是不需要思考，第一题需要思考
 * 可我以为提交这个还能再修改第一题，没想到我提交后就不能进入答题页面了，于是我被迫交卷等着消息
 */

type Cards = string[][]

const cache = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const countSame = (arr: Cards) => {
  let count = 1
  let max = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] === arr[i - 1][0]) {
      count += 1
      max = count > max ? count : max
    } else {
      count = 1
    }
  }
  return max
}

// 葫芦
const isHulu = (arr: Cards) => {
  let tmp = arr[0][0]
  if (tmp === arr[1][0] && tmp === arr[2][0] && tmp !== arr[3][0] && arr[3][0] === arr[4][0]) {
    return true
  }
  tmp = arr[4][0]
  if (arr[0][0] === arr[1][0] && tmp !== arr[1][0] && tmp === arr[2][0] && tmp === arr[3][0]) {
    return true
  }
  return false
}

// 同花
const isSameFlower = (arr: Cards) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][1] !== arr[i - 1][1]) {
      return false
    }
  }

  return true
}

// 顺子
const isShun = (arr: Cards) => {
  if (arr[0][0] === 'A' && arr[1][0] === '10' && arr[2][0] === 'J' && arr[3][0] === 'Q' && arr[4][0] === 'K') {
    return true
  }
  let prev = cache.indexOf(arr[0][0])

  for (let i = 1; i < arr.length; i++) {
    const index = cache.indexOf(arr[i][0])
    if (index - 1 !== prev) {
      return false
    }
    prev = index
  }
  return true
}
// 函数结果是 acm 模式，所以是打印
const getKineOfCard = (cards: Cards) => {
  // 整理手牌，排序
  cards.sort((a, b) => cache.indexOf(a[0]) - cache.indexOf(b[0]))

  // 四条
  if (countSame(cards) === 4) {
    console.log(2)
    return
  }
  // 三条
  if (countSame(cards) === 3) {
    if (isHulu(cards)) {
      console.log(3)
    } else {
      console.log(6)
    }
    return
  }
  // 同花
  if (isSameFlower(cards)) {
    if (isShun(cards)) {
      console.log(1)
    } else {
      console.log(4)
    }
    return
  }
  // 顺子
  if (isShun(cards)) {
    console.log(5)
    return
  }
  console.log(7)
}

// 当时自己写的测试
const arr0 = [
  ['4', 'H'],
  ['7', 'H'],
  ['3', 'H'],
  ['A', 'H'],
  ['J', 'H'],
]
// 顺子
const arr1 = [
  ['4', 'H'],
  ['5', 'S'],
  ['6', 'C'],
  ['7', 'D'],
  ['8', 'D'],
]
// 同花顺
const arr2 = [
  ['7', 'H'],
  ['8', 'H'],
  ['5', 'H'],
  ['6', 'H'],
  ['4', 'H'],
]
// 四个
const arr3 = [
  ['A', 'S'],
  ['A', 'H'],
  ['A', 'C'],
  ['A', 'D'],
  ['4', 'S'],
]
// 葫芦
const arr4 = [
  ['K', 'H'],
  ['Q', 'H'],
  ['K', 'C'],
  ['Q', 'C'],
  ['K', 'D'],
]
// 三条
const arr5 = [
  ['K', 'H'],
  ['J', 'H'],
  ['K', 'C'],
  ['Q', 'C'],
  ['K', 'D'],
]

const special1 = [
  ['10', 'H'],
  ['J', 'H'],
  ['Q', 'H'],
  ['K', 'H'],
  ['A', 'H'],
]

const special2 = [
  ['J', 'H'],
  ['10', 'S'],
  ['Q', 'C'],
  ['K', 'D'],
  ['A', 'H'],
]

console.log('--------第三题-------------')
console.log(getKineOfCard(arr0), 4)
console.log(getKineOfCard(arr1), 5)
console.log(getKineOfCard(arr2), 1)
console.log(getKineOfCard(arr4), 3)
console.log(getKineOfCard(arr3), 2)
console.log(getKineOfCard(arr5), 6)
console.log(getKineOfCard(special1), 1)
console.log(getKineOfCard(special2), 5)
