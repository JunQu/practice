export const inputStream = <T=string>(...args:T[]) => {
  const words = [...args]
  return () => {
    return words.shift()
  }
}
