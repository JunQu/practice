import { TreeNode } from 'binary-help'

// 这次第一题简单到可以忽略，但我却大意写反了条件，该打
function smallestEvenMultiple(n: number): number {
  return n & 1 ? n << 1 : n
}

// 因为简单，我一下子的想法很多，但是dp是最靠谱的，用空间换处理的麻烦
function longestContinuousSubstring(str: string): number {
  let dp = Array(str.length).fill(1)
  for (let i = 1; i < str.length; i++) {
    if (str[i].charCodeAt(0) - str[i - 1].charCodeAt(0) === 1) {
      dp[i] += dp[i - 1]
    }
  }
  return Math.max(...dp)
}

// 因为不小心(没有把root放进队列，导致没启动)浪费了二十分钟
// BFS 模板题，其实没啥好说的
export function reverseOddLevels(root: TreeNode | null): TreeNode | null {
  if (!root || (!root.right && !root.left)) {
    return root
  }
  const queue: TreeNode[] = []
  let level = 0
  queue.push(root)

  while (queue.length) {
    let levelSize = queue.length
    const levelNodes: TreeNode[] = []
    while (levelSize) {
      const node = queue.shift()!
      levelNodes.push(node)
      if (node.left) {
        queue.push(node.left)
        queue.push(node.right!)
      }
      levelSize -= 1
    }
    // 和层序遍历唯一不同点
    // 层序遍历是把值拿住
    // 这里是把值翻转，仅仅而已
    if (level % 2 === 1) {
      const values = levelNodes.map((node) => node.val).reverse()
      for (let i = 0; i < values.length; i++) {
        levelNodes[i].val = values[i]
      }
    }

    level += 1
  }
  return root
}

// 明显前缀树模板题，可惜我不会前缀树超时了
// 这里是首先统计所有的前缀，然后统计各个前缀的数量在数组
// 因为如果是其他单词的前缀，那么必然包含了这个前缀在数组
// 所以统计数量即可，但是数据大的时候，因为是 NxN 所以超时，空间也是 N x N
function sumPrefixScoresHash(words: string[]): number[] {
  if (words.length === 1) {
    return [words[0].length]
  }
  const ans: number[] = []

  const prixes: string[][] = []
  for (const word of words) {
    prixes.push(getSubstr(word))
  }
  const hash = new Map()

  for (const prix of prixes) {
    for (const pre of prix) {
      hash.set(pre, (hash.get(pre) || 0) + 1)
    }
  }

  for (const prix of prixes) {
    let count = 0
    for (const pre of prix) {
      count += hash.get(pre)
    }
    ans.push(count)
  }

  return ans
}

const getSubstr = (str: string): string[] => {
  let strs = []
  let res = ''
  for (const s of str) {
    res += s
    strs.push(res)
  }

  return strs
}

function sumPrefixScores(words: string[]): number[] {
  const collection: number[] = []
  const trie = new Trie()
  // 首先存入前缀树，存入过程进行统计个数
  for (const word of words) {
    trie.insetWord(word)
  }
  // 取出前缀树里面统计的结果
  for (const word of words) {
    collection.push(trie.getWordCount(word))
  }
  return collection
}

class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }
  insetWord(word: string) {
    if (!word) {
      return
    }
    // 相对于树，我更愿意称它为链表，因为对于每个单词，它的路径确定的且唯一的
    // 整个过程就和链表一样，只不过需要寻找下一个节点是不太一样
    let node = this.root
    // 把每个字符添加到树里面
    // 注意路过的地方都要加一，因为这里统计所有分数的和
    for (const s of word) {
      if (!node.children.has(s)) {
        node.children.set(s, new TrieNode())
      }
      // 当前路过的字符，必然以此单词为前缀，加一
      node.count += 1
      // 移动链表
      node = node.children.get(s)!
    }
    // 最后单词结束的点，需要加一
    node.count += 1
  }
  getWordCount(word: string): number {
    if (!word) {
      return 0
    }
    let count = 0
    let node = this.root
    for (const s of word) {
      // 移动链表
      node = node.children.get(s)!
      // 把每个路过都加起来，因为每次路过都是一个前缀
      count += node?.count || 0
    }
    return count
  }
}

class TrieNode {
  children: Map<string, TrieNode>
  count: number
  constructor() {
    this.children = new Map<string, TrieNode>()
    this.count = 0
  }
}
