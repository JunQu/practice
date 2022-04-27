import style from './game.module.css'

export const Square = ({ value, onClick }) => (
  <button onClick={onClick} className={style.square}>
    {value}
  </button>
)
