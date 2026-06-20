import { useRef, useState, useEffect } from 'react'

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

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let startTouchX = 0
    let startTouchY = 0
    let isHorizontal = null
    const onTouchStart = (e) => {
      startTouchX = e.touches[0].clientX
      startTouchY = e.touches[0].clientY
      isHorizontal = null
    }
    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - startTouchX
      const dy = e.touches[0].clientY - startTouchY
      if (isHorizontal === null) isHorizontal = Math.abs(dx) > Math.abs(dy)
      if (isHorizontal) {
        e.preventDefault()
        el.scrollLeft -= dx
        startTouchX = e.touches[0].clientX
      }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

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
