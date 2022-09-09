export const exist = (board: string[][], word: string): boolean => {
  const rowLen = board.length
  const colLen = board[0].length
  const wLen = word.length

  // eslint-disable-next-line max-params
  const backtracking = (board: string[][], row: number, col: number, wIndex = 1): boolean => {
    if (wIndex === wLen) {
      return true
    }

    if (row > rowLen || row < 0 || col < 0 || col > colLen) {
      return false
    }

    let isValid = false
    if (row > 0 && board[row - 1][col] === word[wIndex]) {
      let tmp = board[row - 1][col]
      board[row - 1][col] = '$'
      isValid = backtracking(board, row - 1, col, wIndex + 1)
      board[row - 1][col] = tmp
    }

    if (!isValid && row < rowLen - 1 && board[row + 1][col] === word[wIndex]) {
      let tmp = board[row + 1][col]
      board[row + 1][col] = '$'
      isValid = backtracking(board, row + 1, col, wIndex + 1)
      board[row + 1][col] = tmp
    }

    if (!isValid && col > 0 && board[row][col - 1] === word[wIndex]) {
      let tmp = board[row][col - 1]
      board[row][col - 1] = '$'
      isValid = backtracking(board, row, col - 1, wIndex + 1)
      board[row][col - 1] = tmp
    }

    if (!isValid && col < colLen - 1 && board[row][col + 1] === word[wIndex]) {
      let tmp = board[row][col + 1]
      board[row][col + 1] = '$'
      isValid = backtracking(board, row, col + 1, wIndex + 1)
      board[row][col + 1] = tmp
    }

    return isValid
  }

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (board[i][j] === word[0]) {
        board[i][j] = '$'
        if (backtracking(board, i, j, 1)) {
          return true
        }
        board[i][j] = word[0]
      }
    }
  }
  return false
}
