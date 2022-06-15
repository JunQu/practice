// V8 在元素较少时采用插入排序，它是一种稳定的排序
export const insertsort = (arr: number[]): void => {
  const len = arr.length
  let j
  let tmp
  // 从 1 开始，认为第一项（或者说只有一个元素的数组）是已经排序好的
  for (let i = 1; i < len; i++) {
    j = i
    tmp = arr[i]
    // 不断往前寻找位置，把前面的元素往后移动
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1]
      j -= 1
    }
    // 在前方没有比他更小的插入
    arr[j] = tmp
  }
}
