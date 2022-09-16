export const intervalIntersection = (firstList: number[][], secondList: number[][]): number[][] => {
  if (!firstList.length || !secondList.length) {
    return []
  }
  const collect: number[][] = []
  let first = 0
  let second = 0
  while (first < firstList.length && second < secondList.length) {
    const low = Math.max(firstList[first][0], secondList[second][0])
    const high = Math.min(firstList[first][1], secondList[second][1])

    if (low <= high) {
      collect.push([low, high])
    }
    if (firstList[first][1] < secondList[second][1]) {
      first += 1
    } else {
      second += 1
    }
  }

  return collect
}
