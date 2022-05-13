import { TicTacToeGame } from './TicTacToeGame/TicTacToeGame'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/tic" element={<TicTacToeGame />} />
      </Routes>
    </BrowserRouter>
  )
}
