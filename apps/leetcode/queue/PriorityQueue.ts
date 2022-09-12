type Comparator<T> = (a: T, b: T) => number

// 被堆搞了太多次，这次下决心看了它
export class PriorityQueue<T = number> {
  arr: T[] = []
  comparator: Comparator<T>

  constructor(comparator: Comparator<T>) {
    this.comparator = comparator
  }

  get size() {
    return this.arr.length
  }

  get peek() {
    return this.arr[0]
  }

  get isEmpty() {
    return this.size === 0
  }

  clear() {
    this.arr.length = 0
  }

  add(val: T) {
    this.arr.push(val)
    this.bubbleUp()
  }

  // 移除一个元素
  remove(idx = 0) {
    if (!this.size) {
      return null
    }
    swap(this.arr, idx, this.size - 1)
    const val = this.arr.pop()
    this.bubbleDown(idx)
    return val
  }

  // 添加一个元素后，做上升操作
  bubbleUp() {
    let idx = this.size - 1
    // 这里假定是右子树，对左子树有偏差所以向上取整数
    // 也可以假定是左子树，那么就是 Math.floor((idx-1)/2)
    // 无论左右孩子，都是同一个 parent ，结果是一样的
    const parent = (idx: number) => Math.ceil(idx / 2 - 1)
    while (parent(idx) >= 0 && this.comparator(this.arr[parent(idx)], this.arr[idx]) > 0) {
      swap(this.arr, idx, parent(idx))
      idx = parent(idx)
    }
  }
  // 把删除的元素下沉
  bubbleDown(idx = 0) {
    if (idx < 0 || idx >= this.size) {
      return
    }
    let root = idx
    const left = 2 * root + 1
    const right = left + 1

    if (left < this.size && this.comparator(this.arr[left], this.arr[root]) > 0) {
      root = left
    }
    if (right < this.size && this.comparator(this.arr[right], this.arr[root]) > 0) {
      root = right
    }
    if (idx !== root) {
      // 下沉操作
      swap(this.arr, idx, root)
      // 可能没有下沉到底，再次尝试
      this.bubbleDown(root)
    }
  }
}

const swap = (arr: unknown[], idxA: number, idxB: number): void => {
  let tmp = arr[idxA]
  arr[idxA] = arr[idxB]
  arr[idxB] = tmp
}
