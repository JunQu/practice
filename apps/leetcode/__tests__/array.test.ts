import { describe, expect, it } from 'vitest'
import { findKthLargest } from '../array/215-kth-largest-element-in-an-array'
import { maxArea } from '../array/11-container-with-most-water'
import { primePartner } from '../array/hj28-prime-partiner'
import { maxEnvelopes } from '../dp/354-russian-doll-envelopes'
import { leastInterval } from '../array/621-task-scheduler'
import { corpFlightBookings } from '../array/1109-corporate-flight-bookings'
import { carPooling } from '../array/1094-car-pooling'
import { merge } from '../array/56-merge-intervals'
import { largestNumber } from '../array/179-largest-number'
import { bulbSwitch } from '../array/319-bulb-switcher'
import { intervalIntersection } from '../array/986-interval-list-intersections'
import { replaceWords } from '../string/648-replace-words'
import { threeSum } from '../array/15-3sum'

describe('Top K th in array', () => {
  it('正常情况', () => {
    const arr = [3, 2, 1, 5, 6, 4]
    const k = 2
    expect(findKthLargest(arr, k)).toBe(5)
  })

  it('重复的情况', () => {
    const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
    const k = 4
    expect(findKthLargest(arr, k)).toBe(4)
  })

  it('超过的情况', () => {
    const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
    const k = 10
    expect(findKthLargest(arr, k)).toBe(1)
  })
})

describe('11 盛最多水的容器', () => {
  it('基础的情况', () => {
    const height1 = [1, 1]
    const height2 = [1, 2, 3]

    expect(maxArea(height1)).toBe(1)
    expect(maxArea(height2)).toBe(2)
  })

  it('更多的容器', () => {
    const height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    const height2 = [5, 6, 7, 4, 5, 10, 2, 3, 6, 9, 11, 5, 7]

    expect(maxArea(height1)).toBe(49)
    expect(maxArea(height2)).toBe(70)
  })
})

it('hj28  素数伴侣  匈牙利算法，最多匹配 ', () => {
  const arr1 = [3, 6]
  const arr2 = [3, 14]
  const arr3 = [2, 5, 6, 13]
  const arr4 = [2, 5, 6, 13, 8, 23]

  expect(primePartner(arr1)).toBe(0)
  expect(primePartner(arr2)).toBe(1)
  expect(primePartner(arr3)).toBe(2)
  expect(primePartner(arr4)).toBe(3)
})

it('354 俄罗斯套娃信封问题', () => {
  const envelopes1 = [
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ]
  const envelopes2 = [
    [1, 1],
    [1, 1],
    [1, 1],
  ]
  const envelopes3 = [
    [1, 3],
    [3, 5],
    [6, 7],
    [6, 8],
    [8, 4],
    [9, 5],
  ]
  const envelopes4 = [
    [10, 8],
    [1, 12],
    [6, 15],
    [2, 18],
  ]
  const envelopes5 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [5, 5],
    [6, 7],
    [7, 8],
  ]

  expect(maxEnvelopes(envelopes1)).toBe(3)
  expect(maxEnvelopes(envelopes2)).toBe(1)
  expect(maxEnvelopes(envelopes3)).toBe(3)
  expect(maxEnvelopes(envelopes4)).toBe(2)
  expect(maxEnvelopes(envelopes5)).toBe(7)
})

it('621 任务调度器', () => {
  const task1 = ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
  const n1 = 2

  const tasks2 = ['A', 'A', 'A', 'B', 'B', 'B']
  const n2 = 0

  const tasks3 = ['A', 'A', 'A', 'B', 'B', 'B']
  const n3 = 2

  const tasks4 = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'D', 'E']
  const n4 = 2

  expect(leastInterval(task1, n1)).toBe(16)
  expect(leastInterval(tasks2, n2)).toBe(6)
  expect(leastInterval(tasks3, n3)).toBe(8)
  expect(leastInterval(tasks4, n4)).toBe(12)
})

// 差分数组的模板
it('1109 航班预订统计', () => {
  const bookings1 = [
    [1, 2, 10],
    [2, 3, 20],
    [2, 5, 25],
  ]
  const n1 = 5
  const ans1 = [10, 55, 45, 25, 25]

  const bookings2 = [
    [3, 3, 5],
    [1, 3, 20],
    [1, 2, 15],
  ]
  const n2 = 3
  const ans2 = [35, 35, 25]

  expect(corpFlightBookings(bookings1, n1)).toEqual(ans1)
  expect(corpFlightBookings(bookings2, n2)).toEqual(ans2)
})

it('1094 拼车', () => {
  const trips1 = [
    [2, 1, 5],
    [3, 3, 7],
  ]
  const capacity1 = 4

  const trips2 = [
    [2, 1, 5],
    [3, 5, 7],
  ]
  const capacity2 = 3

  const trips3 = [
    [9, 0, 1],
    [3, 3, 7],
  ]
  const capacity3 = 4

  expect(carPooling(trips1, capacity1)).toEqual(false)
  expect(carPooling(trips2, capacity2)).toEqual(true)
  expect(carPooling(trips3, capacity3)).toEqual(false)
})

it('56 区间合并', () => {
  const intervals1 = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]
  const ans1 = [
    [1, 6],
    [8, 10],
    [15, 18],
  ]

  const intervals2 = [
    [1, 4],
    [4, 5],
  ]
  const ans2 = [[1, 5]]

  expect(merge(intervals1)).toEqual(ans1)
  expect(merge(intervals2)).toEqual(ans2)
})

it('210 最大数', () => {
  const nums1 = [10, 2]
  const ans1 = '210'

  const nums2 = [3, 30, 34, 5, 9]
  const ans2 = '9534330'

  const nums3 = [4, 1, 9, 8, 4047, 47, 59, 22, 10]
  const ans3 = '9859474404722110'

  expect(largestNumber(nums1)).toEqual(ans1)
  expect(largestNumber(nums2)).toEqual(ans2)
  expect(largestNumber(nums3)).toEqual(ans3)
})

it('319 灯泡开关', () => {
  const n1 = 3
  const n2 = 0
  const n3 = 1

  expect(bulbSwitch(n1)).toEqual(1)
  expect(bulbSwitch(n2)).toEqual(0)
  expect(bulbSwitch(n3)).toEqual(1)
})

it('986 区间列表的交集', () => {
  const firstList1 = [
    [0, 2],
    [5, 10],
    [13, 23],
    [24, 25],
  ]
  const secondList1 = [
    [1, 5],
    [8, 12],
    [15, 24],
    [25, 26],
  ]
  const ans1 = [
    [1, 2],
    [5, 5],
    [8, 10],
    [15, 23],
    [24, 24],
    [25, 25],
  ]

  const firstList2 = [
    [1, 3],
    [5, 9],
  ]
  const secondList2: number[][] = []
  const ans2: number[][] = []

  const firstList3: number[][] = []
  const secondList3 = [
    [4, 8],
    [10, 12],
  ]
  const ans3: number[][] = []

  const firstList4 = [[1, 7]]
  const secondList4 = [[3, 10]]
  const ans4 = [[3, 7]]

  expect(intervalIntersection(firstList1, secondList1)).toEqual(ans1)
  expect(intervalIntersection(firstList2, secondList2)).toEqual(ans2)
  expect(intervalIntersection(firstList3, secondList3)).toEqual(ans3)
  expect(intervalIntersection(firstList4, secondList4)).toEqual(ans4)
})

it('648 单词替换', () => {
  const dictionary1 = ['cat', 'bat', 'rat']
  const sentence1 = 'the cattle was rattled by the battery'
  const ans1 = 'the cat was rat by the bat'

  const dictionary2 = ['a', 'b', 'c']
  const sentence2 = 'aadsfasf absbs bbab cadsfafs'
  const ans2 = 'a a b c'

  expect(replaceWords(dictionary1, sentence1)).toEqual(ans1)
  expect(replaceWords(dictionary2, sentence2)).toEqual(ans2)
})

it('15 三数之和', () => {
  const nums1 = [-1, 0, 1, 2, -1, -4]
  const nums2 = [0, 0, 0, 0, 0]
  const nums3 = [0, 1, 1]

  expect(threeSum(nums1)).toEqual([
    [-1, -1, 2],
    [-1, 0, 1],
  ])
  expect(threeSum(nums2)).toEqual([[0, 0, 0]])
  expect(threeSum(nums3)).toEqual([])
})
