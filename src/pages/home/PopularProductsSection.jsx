import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import addIcon     from '../../assets/images/home/add.svg'
import controlIcon from '../../assets/Icon/control.svg'

import img01 from '../../assets/images/product/product-capsule-anua.png'
import img02 from '../../assets/images/product/product-ampoule-vinote.png'
import img03 from '../../assets/images/product/product-serum-esnature.png'
import img04 from '../../assets/images/product/product-toner-toriden.png'

/* ── 확정 데이터 (변경 금지) ── */
const PRODUCTS = [
  {
    id: 1,
    img: img01,
    name: '아누아',
    detail: '피디알엔 캡슐 100 세럼 50ml 대용량 기획',
    price: '23,500',
    tags: ['Miyu Only', '1+1'],
  },
  {
    id: 2,
    img: img02,
    name: '비노트',
    detail: '물톡스 부스터 앰플 30ml',
    price: '35,900',
    tags: ['Miyu Only', '1+1'],
  },
  {
    id: 3,
    img: img03,
    name: '에스네이처',
    detail: '아쿠아 스쿠알란 세럼 50ml',
    price: '24,000',
    tags: ['Miyu Only', '1+1'],
  },
  {
    id: 4,
    img: img04,
    name: '토리든',
    detail: '다이브인 저분자 히알루론산 토너 300ml',
    price: '7,850',
    tags: ['Miyu Only', '1+1'],
  },
]

function ProductCard({ img, name, detail, price, tags, clickable, productId }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => clickable && navigate(`/product-detail/${productId || name}`)}
      style={{
        width: 120,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: clickable ? 'auto' : 'none',
        cursor: clickable ? 'pointer' : 'default',
      }}
    >
      {/* 제품 이미지 — 카드 패딩 10px 기준 */}
      <div style={{ padding: '10px 10px 0', flexShrink: 0 }}>
        <img
          src={img}
          alt={name}
          draggable={false}
          style={{ width: 100, height: 100, objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* 텍스트 영역 */}
      <div
        style={{
          flex: 1,
          padding: '10px 6px 10px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        {/* 제품명 + 점3개 버튼 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flex: 1 }}>
            {name}
          </p>
          <button style={{ padding: 0, background: 'none', border: 'none', cursor: clickable ? 'pointer' : 'default', flexShrink: 0, pointerEvents: clickable ? 'auto' : 'none', display: 'flex' }}>
            <img src={controlIcon} alt="더보기" style={{ width: 16, height: 16, display: 'block' }} />
          </button>
        </div>

        {/* 세부 내용 — 12px Regular GrayScale 40, 말줄임 */}
        <p style={{ fontSize: 12, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {detail}
        </p>

        {/* 가격 */}
        <p style={{ margin: 0, lineHeight: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#6633CC', lineHeight: 1 }}>{price}</span>
          <span style={{ fontSize: 11, fontWeight: 400, color: '#242227', marginLeft: 1, lineHeight: 1 }}>원</span>
        </p>

        {/* 태그 */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: '#2B0073',
                backgroundColor: '#F8F5FF',
                borderRadius: 4,
                padding: '1px 6px',
                lineHeight: 1.6,
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PopularProductsSection() {
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
    <div>
      {/* 섹션 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 12,
        }}
      >
        <p style={{ fontSize: 19, fontWeight: 600, color: '#242227', margin: 0 }}>
          구르님을 위한 인기 상품
        </p>
        <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={addIcon} alt="더보기" style={{ width: 46, height: 18, display: 'block' }} />
        </button>
      </div>

      {/* 가로 스크롤 카드 리스트 */}
      <div
        ref={scrollRef}
        className="category-scroll"
        style={{
          overflowX: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          paddingLeft: 16,
          paddingRight: 16,
          cursor: 'default',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} {...p} clickable={p.name === '비노트'} productId="vinote" />
          ))}
        </div>
      </div>
    </div>
  )
}
