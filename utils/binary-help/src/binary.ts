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
