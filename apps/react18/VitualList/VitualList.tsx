import './style.css'
import { type UIEvent, useEffect, useRef, useState } from 'react'

type Item = {
  id: number
  value: string | number
}

export const VirtualList = ({ items = [], itemHeight = 200 }: { items: Item[]; itemHeight: number }) => {
  const [screenHeight, setScreenHeight] = useState<number>(0)
  const [startOffset, setStartOffset] = useState(0)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState<number>(itemHeight)

  const listHeight = items.length
  const visibleCount = Math.ceil(screenHeight / itemHeight)
  const getTransform = `translate3d(0,${startOffset}px,0)`
  const visibleData = items.slice(start, Math.min(items.length, end))

  const listRef = useRef<HTMLDivElement>(null)

  const scrollEvent = (e: UIEvent<HTMLDivElement>) => {
    console.log(listRef)

    const scrollTop = listRef.current!.scrollTop
    setStart(Math.floor(scrollTop / itemHeight))
    setEnd(start + visibleCount)
    setStartOffset(scrollTop - (scrollTop % itemHeight))
  }

  useEffect(() => {
    const el = document.getElementById('root')!
    setScreenHeight(el.clientHeight)
    setStart(0)
    setEnd(start + visibleCount)
  }, [])

  return (
    <div ref={listRef} onScroll={scrollEvent} className="infinite-list-container">
      <div className="infinite-list-phantom" style={{ height: listHeight + 'px' }} />
      <div className="infinite-list" style={{ transform: getTransform }}>
        <div className="infinite-list-item">
          {visibleData.map((item) => {
            return (
              <div
                style={{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }}
                key={item.id}
                className="infinite-list-item"
              >
                {item.value}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
