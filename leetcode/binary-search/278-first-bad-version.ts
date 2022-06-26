const solution = function (isBadVersion: (version: number) => boolean): (n: number) => number {
  return (n: number): number => {
    let left = 1
    let right = n
    while (left < right) {
      const mid = ~~(right - left)
      right = isBadVersion(mid) ? mid : ((left = mid + 1), right)
    }
    return left
  }
}

const isBadVersion = (n: number) => n === 4
console.log(solution(isBadVersion)(5))
