export const mergesort = (arr: number[]): number[] => {
  const len = arr.length
  if (len < 2) {
    return arr
  }
  const mid = Math.floor(len / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid, len)

  return merge(mergesort(left), mergesort(right))
}

const merge = (left: number[], right: number[]): number[] => {
  const result = []
  let iLeft = 0
  let iRight = 0
  while (iLeft < left.length && iRight < right.length) {
    if (left[iLeft] <= right[iRight]) {
      result.push(left[iLeft])
      iLeft += 1
    } else {
      result.push(right[iRight])
      iRight += 1
    }
  }
  while (iLeft < left.length) {
    result.push(left[iLeft])
    iLeft += 1
  }
  while (iRight < right.length) {
    result.push(right[iRight])
    iRight += 1
  }
  return result
}

/**
 * 这是自底向上的做法，把每一个元素看作一个独立的子数组，那么就是一个不断合并的过程
 * 这种方式主要是利用了一个数组进行缓存变换，使得原数组本身发生变化，
 * 代码来自：https://en.wikipedia.org/wiki/Merge_sort#Bottom-up_implementation
 * */
export const mergeSortBottomUp = (arr: number[]): void => {
  const len = arr.length
  /***
   * 最初把每一个元素看作一个单独地集合，这个过程是把每个子集合从底部向上合并
   * 每次合并后，通常子集合每次长度都会增加一倍，因为是每两个集合合并成一个
   */
  for (let width = 1; width < len; width *= 2) {
    // 缓存每次合并后结果的数组，它是原数组每次调整后的结果
    const workArr = Array<number>(len)
    for (let i = 0; i < len; i = i + 2 * width) {
      /**
       * 通过不同的索引分割再合并，width 控制每个子集合的大小，此时说的都是数组索引，类似1与2合并，3与4 ，，第二轮是 合并后的 1 与 合并后的3 （此时1、2已经合并，3、4已经合并），依次全部合并
       * 这里是两个子集合合并,合并后的结果将被 workArr 缓存起来
       * i 代表左子集合开始的索引，i + width 是右边子集合的索引，i + 2 * width 是合并后集合的最大索引
       * */
      BottomUpMerge(arr, workArr, i, Math.min(i + width, len), Math.min(i + 2 * width, len))
    }
    /**
     * 这是把每次合并后缓存起来的数组 workArr 重新赋值原数组 arr，此时原数组内的元素才被调整
     * 这里 workArr 含有 arr 的所有元素，只是它是子集合合并结果的缓存
     */
    for (let i = 0; i < len; i++) {
      arr[i] = workArr[i]
    }
  }
}

const BottomUpMerge = (originArr: number[], workArr: number[], iLeft: number, iRight: number, iEnd: number) => {
  let i = iLeft
  let j = iRight
  /**
   *  这里就是对两个子集合合并，哪个小就先放在 workArr 前面
   *  主要是 workArr 再合并后依旧保留，直到所有的子集合合并完成
   */
  for (let k = iLeft; k < iEnd; k++) {
    if (i < iRight && (j >= iEnd || originArr[i] <= originArr[j])) {
      workArr[k] = originArr[i]
      i += 1
    } else {
      workArr[k] = originArr[j]
      j += 1
    }
  }
}
