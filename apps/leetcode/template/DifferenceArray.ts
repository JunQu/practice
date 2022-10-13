export class DifferenceArray {
  // 差分数组
  diff: number[]

  constructor(nums: number[]) {
    this.diff = Array(nums.length)
    this.diff[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
      this.diff[i] = nums[i] - nums[i - 1]
    }
  }

  get size() {
    return this.diff.length
  }

  // 在区间增加 一个数值 val （val 可以是负数）
  increment(start: number, end: number, val: number) {
    this.diff[start] += val
    if (end < this.diff.length - 1) {
      this.diff[end + 1] -= val
    }
  }

  // 获取原数组，就是把之前的差补上，相对前一个
  result() {
    const arr = Array(this.size)
    arr[0] = this.diff[0]
    for (let i = 1; i < this.size; i++) {
      arr[i] = arr[i - 1] + this.diff[i]
    }
    return arr
  }
}

// n 都是i0
