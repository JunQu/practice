class ListNode {
  val: number
  next: null | ListNode

  constructor(value?: number, next?: null | ListNode) {
    this.val = typeof value === 'undefined' ? 0 : value
    this.next = typeof next === 'undefined' ? null : next
  }
}

class MyLinkedList {
  head: ListNode | null
  size: number

  constructor(val?: number) {
    this.head = val !== undefined ? new ListNode(val) : null
    this.size = this.head === null ? 0 : 1
  }

  getNode(index: number): ListNode | null {
    if (index < 0 || index >= this.size) {
      return null
    }
    if (!this.head) {
      return null
    }
    let node = this.head
    let idx = 0

    while (idx < index) {
      node = node.next!
      idx += 1
    }

    return node
  }

  get(index: number): number {
    let node = this.getNode(index)
    return node ? node.val : -1
  }

  addAtHead(val: number): void {
    let node = new ListNode(val)
    node.next = this.head
    this.head = node
    this.size += 1
  }

  addAtTail(val: number): void {
    const newNode = new ListNode(val)
    // 头节点都不存在
    if (!this.head) {
      this.head = newNode
    } else {
      // 在尾部插入节点
      let node = this.getNode(this.size - 1)
      node!.next = newNode
    }
    this.size += 1
  }

  addAtIndex(index: number, val: number): void {
    if (index <= 0) {
      // 小于 0 插入头节点前面
      this.addAtHead(val)
      return
    }
    if (index > this.size) {
      return
    }
    // 中间部分
    let node = this.getNode(index - 1)!
    node.next = new ListNode(val, node.next)
    this.size += 1
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      return
    }
    // 删除的是头节点
    if (index === 0) {
      if (this.head) {
        this.head = this.head.next
        this.size -= 1
      }
      return
    }
    // 删除其他节点
    let prevNode = this.getNode(index - 1)!
    prevNode.next = prevNode.next!.next
    this.size -= 1
  }
  printList() {
    let node = this.head
    let str = ''
    while (node) {
      str = str + '->' + node.val
      node = node.next
    }
    console.log(str)
  }
}

const list = new MyLinkedList()
list.addAtIndex(1, 0)
console.log(list.get(0))
list.printList()
