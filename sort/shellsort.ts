/**
 * shell sort 是插入排序的优化版本，采用大因子减少重复的比较
 * 主要在于 gap 的选择决定了它的复杂度，期望是O(nlogn),最坏情况可能是O(n*n)
 * 也属于不稳定排序，相比插入排序和选择排序更好，但综合不如堆排序优秀
 * 对我而言属于比较难理解的（相对快排、堆排、归并），它和数学上的关系很大，我不能一眼看出它的有效和合理
 */
export const shellsort = (arr: number[]): void => {
  let gap = Math.floor(arr.length / 2)
  /**
   * gap 表示分组的间隔，把整个数组分成几个大块
   * gap 因子很影响排序，所以一般采用[1,3,7...2^n -1]，或者 [701, 301, 132, 57, 23, 10, 4, 1] Ciura gap
   * 这里采用的通用方法，最坏情况是 O(n*n)
   * */
  while (gap > 0) {
    let i = gap
    /**
     * 得到 gap 后，整个数组是几个大块（按照索引区分）
     * 这个循环是把每个大块里面的元素分别使用插入排序
     */
    while (i < arr.length) {
      let tmp = arr[i]
      let j = i - gap
      /**
       * 这里就是类似插入排序不断向前找位置
       * 只是它是一个大块里面找，相对减少了很多重复的比较
       */
      while (j >= 0 && arr[j] > tmp) {
        arr[j + gap] = arr[j]
        j -= gap
      }
      /**
       * 在合适的位置，就确定位置
       * 再确定对大块中的下一个元素
       */
      arr[j + gap] = tmp
      i += 1
    }
    gap = Math.floor(gap / 2)
  }
}
