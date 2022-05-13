import { Square } from './Square'
import style from './game.module.css'
import type { SquareType } from './typing'

type BoardProps = {
  onClick: (val: number) => void
  squares: SquareType
}

export const Board = ({ onClick, squares = [] }: BoardProps) => {
  const columns = 3
  const rows = 3
  const boxes = Array.from({ length: columns }, (_, i) => Array.from({ length: rows }, (_, j) => i * rows + j))

  return (
    <div>
      {boxes.map((box, index) => (
        <div className={style.boardRow} key={index + 'square'}>
          {box.map((val) => (
            <Square onClick={() => onClick(val)} key={val + 'val'} value={squares[val]} />
          ))}
        </div>
      ))}
    </div>
  )
}
