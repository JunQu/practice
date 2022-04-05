/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
  const stack = []
  for (const str of s) {
    switch (str) {
      case '(':
      case '[':
      case '{':
        stack.push(str)
        break
      case ')':
        if (stack.pop() !== '(') {
          return false
        }
        break
      case ']':
        if (stack.pop() !== '[') {
          return false
        }
        break
      case '}':
        if (stack.pop() !== '{') {
          return false
        }
        break
      default:
        break
    }
  }
  return !stack.length
};

console.log(isValid('()'));
console.log(isValid('(]){}'));
console.log(isValid('(){}[]'));
console.log(isValid('{()}'));
