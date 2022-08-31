/**
 *
 * 掩码是一组用于判断两个ip（子网）是否属于同一网络的一个东西
 * 特点是32位二进制下，前面全是1，代表网络位，1的长度就是网络位的长度，后面为 0 代表主机位，0的长度就是主机位的长度
 * 其中特殊的32位全为 1 代表是广播地址，而全部为 0 代表网络号，这两个是特殊地址，不是通常意义上的掩码
 * @param mask 存放掩码的数组，确定为4位
 */
export const validateMask = (mask: number[]): boolean => {
  if (mask.length !== 4) {
    return false
  }
  let str = ''
  for (const num of mask) {
    if (num >= 0 && num <= 255) {
      let tmp = num.toString(2)
      while (tmp.length < 8) {
        tmp = '0' + tmp
      }
      str += tmp
    } else {
      return false
    }
  }
  if (str.length < 32 || str[0] !== '1') {
    return false
  }

  let zero = false
  for (const s of str) {
    if (s === '0') {
      zero = true
    }
    if (zero && s === '1') {
      return false
    }
  }
  return true
}
