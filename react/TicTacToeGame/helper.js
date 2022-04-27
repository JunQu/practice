export const calculateWinner = (squares) => {
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
  return lines.reduce(
    (found, [a, b, c]) =>
      !found && squares[a] && squares[b] === squares[a] && squares[c] === squares[a] ? squares[a] : found,
    null
  )
}
