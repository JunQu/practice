export class TreeNode<T = number> {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: T, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = typeof val === 'number' ? val : 0
    this.left = typeof left === 'object' ? left : null
    this.right = typeof right === 'object' ? right : null
  }
}
