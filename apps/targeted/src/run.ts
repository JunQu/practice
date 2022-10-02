import { inputStream } from './until'

const readline = inputStream('3', '2', '2', '1')
let line = readline()

/**
 * 华为牛客题目
 * j22 规律 需要再次
 * j80 需要再次
 * j51 建立链表
 * j83 设计判断出错题目
 * j87 垃圾的条件判断题目
 *  j108 数学方法
 *  j108 二分，注意负数，小于1的小数
 *  j91 动态规划
 *  j29 简单题目失误不细心
 * */
// v8 牛客 acm 模式的处理输入的方式
while (line !== undefined) {
  const count = parseInt(line, 16)
  console.log(count)
  line = readline()
}
