export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = typeof val === 'number' ? val : 0
    this.left = typeof left === 'object' ? left : null
    this.right = typeof right === 'object' ? right : null
  }
}

// 该方法处理有缺陷，无法处理类似 [1,null,2,3] 这样的数据
export const arrToTree = (arr: (number | null)[], root = 0) => {
  if (root >= arr.length || typeof arr[root] !== 'number') {
    return null
  }

  let tree = new TreeNode(arr[root] as number)
  tree.left = arrToTree(arr, 2 * root + 1)
  tree.right = arrToTree(arr, 2 * root + 2)
  return tree
}
