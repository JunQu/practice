const quicksort = (arr) => {
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
  return quicksort(lessArr).concat(midArr).concat(quicksort(greaterArr))
}

const swap = (arr, left, right) => {
  const tmp = arr[left]
  arr[left] = arr[right]
  arr[right] = tmp
}

const partition = (arr, left, right) => {
  let povitValue = arr[left]
  let leftIndex = left
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < povitValue) {
      leftIndex += 1
      swap(arr, i, leftIndex)
    }
  }
}

console.log(quicksort([1, 5, 2, 4, 4, 5, 6, 9, 8, 7, 10]))
