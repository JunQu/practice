import { expect } from 'vitest'
import { networkDelayTime } from '../bfs/743-network-delay-time'
import { kSimilarity } from '../bfs/854-k-similar-strings'
import { canVisitAllRooms } from '../bfs/841-keys-and-rooms'

it('743. 网络延迟时间', () => {
  const times1 = [
    [2, 1, 1],
    [2, 3, 1],
    [3, 4, 1],
  ]
  const n1 = 4
  const k1 = 2

  const times2 = [[1, 2, 1]]
  const n2 = 2
  const k2 = 1

  const times3 = [[1, 2, 1]]
  const n3 = 2
  const k3 = 2

  const times4 = [
    [1, 2, 1],
    [2, 3, 7],
    [1, 3, 4],
    [2, 1, 2],
  ]
  const n4 = 3
  const k4 = 2

  expect(networkDelayTime(times1, n1, k1)).toBe(2)
  expect(networkDelayTime(times2, n2, k2)).toBe(1)
  expect(networkDelayTime(times3, n3, k3)).toBe(-1)
  expect(networkDelayTime(times4, n4, k4)).toBe(6)
})

it('854. 相似度为 K 的字符串', () => {
  const sa1 = 'ab'
  const sa2 = 'ba'

  const sb1 = 'abc'
  const sb2 = 'bca'

  const sc1 = 'abcbca'
  const sc2 = 'ababcc'

  const sd1 = 'abcdeabcdeabcdeabcde'
  const sd2 = 'aaaabbbbccccddddeeee'

  expect(kSimilarity(sa1, sa2)).toBe(1)
  expect(kSimilarity(sb1, sb2)).toBe(2)
  expect(kSimilarity(sc1, sc2)).toBe(1)
  expect(kSimilarity(sd1, sd2)).toBe(8)
})

it('841. 钥匙和房间', () => {
  const rooms1 = [[1], [2], [3], []]
  const rooms2 = [[1, 3], [3, 0, 1], [2], [0]]

  expect(canVisitAllRooms(rooms1)).toBe(true)
  expect(canVisitAllRooms(rooms2)).toBe(false)
})
