import { TicTacToeGame } from './TicTacToeGame/TicTacToeGame'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter className="app" basename="/react">
      <Routes>
        <Route path="/tic" element={<TicTacToeGame />} />
      </Routes>
    </BrowserRouter>
  )
}
