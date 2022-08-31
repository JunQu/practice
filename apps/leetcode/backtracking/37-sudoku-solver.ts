const len = 9

export const solveSudoku = (board: string[][]): void => {
  backtracking(board)
}

const backtracking = (board: string[][]): boolean => {
  for (let row = 0; row < len; row++) {
    // eslint-disable-next-line no-unreachable-loop
    for (let col = 0; col < len; col++) {
      // 每个位置进行，1-9 每个数字尝试填入
      if (board[row][col] === '.') {
        for (let k = 1; k <= len; k++) {
          if (validateSudoku(board, row, col, String(k))) {
            board[row][col] = String(k)
            // 进行回溯
            // eslint-disable-next-line max-depth
            if (!backtracking(board)) {
              // 当前填入的不对，进行回溯操作
              board[row][col] = '.'
            } else {
              // 填入的能找到答案，直接返回
              return true
            }
          }
        }
        return false
      }
    }
  }
  return true
}

// eslint-disable-next-line max-params
const validateSudoku = (board: string[][], x: number, y: number, val: string): boolean => {
  for (let i = 0; i < len; i++) {
    if (board[x][i] === val) {
      return false
    }
  }

  for (let i = 0; i < len; i++) {
    if (board[i][y] === val) {
      return false
    }
  }
  let startRow = Math.floor(x / 3) * 3
  let startCol = Math.floor(y / 3) * 3

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === val) {
        return false
      }
    }
  }
  return true
}
