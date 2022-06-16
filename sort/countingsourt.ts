/**
 * 计数排序就是缓存，得到一个最大值，然后创建这么多空间的数组，再然后进行计数
 * 和哈希表倒是很类似，通过一个数组缓存，想想如果过于数字过于稀疏或者最大值太大，那么感觉不如用哈希表进行缓存
 * 时间上其实只有 len + max，即数组长度和最大值的和，但是空间利用率不太行
 */
export const countingsourt = (arr: number[], max: number) => {
  const bucket = Array<number>(max + 1)
  let sortedIndex = arr.length - 1
  let bucketIndex = max

  // 计数，缓存起来
  for (const num of arr) {
    bucket[num] = bucket[num] > 0 ? bucket[num] + 1 : 1
  }

  while (bucketIndex) {
    while (bucket[bucketIndex]) {
      arr[sortedIndex] = bucketIndex
      bucket[bucketIndex] -= 1
      sortedIndex -= 1
    }
    bucketIndex -= 1
  }
  return arr
}
