// eslint-disable-next-line max-params
export const validSquare = (p1: number[], p2: number[], p3: number[], p4: number[]): boolean => {
  if (!p1 || !p2 || !p3 || !p4) {
    return false
  }

  const centerX = p1[0] + p2[0] + p3[0] + p4[0]
  const centerY = p1[1] + p2[1] + p3[1] + p4[1]

  const center2ri = (path: number[]) => {
    return [path[0] * 4 - centerX, path[1] * 4 - centerY]
  }

  const hash = new Set()
  const arr = [center2ri(p1), center2ri(p2), center2ri(p3), center2ri(p4)]

  for (const path of arr) {
    hash.add(path.join(''))
  }
  if (hash.size < 4) {
    return false
  }

  for (const path of arr) {
    if (!hash.has([-path[1], path[0]].join(''))) {
      return false
    }
  }

  return true
}
