import { it, expect, describe } from 'vitest'
import { shuffle } from './helper'
import { heapsort, heapsort2 } from './heapsort'
import { quicksortInNewPlace, quickSortES, quickSortIterative, quickSortHoare, quickSortLomuto } from './quicksort'

describe('Array Sort Tests', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const arrRepeat = [1, 2, 2, 3, 3, 3, 4, 5, 7, 7, 8, 9, 9, 9, 10]

  const getTestArr = () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]

    return [
      {
        arr: arrShuffled,
        compare: arr,
      },
      {
        arr: shuffle(arr),
        compare: arr,
      },
      {
        arr: shuffle(arr),
        compare: arr,
      },
      {
        arr: shuffle(arr),
        compare: arr,
      },
      {
        arr: shuffle(arrRepeat),
        compare: arrRepeat,
      },
      {
        arr: shuffle(arrRepeat),
        compare: arrRepeat,
      },
    ]
  }

  describe('quicksort tests', () => {
    it('quick in New Place version ', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        const sortedArr = quicksortInNewPlace(testItem.arr)
        expect(sortedArr).toStrictEqual(testItem.compare)
      }
    })

    it('quick in Hoare version ', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        quickSortHoare(testItem.arr)
        expect(testItem.arr).toStrictEqual(testItem.compare)
      }
    })

    it('quick in Lomuto version ', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        quickSortLomuto(testItem.arr)
        expect(testItem.arr).toStrictEqual(testItem.compare)
      }
    })

    it('quick in ES6 version ', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        const arrSorted = quickSortES(testItem.arr)
        expect(arrSorted).toStrictEqual(testItem.compare)
      }
    })

    it('quick in Iterative version ', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        quickSortIterative(testItem.arr)
        expect(testItem.arr).toStrictEqual(testItem.compare)
      }
    })
  })

  describe('Heap sort tests', () => {
    it('heap sort for version ', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        heapsort2(testItem.arr)
        expect(testItem.arr).toStrictEqual(testItem.compare)
      }
    })
    it('heap sort while version', () => {
      for (const testItem of getTestArr()) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        heapsort(testItem.arr)
        expect(testItem.arr).toStrictEqual(testItem.compare)
      }
    })
  })
})
