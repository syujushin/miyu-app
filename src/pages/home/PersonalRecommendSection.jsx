import { useState } from 'react'
import addIcon      from '../../assets/images/home/add.svg'
import heartActive   from '../../assets/Icon/ui/icon-heart-active.svg'
import heartInactive from '../../assets/Icon/ui/icon-heart-inactive.svg'

import img07 from '../../assets/images/product/product-cream-estra.png'
import img08 from '../../assets/images/product/product-blusher-vdl.png'
import img09 from '../../assets/images/product/product-tint-amuse.png'

/* 추후 실제 이미지로 교체 예정 */
const PRODUCTS = [
  { id: 1, img: img07, brand: '에스트라',  name: '아토베리어365 크림 80ml',         price: '33,000', tags: ['Miyu Only', '1+1'] },
  { id: 2, img: img08, brand: 'VDL',       name: '치크스테인 블러셔 01 바운딩 피치', price: '12,900', tags: ['Miyu Only', '1+1'] },
  { id: 3, img: img09, brand: '어뮤즈',    name: '듀 틴트 04 포멜로 누드',           price: '20,000', tags: ['Miyu Only', '1+1'] },
]

/* 흰색 카드 358×108(허그), padding 8px 4px */
function ProductListCard({ img, brand, name, price, tags }) {
  const [liked, setLiked] = useState(false)

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* 제품 이미지 100×100 */}
      <img
        src={img}
        alt={name}
        draggable={false}
        style={{ width: 100, height: 100, objectFit: 'contain', flexShrink: 0, display: 'block' }}
      />

      {/* 텍스트 — gap 2px, 태그와의 간격 8px */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#5F5C66', margin: 0, lineHeight: 1 }}>
          {brand}
        </p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {name}
        </p>
        <p style={{ margin: 0, lineHeight: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#6633CC' }}>{price}</span>
          <span style={{ fontSize: 11, fontWeight: 400, color: '#242227', marginLeft: 1 }}>원</span>
        </p>
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10, fontWeight: 500, color: '#2B0073',
                backgroundColor: '#F8F5FF', borderRadius: 4,
                padding: '1px 6px', lineHeight: 1.6, whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 하트 토글 */}
      <button
        onClick={() => setLiked(!liked)}
        style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
      >
        <img src={liked ? heartActive : heartInactive} alt="좋아요"
          style={{ width: 24, height: 24, display: 'block' }} />
      </button>
    </div>
  )
}

export default function PersonalRecommendSection() {
  return (
    <div>
      {/* 헤더 */}
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
          구르님을 위한 맞춤 추천
        </p>
        {/* TODO: 더보기 클릭 동작 연동 예정 */}
        <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={addIcon} alt="더보기" style={{ width: 46, height: 18, display: 'block' }} />
        </button>
      </div>

      {/* 카드 리스트 (세로 고정, 스크롤 없음) */}
      <div style={{ paddingLeft: 16, paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PRODUCTS.map((p) => (
          <ProductListCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
