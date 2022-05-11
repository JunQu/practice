const padLeft = (padding: number | string, input: string): string => {
  // throw new Error('Method not implemented.')
  if (typeof padding === 'number') {
    return input.padStart(padding, ' ')
  }
  return padding + input
}

const printAll = (strs: string[] | string | null) => {
  if (strs && typeof strs === 'object') {
    for (const str of strs) {
      console.log(str)
    }
  }
}

type Fish = {
  swim: () => void
}
type Bird = { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'square'
  sideLength: number
}

type shape = Circle | Square

const getArea = (shape: shape) => {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
}
