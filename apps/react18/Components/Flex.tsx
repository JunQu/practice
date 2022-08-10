import React, { useState } from 'react'

export const Flex = () => {
  const [state, setState] = useState<string>('2')
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setState(() => val)
  }
  return (
    <div>
      <input type="text" value={state} onInput={handlerChange} />
    </div>
  )
}
