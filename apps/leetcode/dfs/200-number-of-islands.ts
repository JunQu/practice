export const numIslands = (grid: string[][]): number => {
  let count = 0

  const dfs = (grid: string[][], x: number, y: number): void => {
    if (y < 0 || x < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] !== '1') {
      return
    }
    grid[x][y] = '2'
    if (x > 0 && grid[x - 1][y] === '1') {
      dfs(grid, x - 1, y)
    }
    if (y > 0 && grid[x][y - 1] === '1') {
      dfs(grid, x, y - 1)
    }
    if (x < grid.length - 1 && grid[x + 1][y] === '1') {
      dfs(grid, x + 1, y)
    }
    if (y < grid[0].length - 1 && grid[x][y + 1] === '1') {
      dfs(grid, x, y + 1)
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count += 1
        dfs(grid, i, j)
      }
    }
  }

  return count
}
