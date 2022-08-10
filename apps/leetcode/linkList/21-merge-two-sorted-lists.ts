import { ListNode, arrToList } from 'list-help'

const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
  let next: ListNode | null = new ListNode()
  let headM: ListNode | null = list1
  let headN: ListNode | null = list2
  const head: ListNode = next

  while (headM !== null && headN !== null) {
    if (headM !== null && headM.val <= headN.val) {
      next.next = headM
      headM = headM.next
    } else {
      next.next = headN
      headN = headN.next
    }
    next = next.next
  }
  next.next = headM === null ? headN : headM
  return head.next
}

const l1 = arrToList([1, 2, 4])
const l2 = arrToList([1, 3, 4])

let l3 = mergeTwoLists(l1, l2)

while (l3) {
  console.log(l3.val)
  l3 = l3.next
}
