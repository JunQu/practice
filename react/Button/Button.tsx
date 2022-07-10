import { useState, useEffect } from 'react'

export const Button = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log(count)
    }, 10 * 1000)
  }, [count])

  return <button onClick={() => setCount(count + 1)}>Button</button>
}
