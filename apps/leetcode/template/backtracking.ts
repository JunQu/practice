const condition = false
const result = []

// 遍历整个决策树，选择合适的结果，避免分支过于庞大，需要进行剪枝
// 需要注意的是剪枝操作，比如每一层的剪枝
const backtracking = (arr = [], track = [], list = []) => {
  // 终止条件成立，则return，不再继续遍历决策树
  if (condition) {
    // 这里需要复制，因为 track 是变化的（pop和push使得它是动态的），不复制则可能是最后一次状态
    result.push(...track)
    return
  }

  // list 代表可以选择的元素列表
  // 这里是遍历决策树的各个分支，采用的是深度优先（DFS），类似二叉树进行左右分支的遍历
  for (let i = 0; i < list.length; i++) {
    // 选择当前元素
    track.push(list[i])
    backtracking(arr, track, list.splice(i, 1))
    // 决策树的一个分支遍历完毕，在回到父元素即后序过程，发生回溯
    // 重新的把 track 加入可选的列表,让后面的元素可以进行选择
    track.pop()
    list.splice(i, 0, list[i])
  }
  // 一般没有返回
}
