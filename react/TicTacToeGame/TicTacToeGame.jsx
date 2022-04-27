import { Board } from './Board'
import style from './game.module.css'
import { useMemo, useState } from 'react'

export const TicTacToeGame = () => {
  const [squaresHistory, setSquaresHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [isNext, setIsNext] = useState(true)

  const status = useMemo(() => {
    const winner = calculateWinner(squaresHistory[stepNumber].squares)
    return winner ? `Winner: ${winner}` : `Next player: ${isNext ? 'X' : 'O'}`
  }, [squaresHistory, stepNumber, isNext])

  const handleClick = (i) => {
    const history = squaresHistory.slice(0, stepNumber + 1)
    const squares = history.at(-1).squares.slice()
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    squares[i] = isNext ? 'X' : 'O'
    setSquaresHistory(() => history.concat([{ squares }]))
    setIsNext(!isNext)
    setStepNumber(history.length)
  }
  const jumTo = (step) => {
    setStepNumber(step)
    setIsNext(step % 2 === 0)
  }

  return (
    <div className={style.game}>
      <div>
        <Board squares={squaresHistory[stepNumber]?.squares} onClick={handleClick} />
      </div>
      <div className={style['game-info']}>
        <div>{status}</div>
        <ol>
          {squaresHistory.map((step, move) => (
            <li key={move}>
              <button onClick={() => jumTo(move)}>{move ? `Go to move # ${move}` : `Go to game start`}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
