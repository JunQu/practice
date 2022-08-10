import { ListNode } from 'list-help'

export const reverseList = (head: ListNode | null): ListNode | null => {
  let list = head
  let prev = null
  while (list) {
    // 缓存 next， 为了仅仅取出第一个
    let tmp = list.next
    // 取出当前的节点
    list.next = prev
    // 指针重新指向头部
    prev = list
    // list 指针向后移动
    list = tmp
  }
  return prev
}
