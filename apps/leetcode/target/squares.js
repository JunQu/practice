const squares = (list = []) => {
  let count = 0
  const hash = new Map()

  for (const item of list) {
    hash.set(item.join(' '), 1)
  }

  for (let i = 0; i < list.length; i++) {
    const x1 = list[i][0]
    const y1 = list[i][1]

    for (let j = i + 1; j < list.length; j++) {
      const x2 = list[j][0]
      const y2 = list[j][1]

      let sumX = x1 - x2
      let sumY = y1 - y2

      const x3_1 = x1 - sumY
      const y3_1 = y1 + sumX

      const x4_1 = x2 - sumY
      const y4_1 = y2 + sumX

      const x3_2 = x1 + sumY
      const y3_2 = y1 - sumX
      const x4_2 = x2 + sumY
      const y4_2 = y2 - sumX

      if (hash.has(x3_1 + ' ' + y3_1) && hash.has(x4_1 + ' ' + y4_1)) {
        count += 1
      }
      if (hash.has(x3_2 + ' ' + y3_2) && hash.has(x4_2 + ' ' + y4_2)) {
        count += 1
      }
    }
  }
  return count / 4
}
const list1 = [
  [0, 0],
  [1, 2],
  [3, 1],
  [2, -1],
]
const list2 = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
]
// console.log(squares(list1))
// console.log(squares(list2))

const baskect = (list = []) => {
  const len = 10
  const collection = []
  let min = Infinity
  const sumArr = (arr = []) => {
    let sum = 0
    for (const num of arr) {
      sum += num
    }
    return sum
  }
  const MaxSum = sumArr(list)

  // eslint-disable-next-line max-params
  const back = (list = [], path = [], start = 0) => {
    if (path.length === 5) {
      const sum = sumArr(path)
      if (Math.abs(sum * 2 - MaxSum) < min) {
        min = Math.abs(MaxSum - sum * 2)
      }
      return
    }
    if (path.length > 5) {
      return
    }
    for (let i = start; i < len; i++) {
      path.push(list[i])
      back(list, path, i + 1)
      path.pop()
    }
  }
  back(list)
  console.log(min)
  console.log('collection: ', collection.length)
  console.log(collection.filter((c) => c[0] === 2).length)
}
// baskect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

const yue = (n) => {
  let count = 0
  let index = 0
  let arr = Array(n).fill(1)
  while (count < n - 1) {
    for (let i = 0; i < n; i++) {
      if (arr[i]) {
        index += 1
        if (index === 3) {
          count += 1
          index = 0
          arr[i] = 0
        }
      }
    }
  }

  return arr.findIndex((value) => value === 1) + 1
}

// console.log(yue(10))

const blackboard = (nums = []) => {
  let list = [...nums]
  list.sort((a, b) => a - b)
  let count = 0
  while (list.length) {
    count += 1
    const digit = list[0]
    list = list.filter((n) => n % digit !== 0)
  }
  return count
}

// console.log(blackboard([2, 3, 4, 9]))
// console.log(blackboard([2, 4, 6]))

const str2tree = (str) => {
  // write your code here
  const stack = []
  let root = null
  let isLeft = true
  let nodeTmp
  for (const ch of str) {
    if (ch === '{') {
      stack.push(nodeTmp)
      isLeft = true
    } else if (ch === '}') {
      stack.pop()
    } else if (ch === ',') {
      isLeft = false
    } else {
      nodeTmp = {
        val: ch,
        left: null,
        right: null,
      }
      if (!root) {
        root = nodeTmp
      } else {
        if (isLeft) {
          stack[stack.length - 1].left = nodeTmp
        } else {
          stack[stack.length - 1].right = nodeTmp
        }
      }
    }
  }
  return root
}
const tree = str2tree('a{b{d,e{g,h{,I}}},c{f}}')
console.log(JSON.stringify(tree))
