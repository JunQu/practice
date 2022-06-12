import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div onClick={() => setCount(count + 1)}>
      <p>You clicked {count} times</p>
    </div>
  )
}
