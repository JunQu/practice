import { inputStream } from './until.js'
import { tmpdir } from 'os'

const readline = inputStream('2', '1 2', '2 1')
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
 * */

// eslint-disable-next-line no-cond-assign
while ((line = readline())) {
  const n = parseInt(line, 10)
  const wights = readline()
    .split(' ')
    .map((v) => parseInt(v, 10))
  const nums = readline()
    .split(' ')
    .map((v) => parseInt(v, 10))
  const set = new Set([0])
  for (let i = 0; i < wights.length; i++) {
    for (let j = 1; j <= nums[i]; j++) {
      const arr = [...set]
      for (let k = 0; k <= arr.length; k++) {
        set.add(arr[i] + wights[i] * j)
      }
    }
  }
  console.log(set.size)
}
