import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  console.log('Hello CSS PAA')
  const [count, setCount] = useState<number>(0)
  const handleClick = () => setCount(count + 1)
  return (
    <div>
      <h1>Css App</h1>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
