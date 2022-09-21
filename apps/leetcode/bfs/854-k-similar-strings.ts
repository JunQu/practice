const swap = (arr: string[], idxA: number, idxB: number) => {
  let tmp = arr[idxA]
  arr[idxA] = arr[idxB]
  arr[idxB] = tmp
}
// 朴素做法 当然没过
// export const kSimilarity = (s1: string, s2: string): number => {
//   if (s1 === s2) {
//     return 0
//   }
//
//   return Math.min(getChange(s1, s2), getChange(s2, s1))
// }
//
// const getChange = (s1: string, s2: string) => {
//   let count = 0
//   const str1 = s1.split('')
//   const str2 = s2.split('')
//   for (let i = 0; i < str1.length; i++) {
//     if (str1[i] !== str2[i]) {
//       for (let j = i + 1; j < str2.length; j++) {
//         if (str2[j] === str1[i]) {
//           swap(str2, i, j)
//           count += 1
//           break
//         }
//       }
//     }
//   }
//
//   return count
// }
//

// 回溯法
export const kSimilarityDFS = (s1: string, s2: string): number => {
  let min = Number.MAX_SAFE_INTEGER
  let len = s1.length

  // eslint-disable-next-line max-params
  const backtracking = (strA: string[], strB: string[], index: number, count = 0) => {
    if (index === len) {
      if (count < min) {
        min = count
      }
      return
    }
    if (strA[index] === strB[index]) {
      backtracking(strA, strB, index + 1, count)
    } else {
      for (let i = index + 1; i < strB.length; i++) {
        if (strB[i] !== strA[i] && strB[i] === strA[index]) {
          swap(strB, index, i)
          backtracking(strA, strB, index + 1, count + 1)
          swap(strB, index, i)
        }
      }
    }
  }
  backtracking(s1.split(''), s2.split(''), 0, 0)
  return min
}

// BFS
export const kSimilarity = (s1: string, s2: string): number => {
  const queue: [string, number][] = []
  // 保存已处理过的路径
  const visited = new Set<string>()
  const len = s1.length
  let step = 0

  queue.push([s1, 0])
  visited.add(s1)

  while (queue.length) {
    const level = queue.length

    for (let i = 0; i < level; i++) {
      let [cur, pos] = queue.shift()!
      // 调整 s1， 以s2 为目标
      if (cur === s2) {
        return step
      }
      // 跳过相同的字符
      while (pos < len && cur[pos] === s2[pos]) {
        pos += 1
      }
      for (let j = pos + 1; j < len; j++) {
        // 在不同的部分里面寻找与当前相同的字符
        if (s2[j] !== cur[j] && cur[j] === s2[pos]) {
          const next = swapStr(cur, pos, j)
          if (!visited.has(next)) {
            visited.add(next)
            queue.push([next, pos + 1])
          }
        }
      }
    }
    step += 1
  }
  return step
}

const swapStr = (str: string, idxA: number, idxB: number) => {
  const arr = [...str]
  const tmp = arr[idxA]
  arr[idxA] = arr[idxB]
  arr[idxB] = tmp
  return arr.join('')
}
