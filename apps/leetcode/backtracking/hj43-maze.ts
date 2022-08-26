export const mazeSolution = (maze: number[][]): string[] => {
  if (!maze.length || !maze[0].length) {
    return []
  }

  const ret: string[] = []
  const m = maze.length
  const n = maze[0].length

  // eslint-disable-next-line max-params
  const backtracking = (maze: number[][], x = 0, y = 0, path: string[]): boolean => {
    let access = false
    if (x >= 0 && x < m && y >= 0 && y < n && maze[x][y] === 0) {
      // 选取当前格子作为起点
      path.push(`(${x},${y})`)
      // 起点之前的不管，必须把已经选取了的堵上，避免探索到起点，我们需要回溯到这个起点
      maze[x][y] = 1

      // 设置出口条件
      if (x === m - 1 && y === n - 1) {
        ret.push(...path)
        return true
      }

      // 遍历各个分支
      access =
        backtracking(maze, x + 1, y, path) ||
        backtracking(maze, x, y + 1, path) ||
        backtracking(maze, x - 1, y, path) ||
        backtracking(maze, x, y - 1, path)

      if (!access) {
        // 没找到出口，就回溯到选择的起点位置
        path.pop()
        maze[x][y] = 0
      }
    }
    return access
  }

  backtracking(maze, 0, 0, [])

  return ret
}
