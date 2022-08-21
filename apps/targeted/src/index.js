import { inputStream } from './until.js'

const readline = inputStream('7', '5 4 1 2 3 ')
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
 *
 * j74
 * j75
 * j92
 * j93
 * j26
 *
 *
 * */

// eslint-disable-next-line no-cond-assign
while ((line = readline())) {
  const nums = readline()
    .split(' ')
    .map((v) => parseInt(v, 10))
  const dp = [1]
  let max = 1

  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1
    for (let j = i - 1; j >= 0; j--) {
      if (dp[j] >= dp[i] && nums[i] > nums[j]) {
        dp[i] = dp[j] + 1
        max = dp[i] > max ? dp[i] : max
      }
    }
  }
  console.log(max)
}
