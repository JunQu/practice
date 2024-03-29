import { ListNode } from 'list-help'

const addTwoNumbers = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
  let head = null
  let tail = null
  let carry = 0
  while (l1 || l2) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry
    const digit = sum % 10
    carry = sum > 9 ? 1 : 0
    if (!head || !tail) {
      head = new ListNode(digit)
      tail = head
    } else {
      tail.next = new ListNode(digit)
      tail = tail.next
    }
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }
  if (carry && tail) {
    tail.next = new ListNode(carry)
  }
  return head
}
