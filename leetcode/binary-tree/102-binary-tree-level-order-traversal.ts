import { TreeNode } from '../helper/binary'

/*
 *
 * 根元素入队，
 * 当队列不为空：
 * 求当前队列长度 S
 * 依次取出 S 个元素进行拓展，然后进入下一次迭代
 * */
export const leveOrder = (root: TreeNode | null): number[][] => {
  const order: Array<Array<number>> = []
  if (!root) {
    return order
  }
  const leveElements: Array<TreeNode | null> = []
  leveElements.push(root)

  while (leveElements.length > 0) {
    // 缓存当前层的元素个数，用于遍历当前层的元素，因为que本身是变化的
    let currentLeveSize = leveElements.length
    // 每一层的遍历的结果
    order.push([])

    while (currentLeveSize) {
      let node = leveElements.shift()!
      order.at(-1)!.push(node.val)
      if (node.left) {
        leveElements.push(node.left)
      }
      if (node.right) {
        leveElements.push(node.right)
      }
      currentLeveSize -= 1
    }
  }
  return order
}
