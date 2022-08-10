import style from './game.module.css'
import type { MouseEvent } from 'react'
import { SquareValueType } from './typing'

type SquareProps = {
  value: SquareValueType
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Square = ({ value, onClick }: SquareProps) => (
  <button onClick={onClick} className={style.square}>
    {value}
  </button>
)
