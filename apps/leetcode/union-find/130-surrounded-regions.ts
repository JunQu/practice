class UnionFind {
  parents: number[] = []
  constructor(rowLen: number, colLen: number) {
    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        const idx = row * colLen + col
        this.parents[idx] = idx
      }
    }
    // 制造虚拟节点，方便一次性把边上的合并
    this.parents[colLen * rowLen + 1] = colLen * colLen + 1
  }

  find(index: number) {
    if (this.parents[index] !== index) {
      this.parents[index] = this.find(this.parents[index])
    }
    return this.parents[index]
  }

  union(idxA: number, idxB: number) {
    const parentA = this.find(idxA)
    const parentB = this.find(idxB)
    if (parentA === parentB) {
      return
    }
    this.parents[parentB] = parentA
  }
  isConnected(idxA: number, idxB: number): boolean {
    return this.find(idxA) === this.find(idxB)
  }
}

export const solve = (board: string[][]): void => {
  const rowLen = board.length
  const colLen = board[0].length

  const unionFind = new UnionFind(rowLen, colLen)
  const virtual = rowLen * colLen + 1
  const XSign = 'X'
  const OSign = 'O'

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (board[row][col] === XSign) {
        continue
      }
      const idx = row * colLen + col
      if (row === 0 || row === rowLen - 1 || col === 0 || col === colLen - 1) {
        unionFind.union(virtual, idx)
      }
      if (row < rowLen - 1 && board[row + 1][col] === OSign) {
        unionFind.union(idx, idx + colLen)
      }
      if (col < colLen - 1 && board[row][col + 1] === OSign) {
        unionFind.union(idx, idx + 1)
      }
    }
  }

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (board[row][col] === XSign) {
        continue
      }
      const idx = row * colLen + col
      if (!unionFind.isConnected(virtual, idx)) {
        board[row][col] = XSign
      }
    }
  }
}
