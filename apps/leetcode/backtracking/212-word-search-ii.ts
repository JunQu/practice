// 多次查找的例子，使用前缀树可以降低搜索时间，实际应用中估计也是这样的原理
export const findWords = (board: string[][], words: string[]): string[] => {
  const collection = new Set<string>()
  const trie = new Trie()

  // eslint-disable-next-line max-params
  const backtracking = (board: string[][], root: TrieNode, i: number, j: number) => {
    let node = root
    const char = board[i][j]
    // 字母对不上
    if (!node.children.has(char)) {
      return
    }
    // 移动路径
    node = node.children.get(char)!
    // 这里能在网格路过一个单词，那就加入结果中，这也是前缀树最大的作用所在
    if (node.word) {
      collection.add(node.word)
    }
    board[i][j] = '$'
    // top
    if (i > 0) {
      backtracking(board, node, i - 1, j)
    }
    // left
    if (j > 0) {
      backtracking(board, node, i, j - 1)
    }
    // right
    if (i < board.length - 1) {
      backtracking(board, node, i + 1, j)
    }
    // bottom
    if (j < board[0].length - 1) {
      backtracking(board, node, i, j + 1)
    }
    board[i][j] = char
  }

  for (const word of words) {
    trie.insert(word)
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      backtracking(board, trie.root, i, j)
    }
  }

  return [...collection]
}

class Trie {
  root: TrieNode = new TrieNode()

  insert(word: string) {
    if (!word.trim()) {
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
}

class TrieNode {
  word = ''
  children = new Map<string, TrieNode>()
}
