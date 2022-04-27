import { Board } from './Board'
import style from './game.module.css'

export const Game = () => {
  return (
    <div className={style.game}>
      <div className={style.gameBoard}>
        <Board />
      </div>
      <div className={style.gameInfo}>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}
