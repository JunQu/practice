/*
 *
 题目描述
若两个正整数的和为素数，则这两个正整数称之为“素数伴侣”，如2和5、6和13，它们能应用于通信加密。现在密码学会请你设计一个程序，从已有的 N （ N 为偶数）个正整数中挑选出若干对组成“素数伴侣”，挑选方案多种多样，例如有4个正整数：2，5，6，13，如果将5和6分为一组中只能得到一组“素数伴侣”，而将2和5、6和13编组将得到两组“素数伴侣”，能组成“素数伴侣”最多的方案称为“最佳方案”，当然密码学会希望你寻找出“最佳方案”。

输入:

有一个正偶数 n ，表示待挑选的自然数的个数。后面给出 n 个具体的数字。

输出:

输出一个整数 K ，表示你求得的“最佳方案”组成“素数伴侣”的对数。
数据范围: 1≤n≤100，输入的数据大小满足 2≤val≤30000
 * */

const isPrime = (n: number): boolean => {
  if (n === 2 || n === 3 || n === 5 || n === 7) {
    return true
  }
  if (n < 2 || n % 2 === 0) {
    return false
  }
  for (let i = 3; i * i <= n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

/**
 *
 * 算法特点：匹配数量最多，整体值最小等等，正数权值
 * @param n 当前需要安排匹配的人
 * @param evenList 匹配的奇数列表，n 在里面寻找匹配的数字
 * @param used 标记当前list的奇数是否被匹配过，这是为了在这个函数递归里面保存变量，避免重复匹配一个元素而陷入死循环
 * @param matchedList 已经匹配的偶数列表,保存的是 n 这样的数字，即已经匹配的偶数
 */
// eslint-disable-next-line max-params
const findPartner = (n: number, evenList: number[], matchedList: number[], used: boolean[]) => {
  // 偶数 n 与每一个奇数匹配
  for (let i = 0; i < evenList.length; i++) {
    // used 表示你是否被匹配过
    // isPrime 代表匹配条件，一般在匈牙利算法里面是类似图边的查询，当然这里也完全可以转化为查询的二维表提高速度
    if (!used[i] && isPrime(evenList[i] + n)) {
      // 此时当前的奇数设置为已经匹配,避免递归重复
      used[i] = true
      // 这里是该算法的特点：
      // 如果这数字没有被匹配，那肯定就是匹配当前数字，matchedList[i] 就是这个
      // 如果当前奇数已经被匹配，那么我就找它的搭档， findPartner
      if (!matchedList[i] || findPartner(matchedList[i], evenList, matchedList, used)) {
        matchedList[i] = n
        return true
      }
    }
  }
  // 没找到匹配的数字情况
  return false
}

// 2<=nums[i] <=30000
export const primePartner = (nums: number[]) => {
  if (!nums.length) {
    return 0
  }
  if (nums.length === 1) {
    return isPrime(nums[0]) ? 1 : 0
  }
  const odds = nums.filter((n) => n % 2 === 1)
  const evens = nums.filter((n) => n % 2 === 0)
  const matchedList: number[] = []
  let count = 0
  for (const odd of odds) {
    if (findPartner(odd, evens, matchedList, [])) {
      count += 1
    }
  }
  return count
}
