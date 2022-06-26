export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export const arrToList = (arr: number[]) =>
  arr.reduceRight<null | ListNode>(
    (head, val) => (head = head === null ? new ListNode(val) : new ListNode(val, head)),
    null
  )

export const listToArr = (list: ListNode | null) => {
  const arr: number[] = []
  let l1 = list
  while (l1 !== null) {
    arr.push(l1.val)
    l1 = l1.next
  }
  return arr
}
