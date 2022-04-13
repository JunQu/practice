// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  let head = null
  let tail = null
  let carry = 0
  while (l1 || l2) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry
    const digit = sum % 10
    carry = sum > 9 ? 1 : 0
    if (!head) {
      head = new ListNode(digit)
      tail = head
    } else {
      tail.next = new ListNode(digit)
      tail = tail.next
    }
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }
  if (carry) {
    tail.next = new ListNode(carry)
  }
  return head
}

console.log(addTwoNumbers([2, 4, 3]))
