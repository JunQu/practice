export const replaceWords = (dictionary: string[], sentence: string): string => {
  const words = sentence.split(' ')
  const trie = new Trie()
  for (const str of dictionary) {
    trie.insert(str)
  }
  return words.map((word) => trie.getWordRoot(word) || word).join(' ')
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
    node.word = word
  }
  getWordRoot(word: string) {
    if (!word) {
      return ''
    }
    let node = this.root
    for (const s of word) {
      if (!node.children.has(s)) {
        return ''
      }
      node = node.children.get(s)!
      if (node.word) {
        return node.word
      }
    }
    // 最后也未能找到，其实早就提前返回了
    return ''
  }
}

class TrieNode {
  word = ''
  children = new Map<string, TrieNode>()
}
