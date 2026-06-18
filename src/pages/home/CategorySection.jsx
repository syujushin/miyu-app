import { useRef, useState } from 'react'
import imgSkincare      from '../../assets/images/category/category-skincare.png'
import imgMakeup        from '../../assets/images/category/category-makeup.png'
import imgInnerbeauty   from '../../assets/images/category/category-innerbeauty.png'
import imgDevice        from '../../assets/images/category/category-device.png'
import imgTodayMiyu     from '../../assets/images/category/category-today-miyu.png'
import imgMiyuRecommend from '../../assets/images/category/category-miyu-recommend.png'

const CATEGORIES = [
  { label: '스킨케어',  img: imgSkincare,      imgW: 50, imgH: 50, boxSize: 60, fit: 'contain', boxOverflow: 'visible' },
  { label: '메이크업',  img: imgMakeup,        imgW: 50, imgH: 50, boxSize: 60, fit: 'contain', boxOverflow: 'visible' },
  { label: '이너뷰티',  img: imgInnerbeauty,   imgW: 50, imgH: 50, boxSize: 60, fit: 'contain', boxOverflow: 'visible' },
  { label: '디바이스',  img: imgDevice,        imgW: 72, imgH: 72, boxSize: 60, fit: 'cover',   boxOverflow: 'hidden', offsetY: 3 },
  { label: '오늘의미유', img: imgTodayMiyu,    imgW: 50, imgH: 50, boxSize: 60, fit: 'contain', boxOverflow: 'visible' },
  { label: '미유 추천', img: imgMiyuRecommend, imgW: 50, imgH: 50, boxSize: 60, fit: 'contain', boxOverflow: 'visible' },
]

const OVERFLOW_PAD = 20

export default function CategorySection() {
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
    const walk = x - startX.current
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const onMouseUp = () => setIsDragging(false)

  return (
    <div style={{ marginTop: -OVERFLOW_PAD, marginBottom: -4, overflow: 'hidden' }}>
      <div
        ref={scrollRef}
        className="category-scroll"
        style={{
          overflowX: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: OVERFLOW_PAD,
          paddingBottom: 4,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div style={{ display: 'flex', gap: 16, width: 'max-content' }}>
          {CATEGORIES.map(({ label, img, imgW, imgH, boxSize, fit, boxOverflow, offsetY = 0 }) => (
            <button
              key={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                background: 'none',
                border: 'none',
                cursor: 'inherit',
                padding: 0,
                flexShrink: 0,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: boxSize,
                  height: boxSize,
                  borderRadius: 12,
                  backgroundColor: '#FFFFFF',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: boxOverflow,
                  pointerEvents: 'none',
                }}
              >
                <img
                  src={img}
                  alt={label}
                  draggable={false}
                  style={{
                    width: imgW,
                    height: imgH,
                    objectFit: fit,
                    display: 'block',
                    transform: offsetY ? `translateY(${offsetY}px)` : undefined,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#78757D',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
