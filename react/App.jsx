import { TicTacToeGame } from './TicTacToeGame/TicTacToeGame'
import { BrowserRouter } from 'react-router-dom'
export function App() {
  return (
    <BrowserRouter className="app" basename="/react">
      <TicTacToeGame />
    </BrowserRouter>
  )
}
