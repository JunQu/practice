export const swipe = (arr: (number | string)[], start: number, end: number) => {
  const tmp = arr[start]
  arr[start] = arr[end]
  arr[end] = tmp
  // [arr[start], arr[end]] = [arr[end], arr[start]]
}
