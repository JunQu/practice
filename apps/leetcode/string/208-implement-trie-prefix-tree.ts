class TrieNode {
  children: Map<string, TrieNode>
  isEnd: boolean

  constructor() {
    this.children = new Map()
    this.isEnd = false
  }
}

export class Trie {
  root: TrieNode
  constructor() {
    // 存放 26 个字母
    this.root = new TrieNode()
  }

  insert(word: string): void {
    let node: TrieNode = this.root
    for (const s of word) {
      if (!node.children.has(s)) {
        const trieNode = new TrieNode()
        node.children.set(s, trieNode)
      }
      node = node.children.get(s)!
    }
    node.isEnd = true
  }

  search(word: string): boolean {
    const node: TrieNode | null = this._seachActulWord(word)
    return !!node?.isEnd
  }

  startsWith(prefix: string): boolean {
    const node: TrieNode | null = this._seachActulWord(prefix)
    return !!node
  }

  // 查找这个字符，如果有就返回最后的位置
  _seachActulWord(prefix: string): TrieNode | null {
    let node = this.root
    for (const s of prefix) {
      if (!node.children.has(s)) {
        return null
      }
      node = node.children.get(s)!
    }
    return node
  }
}
