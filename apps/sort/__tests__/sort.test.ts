import { it, expect, describe } from 'vitest'
import { shuffle } from '../src/helper'
import { heapsort, heapsort2 } from '../src/heapsort'
import { quicksortInNewPlace, quickSortES, quickSortIterative, quickSortHoare, quickSortLomuto } from '../src/quicksort'
import { selectionsort } from '../src/selectionsort'
import { bubblesort } from '../src/bubblesort'
import { insertsort } from '../src/insertsort'
import { mergeSortBottomUp, mergesort } from '../src/mergesort'
import { shellsort } from '../src/shellsort'
import { countingsourt } from '../src/countingsourt'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type SortFunc = (arr: number[], ...args: any[]) => number[] | void

describe('Array Sort Tests', () => {
  const arr = [...''.padEnd(100)].map((_, i) => i + 1)
  const arrRepeat = [1, 2, 2, 3, 3, 3, 4, 5, 7, 7, 8, 9, 9, 9, 10]

  const getTestArr = () => {
    const arrSorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]

    return [
      {
        arr: arrShuffled,
        compare: arrSorted,
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

  const testSortFunc = (sortFunc: SortFunc, isVoid = true, ...args: number[]): void => {
    for (const testItem of getTestArr()) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      const sortedArr = sortFunc(testItem.arr, ...args)
      if (isVoid) {
        expect(testItem.arr).toStrictEqual(testItem.compare)
      } else {
        expect(sortedArr).toStrictEqual(testItem.compare)
      }
    }
  }

  describe('quicksort tests', () => {
    it('quick in Hoare version ', () => {
      testSortFunc(quickSortHoare)
    })

    it('quick in Lomuto version ', () => {
      testSortFunc(quickSortLomuto)
    })
    it('quick in Iterative version ', () => {
      testSortFunc(quickSortIterative)
    })

    it('quick in ES6 version ', () => {
      testSortFunc(quickSortES, false)
    })

    it('quick in New Place version ', () => {
      testSortFunc(quicksortInNewPlace, false)
    })
  })

  describe('Heap sort tests', () => {
    it('heap sort while version', () => {
      testSortFunc(heapsort)
    })

    it('heap sort for version ', () => {
      testSortFunc(heapsort2)
    })
  })

  describe('selection sort tests', () => {
    it('section sort', () => {
      testSortFunc(selectionsort)
    })
  })

  describe('bubble sort tests', () => {
    it('bubble sort', () => {
      testSortFunc(bubblesort)
    })
  })

  describe('insert sort tests', () => {
    it('insert sort basic', () => {
      testSortFunc(insertsort)
    })
  })

  describe('merge sort tests', () => {
    it('merge sort return new array', () => {
      testSortFunc(mergesort, false)
    })

    it('merge sort changed item in place', () => {
      testSortFunc(mergeSortBottomUp)
    })
  })

  describe('shell sort tests', () => {
    it('shell sort basic', () => {
      testSortFunc(shellsort)
    })
  })

  describe('distribution sorts tests', () => {
    it('shell sort basic', () => {
      for (const testItem of getTestArr().slice(1)) {
        expect(testItem.arr).not.toEqual(testItem.compare)
        const sortedArr = countingsourt(testItem.arr, 100)
        expect(sortedArr).toStrictEqual(testItem.compare)
      }
    })
  })
})
