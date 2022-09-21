export const canVisitAllRooms = (rooms: number[][]): boolean => {
  if (!rooms.length) {
    return true
  }
  const queue: number[][] = []
  const visited: boolean[] = Array(rooms.length).fill(false)
  let count = 0

  // 准备进入的房间
  queue.push(rooms[0])
  visited[0] = true
  count += 1

  while (queue.length) {
    const room = queue.shift()!
    if (!room?.length) {
      continue
    }
    if (count === rooms.length) {
      return true
    }
    for (const key of room) {
      // 如果还没进去过 那就去试试
      if (!visited[key]) {
        visited[key] = true
        count += 1
        queue.push(rooms[key])
      }
    }
  }

  return count === rooms.length
}

export const canVisitAllRoomsDFS = (rooms: number[][]): boolean => {
  if (!rooms.length) {
    return true
  }
  const visited = Array(rooms.length).fill(false)
  let count = 0

  const dfs = (rooms: number[][], key = 0) => {
    if (count === rooms.length || key >= rooms.length) {
      return
    }
    visited[key] = true
    count += 1
    for (const roomKey of rooms[key]) {
      if (!visited[roomKey]) {
        dfs(rooms, roomKey)
      }
    }
  }

  dfs(rooms, 0)

  return count === rooms.length
}
