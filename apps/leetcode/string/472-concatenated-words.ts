class TrieNode {
  isEnd: boolean
  children: Map<string, TrieNode>
  constructor() {
    this.isEnd = false
    this.children = new Map<string, TrieNode>()
  }
}

class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }
  insert(word: string) {
    if (!word) {
      return
    }
    let node = this.root
    for (const s of word) {
      if (!node.children.has(s)) {
        node.children.set(s, new TrieNode())
      }
      node = node.children.get(s)!
    }
    node.isEnd = true
  }
  // eslint-disable-next-line max-params
  isConcatenatedWord(word: string, start = 0, count = 0, minLen: number): boolean {
    if (!word) {
      return count > 1
    }

    if (word && word.length < minLen) {
      return false
    }

    let node = this.root

    for (let i = start; i < word.length; i++) {
      if (node.children.get(word[i])) {
        node = node.children.get(word[i])!
        if (word.length - i > minLen && node.isEnd && this.isConcatenatedWord(word, i + 1, count + 1, minLen)) {
          return true
        }
      } else {
        return false
      }
    }
    // count > 0 说明已经匹配了一个单词，如果当前也结束了，那么至少有两个单词匹配了
    return node.isEnd && !!count
  }
}

export const findAllConcatenatedWordsInADict = (words: string[]): string[] => {
  const trie = new Trie()
  let minLen = 0
  // 建立前缀树
  for (const word of words) {
    trie.insert(word)
    minLen = word.length < minLen ? word.length : minLen
  }
  // 把符合条件的连接词找出来
  return words.filter((word) => trie.isConcatenatedWord(word, 0, 0, minLen))
}
