// dp 做法
export const jumpDP = (nums: number[]): number => {
  // 定义到达当前位置最少的步数
  // 起点为 0
  const dp = [0, 1]
  for (let i = 2; i < nums.length; i++) {
    // 寻找前面的能到达的，且步数最少的
    let min = Infinity
    for (let j = 0; j < i; j++) {
      if (j + nums[j] >= i && dp[j] < min) {
        min = dp[j]
      }
    }
    // 再走一步就到当前
    dp[i] = min + 1
  }

  return dp[nums.length - 1]
}
// 第二层 dp
export const jumpDP2 = (nums: number[]): number => {
  // 定义到达当前位置最少的步数
  // 起点为 0
  const dp = [0]
  for (let i = 1; i < nums.length; i++) {
    // 能到这里且 j 最小的情况
    for (let j = i - 1; j >= 0; j--) {
      if (j + nums[j] >= i) {
        dp[i] = dp[j] + 1
      }
    }
  }

  return dp[nums.length - 1]
}

// 贪心做法
export const jump = (nums: number[]): number => {
  // 当前能到达的最大值
  let current = 0
  // 下一步能到的最大范围
  let max = 0
  let count = 0
  // 计算每一步的最大值
  // 然后寻找在下一步里面的最大值
  for (let i = 0; i < nums.length - 1; i++) {
    max = Math.max(max, nums[i] + i)
    // 达到当前最大距离，下一个范围需要步数加一了
    if (i === current) {
      current = max
      count += 1
    }
    if (current >= nums.length - 1) {
      break
    }
  }

  return count
}
