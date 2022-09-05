import { expect } from 'vitest'
import { mostBooked } from '../weekly/6170-meeting-rooms-iii'
import { getLengthOfWaterfallFlow, minCostToTravelOnDays } from '../weekly/AutoX-contest'

it('6170 meeting rooms iii', () => {
  const meetings1 = [
    [0, 10],
    [1, 5],
    [2, 7],
    [3, 4],
  ]
  const meetings2 = [
    [1, 20],
    [2, 10],
    [3, 5],
    [4, 9],
    [6, 8],
  ]
  const meetings3 = [
    [1, 10],
    [3, 5],
    [15, 20],
    [30, 40],
  ]

  expect(mostBooked(2, meetings1)).toBe(0)
  expect(mostBooked(3, meetings2)).toBe(1)
  expect(mostBooked(2, meetings3)).toBe(0)
})

it('max', () => {
  expect(getLengthOfWaterfallFlow(3, [9, 5, 8, 6])).toBe(11)
  expect(getLengthOfWaterfallFlow(2, [9, 1, 1, 1, 1, 1])).toBe(9)
})

it('minCostToTravelOnDays', () => {
  const arr1 = [1, 2, 3, 4]
  const tickets1 = [
    [1, 3],
    [2, 5],
    [3, 7],
  ]
  const arr2 = [1, 4, 5]

  const tickets2 = [
    [1, 4],
    [5, 6],
    [2, 5],
  ]
  const arr3 = [4, 5, 6, 500000000, 1000000000]

  const tickets3 = [
    [1, 224],
    [2, 318],
    [3, 432],
  ]

  expect(minCostToTravelOnDays(arr1, tickets1)).toBe(10)
  expect(minCostToTravelOnDays(arr2, tickets2)).toBe(6)
  expect(minCostToTravelOnDays(arr3, tickets3)).toBe(880)
})
