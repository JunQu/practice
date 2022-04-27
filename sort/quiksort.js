const checkArr = (arr, sortedArr) => arr.every((el, index) => el === sortedArr[index])

const swap = (arr, left, right) => ([arr[left], arr[right]] = [arr[right], arr[left]])

const shuffle = ([...arr]) => {
  let currentIndex = arr.length
  while (currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    swap(arr, randomIndex, currentIndex)
  }
  return arr
}

const arr = [-5, -1, -1, -1, 0, 2, 3, 5, 7, 7, 7, 7, 9, 9, 9, 10, 1000, 3213213]
const shuffledArr = shuffle(arr)
console.log('shuffledArr:', shuffledArr)

const quicksortInNewPlace = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  let lessArr = []
  let greaterArr = []
  let midArr = []
  const position = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < position) {
      lessArr.push(arr[i])
    } else if (arr[i] > position) {
      greaterArr.push(arr[i])
    } else {
      midArr.push(arr[i])
    }
  }
  return quicksortInNewPlace(lessArr).concat(midArr, quicksortInNewPlace(greaterArr))
}

// console.log('quicksortInNewPlace: ', quicksortInNewPlace(shuffledArr))
// console.log('Check:', checkArr(quicksortInNewPlace(shuffledArr), arr))

const partitionHoare = (arr, low, high) => {
  // 取中间值可以尽量避免最差情况
  const pivot = arr[Math.floor((low + high) / 2)]
  while (true) {
    // 这里的low和high是指的是数组的索引，而不是数组的元素
    // 这里伪代码使用的
    while (arr[low] < pivot) {
      low++
    }
    while (arr[high] > pivot) {
      high--
    }
    if (low >= high) {
      return high
    }
    swap(arr, low, high)
    // 这里他们使用 Do...While 但是我使用 While
    low++
    high--
  }
}
const quickSortHoare = (arr, low = 0, high = arr.length - 1) => {
  if (low >= high) {
    return
  }
  const pivotIndex = partitionHoare(arr, low, high)
  quickSortHoare(arr, low, pivotIndex)
  quickSortHoare(arr, pivotIndex + 1, high)
}
quickSortHoare(shuffledArr)
console.log(shuffledArr)
console.log('Check:', checkArr(shuffledArr, arr))

const partitionLomuto = (arr, low, high) => {
  const pivot = arr[high]
  let pivotIndex = low
  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, pivotIndex)
      pivotIndex++
    }
  }
  swap(arr, pivotIndex, high)
  return pivotIndex
}

const quickSortLomuto = (arr, low = 0, high = arr.length - 1) => {
  if (low >= high) {
    return
  }
  const pivotIndex = partitionLomuto(arr, low, high)
  quickSortLomuto(arr, low, pivotIndex - 1)
  quickSortLomuto(arr, pivotIndex + 1, high)
}

const shuffledArr3 = shuffle(arr)
console.log('shuffledArr3:', shuffledArr3)
quickSortLomuto(shuffledArr3)
console.log('quickSortLomuto:', checkArr(shuffledArr3, arr))

const quickSortES = ([pivot, ...nums], desc) =>
  typeof pivot !== 'number' || pivot !== pivot
    ? []
    : [
        ...quickSortES(
          nums.filter((num) => (desc ? num > pivot : num <= pivot)),
          desc
        ),
        pivot,
        ...quickSortES(
          nums.filter((num) => (!desc ? num > pivot : num <= pivot)),
          desc
        ),
      ]

// const shuffledArr2 = shuffle(arr)
// console.log('quickSortES Check:', checkArr(quickSortES(shuffledArr2, true).reverse(), arr))

const partitionIterative = (arr, start, end) => {
  const pivotValue = arr[end]
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      ;[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
      pivotIndex++
    }
  }

  ;[arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
  return pivotIndex
}
const quickSortIterative = (arr) => {
  const stack = []

  stack.push(0)
  stack.push(arr.length - 1)

  while (stack[stack.length - 1] >= 0) {
    const end = stack.pop()
    const start = stack.pop()

    const pivotIndex = partitionIterative(arr, start, end)

    if (pivotIndex - 1 > start) {
      stack.push(start)
      stack.push(pivotIndex - 1)
    }
    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1)
      stack.push(end)
    }
  }
}

const shuffledArr4 = shuffle(arr)
console.log('shuffledArr4:', shuffledArr4)
quickSortIterative(shuffledArr4)
console.log('quickSortIterative:', checkArr(shuffledArr4, arr))
