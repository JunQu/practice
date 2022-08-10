import { useState, useEffect } from 'react'

export const Button = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log(count)
      setCount(() => count + 1)
    }, 1000)
  }, [])

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
