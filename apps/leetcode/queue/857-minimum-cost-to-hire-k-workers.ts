const isEqual = (a: number, b: number) => Math.abs(a - b) < 1e-8

export const mincostToHireWorkers = (quality: number[], wage: number[], k: number): number => {
  // 增加一个对应的关系
  const indexs = Array.from({ length: quality.length }, (_, i) => i)
  indexs.sort((a, b) => wage[a] / quality[a] - wage[b] / wage[b])

  const heapfiy = (arr: number[]) => {}
  let totalQ = 0
  for (let i = 0; i < k - 1; i++) {
    totalQ += quality[indexs[i]]
  }

  for (let i = k - 1; i < quality.length; i++) {
    let idx = indexs[i]
    totalQ += quality[idx]
  }

  return 0
}

// [10,20,5]
// [70,50,30]
// 70 35
