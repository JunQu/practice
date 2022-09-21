export const findOrder = (numCourses: number, prerequisites: number[][]): number[] => {
  const inDegree: number[] = Array(numCourses).fill(0)
  // 保存边
  const edges: number[][] = Array(numCourses)
    .fill(1)
    .map(() => [])

  for (const [courseA, courseB] of prerequisites) {
    // courseB -> courseA
    edges[courseB].push(courseA)
    inDegree[courseA] += 1
  }
  // 取出入度为 0 的加入队列
  const queue: number[] = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }
  const path: number[] = []

  while (queue.length) {
    const course = queue.shift()!
    // 已经学过了，不用再学习
    if (path.indexOf(course) >= 0) {
      continue
    }
    // 学习它
    path.push(course)
    // 和它有关联的课程
    for (const inCourse of edges[course]) {
      inDegree[inCourse] -= 1
      if (inDegree[inCourse] === 0) {
        queue.push(inCourse)
      }
    }
  }

  return path.length === numCourses ? path : []
}
