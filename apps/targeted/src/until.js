export const inputStream = (...args) => {
  const strs = [...args]
  return () => {
    return strs.shift()
  }
}
