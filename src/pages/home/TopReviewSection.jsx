import { useState, useRef } from 'react'
import addIcon      from '../../assets/images/home/add.svg'
import heartActive   from '../../assets/Icon/ui/icon-heart-active.svg'
import heartInactive from '../../assets/Icon/ui/icon-heart-inactive.svg'

import imgPartion       from '../../assets/images/product/product-toner-partion.png'
import imgDasiqueCheek  from '../../assets/images/product/product-cheek-dasique.png'
import imgBergamot      from '../../assets/images/product/product-innerbeauty-bergamot-collagen.jpg'
import imgMakeon        from '../../assets/images/product/product-device-makeon.png'
import imgMediheal      from '../../assets/images/product/product-mask-mediheal.png'

const CATEGORIES = ['스킨케어', '메이크업', '이너뷰티', '디바이스', '마스크팩']
// 이너뷰티: id 4(베르가못) / 디바이스: id 5(메이크온)

/* 추후 실제 이미지 및 API 연동 예정 */
const REVIEW_ITEMS = [
  {
    id: 1,
    img: imgPartion,
    brand: '파티온',
    name: '포도당 하이드로 에센스 토너 500ml',
    price: '29,000',
    category: '스킨케어',
    rating: 5,
    reviewText: '평소 피부가 쉽게 건조해지는 편인데, 이 토너는 한 번만 발라도 촉촉함이 꽤 오래 유지돼서 만족스러웠어요. 사실 큰 기대 없이 구매했는데 사용감이 산뜻하고 피부가 편안하게 정돈되는 느낌이 들어 꾸준히 사용 중이에요. 용량도 넉넉해서 화장솜 팩으로 활용하기에도 부담 없어요.',
    date: '2025.10.20',
    author: '김미유',
  },
  {
    id: 2,
    img: imgDasiqueCheek,
    brand: '데이지크',
    name: '블렌딩 무드 치크',
    price: '24,000',
    category: '메이크업',
    rating: 5,
    reviewText: '발색이 자연스럽고 피치 톤이 봄웜 피부에 정말 잘 어울려요. 블렌딩도 쉽고 지속력도 좋아서 매일 사용 중이에요. 민감한 피부에도 자극 없이 편안하게 사용할 수 있어서 만족스러워요.',
    date: '2025.11.05',
    author: '민지유',
  },
  {
    id: 4,
    img: imgBergamot,
    brand: '이너뷰티',
    name: '베르가못 콜라겐 스틱 1박스',
    price: '32,000',
    category: '이너뷰티',
    rating: 5,
    reviewText: '베르가못 향이 상큼해서 매일 챙겨 먹기 좋아요. 피부 탄력이 눈에 띄게 개선됐고 속건조가 줄어든 느낌이에요. 복합성 피부에 안성맞춤인 이너뷰티 제품이에요.',
    date: '2025.12.01',
    author: '피부덕후',
  },
  {
    id: 5,
    img: imgMakeon,
    brand: '메이크온',
    name: '메이크온 디바이스',
    price: '89,000',
    category: '디바이스',
    rating: 5,
    reviewText: '사용한 지 2주 만에 피부 탄력이 확실히 달라졌어요. LED 마스크와 함께 사용하면 시너지가 대단해요. 민감한 피부에도 자극 없이 사용할 수 있어 만족스럽습니다.',
    date: '2025.12.05',
    author: '뷰티러버',
  },
  {
    id: 6,
    img: imgMediheal,
    brand: '메디힐',
    name: '티트리 케어 솔루션 에센셜 마스크',
    price: '12,900',
    category: '마스크팩',
    rating: 5,
    reviewText: '트러블이 올라올 것 같을 때마다 꺼내 쓰는 마스크팩이에요. 티트리 성분이 들어있지만 향이 자극적이지 않고 민감한 피부에도 순하게 잘 맞아요. 20분 정도 올려두면 붉기가 확 가라앉고 피부가 한결 진정되는 느낌이에요. 긴급 진정용으로 강력 추천해요!',
    date: '2025.12.10',
    author: '구르님',
  },
]

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= rating ? '#DAC7FC' : '#F0EFF3'}
          />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ img, brand, name, price, rating, reviewText, date, author }) {
  const [liked, setLiked] = useState(false)
  const [pop,   setPop]   = useState(false)
  const toggle = () => { setLiked(p => !p); setPop(true); setTimeout(() => setPop(false), 300) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* 제품 카드 영역 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <img src={img} alt={name} draggable={false}
          style={{ width: 60, height: 60, objectFit: 'contain', display: 'block', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#5F5C66', margin: 0, lineHeight: 1 }}>{brand}</p>
          <p style={{ fontSize: 12, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</p>
          <p style={{ margin: 0, lineHeight: 1 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#6633CC' }}>{price}</span>
            <span style={{ fontSize: 10, fontWeight: 400, color: '#242227', marginLeft: 1 }}>원</span>
          </p>
        </div>
        <button
          onClick={toggle}
          style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          <img src={liked ? heartActive : heartInactive} alt="좋아요"
            className={pop ? 'heart-pop' : ''}
            style={{ width: 24, height: 24, display: 'block', transition: 'none' }} />
        </button>
      </div>

      {/* 리뷰 영역 (분리된 별도 카드) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '16px 16px',
        }}
      >
        <StarRating rating={rating} />
        <p style={{ fontSize: 13, fontWeight: 400, color: '#5F5C66', margin: '8px 0', lineHeight: 1.5 }}>
          {reviewText}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#9D9AA3', flex: 1 }}>{date}</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#9D9AA3', flex: 1, textAlign: 'right' }}>{author}</span>
        </div>
      </div>
    </div>
  )
}

export default function TopReviewSection() {
  const [selectedCat, setSelectedCat] = useState('스킨케어')
  const tabScrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const didMove = useRef(false)

  const onTabMouseDown = (e) => {
    isDragging.current = true
    didMove.current = false
    startX.current = e.pageX - tabScrollRef.current.offsetLeft
    scrollLeft.current = tabScrollRef.current.scrollLeft
  }
  const onTabMouseMove = (e) => {
    if (!isDragging.current) return
    const x = e.pageX - tabScrollRef.current.offsetLeft
    const walk = x - startX.current
    if (Math.abs(walk) > 3) didMove.current = true
    tabScrollRef.current.scrollLeft = scrollLeft.current - walk
  }
  const onTabMouseUp = () => { isDragging.current = false }

  const filtered = REVIEW_ITEMS.filter(
    (item) => item.category === selectedCat
  )

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
          탑 리뷰어가 작성한 랭킹 아이템
        </p>
        {/* TODO: 더보기 클릭 동작 연동 예정 */}
        <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={addIcon} alt="더보기" style={{ width: 46, height: 18, display: 'block' }} />
        </button>
      </div>

      {/* 카테고리 필터 탭 (가로 드래그 스크롤) */}
      <div
        ref={tabScrollRef}
        className="category-scroll"
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 12,
          cursor: 'grab',
          userSelect: 'none',
        }}
        onMouseDown={onTabMouseDown}
        onMouseMove={onTabMouseMove}
        onMouseUp={onTabMouseUp}
        onMouseLeave={onTabMouseUp}
      >
        {CATEGORIES.map((cat) => {
          const active = selectedCat === cat
          return (
            <button
              key={cat}
              onClick={() => { if (!didMove.current) setSelectedCat(cat) }}
              style={{
                padding: '5px 12px',
                boxSizing: 'border-box',
                borderRadius: 8,
                border: active ? '1px solid transparent' : '1px solid #DAD8DE',
                background: active ? '#6633CC' : 'transparent',
                color: active ? '#FFFFFF' : '#78757D',
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* 리뷰 카드 리스트 */}
      <div style={{ paddingLeft: 16, paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length > 0 ? (
          filtered.map((item) => <ReviewCard key={item.id} {...item} />)
        ) : (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#9D9AA3', padding: '24px 0' }}>
            해당 카테고리 상품이 없어요
          </p>
        )}
      </div>
    </div>
  )
}
