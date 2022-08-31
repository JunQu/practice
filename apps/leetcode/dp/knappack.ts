// 0-1 背包
export const knapPack = (weights: number[], values: number[], volume: number): number => {
  // dp[i][J] 第 i 项 能获得的最大价值,i代表有多少种类物品,  J 代表不同的背包容量 定义
  // dp[i] = max(dp[i-1][j], dp[i-1][j - w] + val[i])  公式
  let dp = []
  // 初始化,容量为0时，没有能装入背包的物品，此时价值全部为 0
  for (const item of weights) {
    // 此时背包容量 J 是 0，能获得的价值自然是 0
    dp.push([0])
  }
  for (let j = 1; j <= volume; j++) {
    // 此时 i 为0，即只有一种物品,最多只能获取这一种物品的价值，j代表不同容量
    dp[0][j] = weights[0] <= j ? values[0] : 0
  }
  // 遍历,嵌套关系不重要，容量的顺序也不重要
  for (let i = 1; i < weights.length; i++) {
    for (let j = 1; j <= volume; j++) {
      if (j < weights[i]) {
        // 装不下当前的，就是之前的值
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i]] + values[i])
      }
    }
  }
  return dp[weights.length - 1][volume]
}

// 恰好装满背包
export const fullPack = (weights: number[], values: number[], volume: number): number => {
  const dp = []
  for (let i = 0; i < weights.length; i++) {
    // 这里初始化为0的含义：当前的物品i能填满背包，加入当前物品则需要放弃前面所有的物品，0是为了j-weight[i]时 放弃之前的物品
    dp[i] = [0]
  }
  for (let i = 1; i <= volume; i++) {
    // 这是只有一个物品的情况，当它恰好能装满那就是有效的
    dp[0][i] = weights[0] === i ? values[0] : -Infinity
  }

  for (let i = 1; i < weights.length; i++) {
    for (let j = 1; j <= volume; j++) {
      if (j < weights[i]) {
        // 当前装不进去，只能寄希望同容量的上一次能有结果继承
        dp[i][j] = dp[i - 1][j]
      } else {
        // 能装进去，既能继承上层，还能看看减少的情况是不是有效的
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i]] + values[i])
      }
    }
  }
  return Math.max(dp[weights.length - 1][volume], 0)
}

// 完全背包
// 购物单问题 hj16 https://www.nowcoder.com/practice/f9c6f980eeec43ef85be20755ddbeaf4?tpId=37&&tqId=21239&sourceUrl=https%3A%2F%2Fwww.nowcoder.com%2Fexam%2Foj%3FjudgeStatus%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tab%3D%25E5%2590%258D%25E4%25BC%2581%25E7%259C%259F%25E9%25A2%2598%26topicId%3D37
// eslint-disable-next-line max-params
export const CompletePack = (weights: number[][], values: number[][], money: number): number => {
  const dp = []

  const volume = Math.floor(money / 10)
  // 初始化，背包容量最小是 0
  for (let i = 0; i < weights.length; i++) {
    dp[i] = [0]
  }
  // 只有一种物品，初始化
  for (let i = 1; i <= volume; i += 1) {
    let max = 0
    for (let j = 0; j < weights[0].length; j++) {
      max = weights[0][j] <= i * 10 && values[0][j] > max ? values[0][j] : max
    }
    dp[0][i] = max
  }

  // i 为每种主件，weights[i] 为数组，是包含了主件和附件的最多四种组合
  for (let i = 1; i < weights.length; i++) {
    // J 为预算的钱，即背包容量，在不同容量下的最满意的选择
    for (let j = 1; j <= money / 10; j += 1) {
      // 初始化为不取当前的（主件）物品，与取主件、主件与附件 进行对比，确定当前背包容量为j的情况下的最佳选择
      let itemMax = dp[i - 1][j]
      // 主要在于主件间的不同比较
      for (let k = 0; k < weights[i].length; k++) {
        if (weights[i][k] <= j * 10) {
          itemMax = Math.max(itemMax, dp[i - 1][j - weights[i][k] / 10] + values[i][k])
        }
      }
      // 当前满意度最高的选择
      dp[i][j] = itemMax
    }
  }

  return dp[dp.length - 1][dp[0].length - 1]
}
