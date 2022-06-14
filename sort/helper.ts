export const swap = (arr: number[], left: number, right: number): void => {
  ;[arr[left], arr[right]] = [arr[right], arr[left]]
}

export const shuffle = ([...arr]: number[]): number[] => {
  let currentIndex: number = arr.length
  while (currentIndex) {
    const randomIndex: number = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    swap(arr, randomIndex, currentIndex)
  }
  return arr
}
