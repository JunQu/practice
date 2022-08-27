export const x = (line: string) => {
  const getKim = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K',
    A: 1,
    J: 11,
    Q: 12,
    K: 13,
  }

  const permuteUnique = (nums: number[]): number[][] => {
    if (nums.length < 2) {
      return [nums]
    }
    const collection: number[][] = []
    const backtracking = (nums: number[], track: number[], used: boolean[]) => {
      if (track.length === nums.length) {
        collection.push([...track])
      }
      for (let i = 0; i < nums.length; i++) {
        const isUsed = used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])
        if (!isUsed) {
          track.push(nums[i])
          used[i] = true
          backtracking(nums, track, used)
          track.pop()
          used[i] = false
        }
      }
    }
    backtracking(nums, [], [])
    return collection
  }

  const find24 = (cards: number[], sum: number, operation = ''): boolean | string => {
    if (!cards.length && sum === 24) {
      return operation
    } else if (!cards.length) {
      return false
    }

    let newCard = cards.slice(1)
    let result: boolean | string = false
    if (!result) {
      result = find24(newCard, sum + cards[0], operation + '+')
    }
    if (!result) {
      result = find24(newCard, sum - cards[0], operation + '-')
    }
    if (!result) {
      result = find24(newCard, sum * cards[0], operation + '*')
    }
    if (!result && cards[0] > 0) {
      result = find24(newCard, Math.trunc(sum / cards[0]), operation + '/')
    }
    return result
  }

  const convert = (str = ''): number[] => {
    const nums: number[] = []
    const cards = str.split(' ')
    for (const card of cards) {
      const n = parseInt(card, 10)
      // @ts-ignore
      nums.push(n ? n : (getKim[card] as number))
    }
    return nums
  }

  const getResult = (cards: number[], path = '') => {
    let ret = ''
    for (let i = 0; i < cards.length; i++) {
      // @ts-ignore
      const card = cards[i] === 1 || cards[i] > 10 ? (getKim[cards[i]] as string) : cards[i]
      if (i < cards.length - 1) {
        ret += card + path[i]
      } else {
        ret += card
      }
    }
    return ret
  }

  const main = (line: string) => {
    const isError = line.indexOf('joker') >= 0 || line.indexOf('JOKER') >= 0
    if (isError) {
      console.log('ERROR')
      return
    }
    let result = ''
    const nums = convert(line)
    const cardsAll = permuteUnique(nums)
    for (const cards of cardsAll) {
      let path = find24(cards.slice(1), cards[0], '')
      if (typeof path === 'string') {
        result = getResult(cards, path)
        break
      }
    }
    console.log(result ? result : 'NONE')
  }

  return main(line)
}
