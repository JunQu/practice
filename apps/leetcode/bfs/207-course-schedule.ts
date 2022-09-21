export const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
  // 每门课程的入度，至存数量
  const inDegree: number[] = Array(numCourses).fill(0)
  // 存下每门课程需要的先完成的课程，这里存了具体的课程号
  const edges: number[][] = Array(numCourses)
    .fill(1)
    .map(() => [])

  for (const [course, need] of prerequisites) {
    edges[need].push(course)
    inDegree[course] += 1
  }
  let visited = 0
  const queue: number[] = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }
  // 寻找入度为 0 的节点加入队列
  // 访问队列节点，并把它相邻节点的入度减一（修完当前课程）
  while (queue.length) {
    const course = queue.shift()!
    visited += 1
    for (const edge of edges[course]) {
      inDegree[edge] -= 1
      if (inDegree[edge] === 0) {
        queue.push(edge)
      }
    }
  }

  return visited === numCourses
}
