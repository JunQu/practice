/**
 * 给你两个字符串 A ，B，把B整体插入到A的某个位置组成一个新字符串，求组合后值最大的字符串
 * A,B  长度为： 0～30， 只包含 0～9
 * 例如 A:123 B:456 输出为：456123，异常情况输出 -1
 * 思路：组合后字符串长度确定，为了得到值最大，确保高位都是大值，只要找到 B 的第一位比 A 中某一位大，这个就是插入的位置
 */

const getMaxMeagre = (stringA: string, stringB: string): string => {
  // 考虑空川
  if (!stringA && !stringB) {
    return '-1'
  }
  // 只有一个为空的情况
  if (!stringA) {
    return stringB
  }
  if (!stringB) {
    return stringA
  }
  // 考虑前导 0 和 以及第一位是否比它要小
  if (stringA[0] === '0' || stringA[0] < stringB[0]) {
    return stringB + stringA
  }

  let position = -1

  // 寻找某一位比 stringB 首位要小的
  for (let i = 0; i < stringA.length; i++) {
    if (stringB[0] > stringA[i]) {
      position = i
      break
    }
  }
  // 每个位置都比 StringB 首位大，直接拼接
  if (position === -1) {
    return stringA + stringB
  } else {
    return stringA.slice(0, position) + stringB + stringA.slice(position)
  }
}

console.log(getMaxMeagre('123', '456'))
console.log(getMaxMeagre('456', '123'))
console.log(getMaxMeagre('', '123'))
console.log(getMaxMeagre('123', ''))
console.log(getMaxMeagre('7185', '754'))
console.log(getMaxMeagre('', ''))
