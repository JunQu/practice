/**
 * @param {string[]} sentences
 * @return {number}
 */
const mostWordsFound = function (sentences) {
  let maxWords = 0
  for (const sentence of sentences) {
    let currentWorlds = 0
    for (const sentenceElement of sentence) {
      if (sentenceElement === ' ') {
        currentWorlds++
      }
    }
    if (currentWorlds > maxWords) {
      maxWords = currentWorlds
    }
  }
  return ++maxWords
}

// const mostWordsFound = (s) => {
//   let m = 0
//   for (const e of s) {
//     let c = e.match(/\s/g)?.length ?? 0
//     m = c > m ? c : m
//   }
//   return ++m
// }

console.log(mostWordsFound(['alice and bob love leetcode', 'i think so too', 'this is great thanks very much']))
console.log(mostWordsFound(['a']))
