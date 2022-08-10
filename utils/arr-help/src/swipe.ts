
export const swap = (arr=[], x:number, y:number) => {
  if (arr.length === 0 || x < 0 || y < 0 || x >= arr.length || y >= arr.length) {
    return
  }
  let tmp = arr[x]
  arr[x] = arr[y]
  arr[y] = tmp
}
