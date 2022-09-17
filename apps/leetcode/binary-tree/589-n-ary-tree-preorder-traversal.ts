class NodeN {
  val: number
  children: NodeN[]
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val
    this.children = []
  }
}

function preorder(root: NodeN | null): number[] {
  if (!root) {
    return []
  }
  const result: number[] = []
  // 白色未访问
  const WHITE = 0
  // 灰色已经访问过
  const GRAY = 1

  const stack: [0 | 1, NodeN | null][] = []
  stack.push([WHITE, root])

  while (stack.length) {
    const [color, node] = stack.pop()!
    // 注意叶子节点，它子节点是空
    if (!node) {
      continue
    }
    if (color === GRAY) {
      // 灰色提取结果
      result.push(node.val)
    } else {
      // 前序遍历
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push([WHITE, node.children[i]])
      }
      // 现在需要变灰色
      stack.push([GRAY, node])
    }
  }

  return result
}
