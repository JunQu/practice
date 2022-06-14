import { it, expect, describe } from 'vitest'
import { shuffle } from './helper'
import { heapsort, heapsort2 } from './heapsort'
import { quicksortInNewPlace, quickSortES, quickSortIterative, quickSortHoare, quickSortLomuto } from './quicksort'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrRepeat = [1, 2, 2, 3, 3, 3, 4, 5, 7, 7, 8, 9, 9, 9, 10]

describe('quicksort tests', () => {
  it('quick in New Place version ', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    const arrSorted = quicksortInNewPlace(arrShuffled)
    expect(arrSorted).toStrictEqual(arr)
    expect(arrShuffled).not.toEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      const sortedArr = quicksortInNewPlace(testItem.arr)
      expect(sortedArr).toStrictEqual(testItem.compare)
    }
  })

  it('quick in Hoare version ', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    expect(arrShuffled).not.toEqual(arr)
    quickSortHoare(arrShuffled)
    expect(arrShuffled).toStrictEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      quickSortHoare(testItem.arr)
      expect(testItem.arr).toStrictEqual(testItem.compare)
    }
  })

  it('quick in Lomuto version ', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    expect(arrShuffled).not.toEqual(arr)
    quickSortLomuto(arrShuffled)
    expect(arrShuffled).toStrictEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      quickSortLomuto(testItem.arr)
      expect(testItem.arr).toStrictEqual(testItem.compare)
    }
  })

  it('quick in ES6 version ', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    const sortedArr = quickSortES(arrShuffled)
    expect(sortedArr).toStrictEqual(arr)
    expect(arrShuffled).not.toEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      const arrSorted = quickSortES(testItem.arr)
      expect(arrSorted).toStrictEqual(testItem.compare)
    }
  })

  it('quick in Iterative version ', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    expect(arrShuffled).not.toEqual(arr)
    quickSortIterative(arrShuffled)
    expect(arrShuffled).toStrictEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      quickSortIterative(testItem.arr)
      expect(testItem.arr).toStrictEqual(testItem.compare)
    }
  })
})

describe('Heap sort tests', () => {
  it('heap sort for version ', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    expect(arrShuffled).not.toEqual(arr)
    heapsort2(arrShuffled)
    expect(arrShuffled).toStrictEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      heapsort2(testItem.arr)
      expect(testItem.arr).toStrictEqual(testItem.compare)
    }
  })
  it('heap sort while version', () => {
    const arrShuffled = [7, 10, 6, 3, 9, 1, 5, 2, 4, 8]
    const arrS1 = shuffle(arr)
    const arrS2 = shuffle(arr)
    const arrS3 = shuffle(arr)
    const arrS4 = shuffle(arrRepeat)
    const arrS5 = shuffle(arrRepeat)
    const arrTests = [
      {
        arr: arrS1,
        compare: arr,
      },
      {
        arr: arrS2,
        compare: arr,
      },
      {
        arr: arrS3,
        compare: arr,
      },
      {
        arr: arrS4,
        compare: arrRepeat,
      },
      {
        arr: arrS5,
        compare: arrRepeat,
      },
    ]

    expect(arrShuffled).not.toEqual(arr)
    heapsort(arrShuffled)
    expect(arrShuffled).toStrictEqual(arr)

    for (const testItem of arrTests) {
      expect(testItem.arr).not.toEqual(testItem.compare)
      heapsort(testItem.arr)
      expect(testItem.arr).toStrictEqual(testItem.compare)
    }
  })
})
