class PrefixSum {
  sumArr: number[]
  size: number
  constructor(nums: number[]) {
    this.sumArr = Array(nums.length)
    this.size = nums.length
    this.sumArr[0] = nums[0]

    for (let i = 1; i < this.size; i++) {
      this.sumArr[i] = this.sumArr[i - 1] + nums[i]
    }
  }
  // 查询闭区间的和 [start, end] （包含start， end为索引的值）
  query(start: number, end: number) {
    return start === 0 ? this.sumArr[end] : this.sumArr[end] - this.sumArr[start - 1]
  }
}
