export const countStudents = (students: number[], sandwiches: number[]): number => {
  let ate = Array(students.length).fill(false)
  // 因为是移动到队尾，则学生的相对位置其实没变，只是有些出了队列
  for (const sandwich of sandwiches) {
    let j = 0
    // 已经拿了三明治的，或者放弃拿三明治的都跳过
    while ((ate[j] || students[j] !== sandwich) && j < students.length) {
      j += 1
    }
    // 所有人都放弃拿三明治，或者所有人已经拿到三明治的情况
    if (j === students.length) {
      break
    } else {
      // 让当前的人拿三明治
      ate[j] = true
    }
  }
  // 计算没有拿到三明治的人
  return ate.filter((student) => !student).length
}
