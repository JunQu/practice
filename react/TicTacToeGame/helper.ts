import type { SquareType, SquareValueType } from './typing'

export const calculateWinner = (squares: SquareType) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  return lines.reduce<SquareValueType>((found, [a, b, c]) => {
    if (found !== null && squares[a] && squares[b] === squares[a] && squares[c] === squares[a]) {
      return squares[a]
    } else {
      return found
    }
  }, null)
}
