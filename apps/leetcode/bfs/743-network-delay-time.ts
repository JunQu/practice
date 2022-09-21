export const networkDelayTime = (times: number[][], n: number, k: number): number => {
  const maxIN = Number.MAX_SAFE_INTEGER
  // nxn 的矩阵，作为邻接矩阵
  const graph: number[][] = Array(n)
    .fill(1)
    .map(() => new Array(n).fill(maxIN))

  // 遍历边,生成邻接矩阵
  for (const [vertex, end, weight] of times) {
    graph[vertex - 1][end - 1] = weight
  }
  // 保存从 K 节点除法到各个节点的最短路径
  const dist = Array(n).fill(maxIN)
  // 自身的距离为0
  dist[k - 1] = 0
  // 保存访问过的节点，用于对比
  const used = Array<boolean>(n).fill(false)
  // 邻接矩阵的所有点
  for (let i = 0; i < n; i++) {
    let x = -1
    // 从 i 出发到 j , i->j
    // 取出一个未访问过的节点
    // 这里因为是都是正整数，所以离节点越远一半距离越大
    // 同时也会以 K 点作为第一个处理的点，需要不断寻找最小权重的边，一般使用最小顶堆来操作
    for (let j = 0; j < n; j++) {
      if (!used[j] && (x === -1 || dist[j] < dist[x])) {
        x = j
      }
    }
    // 访问该节点
    used[x] = true
    // 这里是寻找以x为起点，到其他点的距离
    for (let y = 0; y < n; y++) {
      // 前一个节点的路径与之前得到的路径选取最小的
      dist[y] = Math.min(dist[y], dist[x] + graph[x][y])
    }
  }
  const min = Math.max(...dist)
  return min === maxIN ? -1 : min
}
