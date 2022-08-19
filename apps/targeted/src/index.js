import { inputStream } from './until.js'
import { tmpdir } from 'os'

const readline = inputStream('8 11', '13 370', '21 664', '16 993', '13 453', '11 13', '11 62', '5 288', '7 719')
let line

/*
 *
 * j31
 * j40
 * j73
 * j84
 * j106
 * j34
 * j81
 * j54
 * j85*
 *
 *
 *
 * j72
 * j94 愚蠢题目
 * j99
 * j100
 * j97
 * j105 多行不确定
 * j35
 * j56 大伙都在打表
 *
 * j22 规律 需要再次
 * j80 需要再次
 * j51 建立链表
 * j62
 * j86
 * j76
 * j83 设计判断出错题目
 * j87 垃圾的条件判断题目
 *
 *
 *  j108 数学方法
 *  j108 二分，注意负数，小于1的小数
 *  j91 动态规划
 *  j29 简单题目失误不细心
 *  j18
 *  j68
 *
 *
 *  j41
 * dp41
 *
 * */

// eslint-disable-next-line no-cond-assign
while ((line = readline())) {
  const [n, volume] = line.split(' ').map((v) => parseInt(v, 10))
  const weights = []
  const values = []

  for (let i = 0; i < n; i++) {
    const [w, v] = readline().split(' ')
    weights.push(parseInt(w, 10))
    values.push(parseInt(v, 10))
  }

  // 0-1 背包
  const knappack = (weights, values, volume) => {
    // dp[i][J] 第 i 项 能获得的最大价值,i代表有多少种类物品,  J 代表不同的背包容量 定义
    // dp[i] = max(dp[i-1][j], dp[i-1][j - w] + val[i])  公式
    let dp = []
    // 初始化
    for (let i = 0; i < weights.length; i++) {
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
          let self = j === weights[i] ? values[i]: -Infinity
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i]] + values[i],self)
        }
      }
    }
    return dp[weights.length - 1][volume]
  }

  // 恰好装满背包
  const fullpack = (weights, values, volume) => {
    // 什么都不装也是满的情况
    const dp = [[0]]
    for (let i = 1; i < weights.length; i++) {
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

  console.log(knappack(weights, values, volume))
  console.log(fullpack(weights, values, volume))
}
