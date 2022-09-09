export const solveNQueens = (len: number): string[][] => {
  const board: number[][] = Array(len)
    .fill(0)
    .map((_) => Array(len).fill(0))
  const res: string[][] = []

  const backtracking = (board: number[][], row = 0) => {
    if (row === len) {
      res.push(boardToStr(board))
      return
    }
    if (row >= len) {
      return
    }

    for (let col = 0; col < len; col++) {
      if (board[row][col] === 0 && isValidate(board, row, col)) {
        board[row][col] = 1
        backtracking(board, row + 1)
        board[row][col] = 0
      }
    }
  }

  backtracking(board)

  return res
}
const boardToStr = (bord: number[][]) => {
  const ret = []
  for (const item of bord) {
    let str = item.map((v) => (v ? 'Q' : '.')).join('')
    ret.push(str)
  }
  return ret
}

const isValidate = (board: number[][], row: number, col: number) => {
  // row
  for (let i = row - 1; i >= 0; i--) {
    if (board[i][col]) {
      return false
    }
  }

  for (let i = col - 1; i >= 0; i--) {
    if (board[row][i]) {
      return false
    }
  }

  // 两个对角位置的判断
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    if (board[row - i][col - i]) {
      return false
    }
  }

  for (let i = 1; row - i >= 0 && col + i < board.length; i++) {
    if (board[row - i][col + i]) {
      return false
    }
  }
  return true
}
