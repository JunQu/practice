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

const arr = [-5, -1, 0, 2, 3, 5, 7, 9, 10, 1000, 3213213]
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

console.log('quicksortInNewPlace: ', quicksortInNewPlace(shuffledArr))
console.log('Check:', checkArr(quicksortInNewPlace(shuffledArr), arr))

const partition = (arr, left, right) => {
  let povitValue = arr[left]
  let leftIndex = left
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < povitValue) {
      leftIndex += 1
      swap(arr, i, leftIndex)
    }
  }
  return leftIndex
}

const quickSortInPlace = (arr, low = 0, high = arr.length) => {
  if (low >= high) {
    return
  }
  let povit = partition(arr, low, high)
  quickSortInPlace(arr, low, povit - 1)
  quickSortInPlace(arr, povit + 1, high)
}
quickSortInPlace(shuffledArr)
console.log(shuffledArr)
console.log('Check:', checkArr(shuffledArr, arr))
