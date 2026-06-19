import { useRef, useState } from 'react'

export default function HorizontalScroll({ children, paddingX = 16, gap = 8 }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    setIsDragging(true)
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }
  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <div
      ref={scrollRef}
      className="category-scroll"
      style={{
        overflowX: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        paddingLeft: paddingX,
        paddingRight: paddingX,
        cursor: 'default',
        userSelect: 'none',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div style={{ display: 'flex', gap, width: 'max-content' }}>
        {children}
      </div>
    </div>
  )
}
