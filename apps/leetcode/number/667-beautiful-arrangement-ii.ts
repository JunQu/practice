export const constructArray = (n: number, k: number): number[] => {
  const ans: number[] = []
  // 考虑 k = n-1 那么排列是[1,n,2,n-1,3,n-2,4,n-3,.... n/2] 这样的形式
  // 即 n 个数 最多构建 n - 1 个不同整数
  // k < n - 1 那么只需要在前面的n-k个数字升序列，即为 1 一个整数，后面在进行 n,n-1的下降序列
  let min = 1
  let max = n

  // 保留后面的k个数字用于构建其他整数
  // 前面只需要构建 1
  while (min < n - k) {
    ans.push(min)
    min += 1
  }

  // 后面的k个整数，就可以构造 k - 1 个不同整数
  while (min < max) {
    ans.push(min)
    ans.push(max)
    min += 1
    max -= 1
  }
  // 最后如果相遇，那么肯定少了相遇的数
  if (min === max) {
    ans.push(min)
  }
  return ans
}
