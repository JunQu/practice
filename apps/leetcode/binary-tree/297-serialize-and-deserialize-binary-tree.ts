class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const serialize = (root: TreeNode | null): string => {
  if (root === null) {
    return ''
  }
  const queue: (TreeNode | null)[] = []
  queue.push(root)
  let serializeString = ''

  while (queue.length) {
    const node = queue.shift()
    serializeString += node ? `${node.val},` : 'null,'
    if (node) {
      queue.push(node.left)
      queue.push(node.right)
    }
  }

  return serializeString.slice(0, -1)
}

/**
 * Decodes your encoded data to tree.
 * data: 1,2,null,3,4,null,5
 */
const deserialize = (data: string): TreeNode | null => {
  if (!data || data[0] === 'null') {
    return null
  }
  const children = ['left', 'right'] as const
  const nodes = data.split(',')
  const root = new TreeNode(parseInt(nodes[0], 10))
  let index = 0
  let queue: TreeNode[] = []
  queue.push(root)
  while (queue.length && index < nodes.length) {
    let levelLen = queue.length
    while (levelLen) {
      const parent = queue.shift()!
      for (const child of children) {
        index += 1
        const val = nodes[index] === 'null' ? null : parseInt(nodes[index], 10)
        const childNode = val === null ? null : new TreeNode(val)
        parent[child] = childNode
        if (childNode !== null) {
          queue.push(childNode)
        }
      }
      levelLen -= 1
    }
  }

  return root
}
