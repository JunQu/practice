import { Square } from './Square'
import style from './game.module.css'

export const Board = ({ onClick, squares = [] }) => {
  const columns = 3
  const rows = 3
  const boxs = Array.from({ length: columns }, (_, i) => Array.from({ length: rows }, (_, j) => i * rows + j))
  return (
    <div>
      {boxs.map((box, index) => (
        <div className={style.boardRow} key={index + 'square'}>
          {box.map((val) => (
            <Square onClick={() => onClick(val)} key={val + 'val'} value={squares[val]} />
          ))}
        </div>
      ))}
    </div>
  )
}
