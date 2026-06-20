import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logoMain     from '../../assets/logo/Top/Logo.svg'
import logoIcon     from '../../assets/logo/logo-icon-square.svg'
import chevronRight from '../../assets/Icon/ui/icon-chevron-right.svg'
import iconSearch   from '../../assets/Icon/ui/icon-search.svg'
import iconNotif    from '../../assets/Icon/ui/icon-notification.svg'
import iconCart     from '../../assets/Icon/ui/icon-cart.svg'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import imgVinote    from '../../assets/images/product/product-ampoule-vinote.png'
import imgHero      from '../../assets/images/review/review-bnote.png'
import imgProfile   from '../../assets/images/review/Profile.svg'
import imgReview01  from '../../assets/images/review/review01.png'
import imgReview02  from '../../assets/images/review/review02.png'
import imgReview03  from '../../assets/images/review/review03.png'
import imgReview04  from '../../assets/images/review/review04.png'

import badgeLv4 from '../../assets/Icon/badges/Property 1=badge-lv4-pro.svg'
import badgeLv2 from '../../assets/Icon/badges/Property 1=badge-lv2-rookie.svg'

import imgTonerEsnature  from '../../assets/images/product/product-toner-esnature-oasis.png'
import imgCapsuleAnua    from '../../assets/images/product/product-capsule-anua.png'
import imgCreamEsnature  from '../../assets/images/product/product-cream-esnature-squalane.webp'
import imgSuncreamAtte   from '../../assets/images/product/product-suncream-atte.webp'

const REVIEWS_PREVIEW = [
  {
    id: 1, user: '촉촉세럼집착러', badge: badgeLv4, level: 'LV4 프로리뷰어',
    time: '3시간 전', tags: ['건성', '민감성', '봄웜', '3개월 사용'], rating: 4,
    text: '요즘 피부가 진짜 들쑥날쑥해서 속보습이랑 진정에 좋다는 세럼 써봤어요. 처음엔 그냥 무난하네? 했는데 며칠 쓰다보니까 피부가 훨씬 편안해진 느낌이에요.\n건조해서 땅기던 것도 덜하고, 자극받은 날에도 따갑지 않아서 좋았어요.\n양이 좀 적어서 금방 쓸 것 같긴 한데… 그래도 효과는 확실히 있어서 재구매할 것 같아요.',
    likes: 25, helpful: 32, wishlist: 11,
    images: [imgReview01],
  },
  {
    id: 2, user: '피부궁수집가', badge: badgeLv2, level: 'LV2 루키리뷰어',
    time: '3시간 전', tags: ['건성', '민감성', '3개월 사용'], rating: 4,
    text: '세럼 유목민으로 드디어 정착할 제품을 찾은 것 같습니다!\n기초단계 첫 단계에서 사용해주고 잠 좀 시켜주면 피부에 수분감이 팍~ 완전 촉촉해지고 피부 장이 나도 공격적인 이런거 하나도 없이 너무 좋아요',
    likes: 25, helpful: 32, wishlist: 11,
    images: [imgReview02],
  },
]

const TOGETHER_PRODUCTS = [
  { name: '에스네이처 아쿠아 오아시스 토너 300ml', price: '24,000원', img: imgTonerEsnature },
  { name: '아누아 피디알엔 캡슐 100 세럼 50ml 대용량 기획', price: '23,500원', img: imgCapsuleAnua },
  { name: '에스네이처 아쿠아 스쿠알란 수분크림 60ml', price: '23,500원', img: imgCreamEsnature },
  { name: '아떼 비건 릴리프 무기자차 민감피부 선크림 50ml', price: '34,000원', img: imgSuncreamAtte },
]

function StarRow({ rating, size = 14, fillColor = '#6633CC', emptyColor = '#E3D4FD', gap = 2 }) {
  return (
    <div style={{ display: 'flex' }}>
      {[1,2,3,4,5].map((i, idx) => {
        const filled = rating >= i
        const half = !filled && rating >= i - 0.5
        const clipId = `star-clip-${size}-${i}`
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
            style={{ display: 'block', marginLeft: idx === 0 ? 0 : gap }}>
            {half && (
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
            )}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={emptyColor} />
            {(filled || half) && (
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={fillColor} clipPath={half ? `url(#${clipId})` : undefined} />
            )}
          </svg>
        )
      })}
    </div>
  )
}

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('review')
  const [liked, setLiked] = useState(false)
  const [pop,   setPop]   = useState(false)
  const toggleLike = () => { setLiked(p => !p); setPop(true); setTimeout(() => setPop(false), 300) }

  const TAB = { borderBottom: '1px solid #242227', color: '#242227', fontWeight: 600 }
  const TAB_OFF = { borderBottom: '1px solid transparent', color: '#242227', fontWeight: 400 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF', letterSpacing: '-0.01em' }}>

      {/* ── 상단 헤더 ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#FFFFFF' }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>
          <button onClick={() => navigate('/')} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <img src={logoMain} alt="miyu" style={{ width: 84, height: 29, display: 'block' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[{ src: iconSearch, alt: '검색' }, { src: iconNotif, alt: '알림' }, { src: iconCart, alt: '장바구니' }].map(({ src, alt }) => (
              <button key={alt} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <img src={src} alt={alt} style={{ width: 28, height: 28, display: 'block' }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 스크롤 콘텐츠 ── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* 제품 히어로 이미지 */}
        <div style={{ width: '100%', height: 390, overflow: 'hidden', flexShrink: 0 }}>
          <img src={imgHero} alt="비노트 물톡스 부스터 앰플" draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* ── 제품 기본 정보 ── */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* 브랜드 + 이름 + 가격 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 16, fontWeight: 400, color: '#78757D', lineHeight: 1.4 }}>비노트</span>
            <span style={{ fontSize: 20, fontWeight: 600, color: '#242227', lineHeight: 1.5 }}>물톡스 부스터 앰플 30ml</span>
            <span style={{ lineHeight: 1.5 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#6633CC' }}>35,900</span>
              <span style={{ fontSize: 20, fontWeight: 400, color: '#6633CC' }}>원</span>
            </span>
          </div>
          {/* 리뷰 행 */}
          <button
            onClick={() => navigate('/product-review/vinote')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <StarRow rating={4.5} size={14} fillColor="#C0A3F7" emptyColor="#F0EFF3" gap={-2} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#C0A3F7', lineHeight: 1.7 }}>4.5</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
              <span style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.5 }}>4,351개의 리뷰</span>
              <img src={chevronRight} alt="" style={{ width: 14, height: 14, display: 'block' }} />
            </div>
          </button>
        </div>

        {/* 구분선 */}
        <div style={{ height: 1, backgroundColor: '#F4F3F7' }} />

        {/* ── 피부 적합도 ── */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* 헤더 행: 로고 + 텍스트 + 퍼센트 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <img src={logoIcon} alt="miyu" style={{ width: 22, height: 22, borderRadius: 6, display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: 18, fontWeight: 600, color: '#242227', lineHeight: 1, letterSpacing: '-0.01em' }}>
              구르님과의 피부 적합도
            </span>
            <span style={{ fontSize: 20, color: '#6633CC', lineHeight: 1 }}>
  <span style={{ fontWeight: 800 }}>98</span><span style={{ fontWeight: 700 }}>%</span>
</span>
          </div>
          {/* 프로그레스 바 — 전체 350×4, 채움 343×4 */}
          <div style={{ width: 350, height: 4, borderRadius: 99, backgroundColor: '#F0EFF3', overflow: 'hidden' }}>
            <div style={{ width: 343, height: '100%', background: 'linear-gradient(90deg, #BB99FF, #7733FF)' }} />
          </div>
          {/* 설명 텍스트 */}
          <p style={{ fontSize: 16, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1.5 }}>
            피부 보습에 도움을 주는 35개의 성분과 수분 증발을 차단해주는 성분이 1개 포함되어 있어 구르님처럼 건성 피부에 적합한 제품입니다.<br />
            비슷한 피부 타입을 가진 다른 소비자들의 리뷰 평가도 4.5점 이상으로 구르님께 적합한 제품으로 예상됩니다.
          </p>
        </div>

        {/* 구분선 */}
        <div style={{ height: 1, backgroundColor: '#F4F3F7' }} />

        {/* ── 탭 바 ── */}
        <div style={{ display: 'flex' }}>
          {[{ key: 'info', label: '제품정보' }, { key: 'review', label: '리뷰' }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => key !== 'info' && setActiveTab(key)}
              style={{ width: 195.5, height: 53, fontSize: 16, lineHeight: 1.4, background: 'none', border: 'none', cursor: key === 'info' ? 'default' : 'pointer', letterSpacing: '-0.01em', ...(activeTab === key ? TAB : TAB_OFF) }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'info' && (
          <div style={{ padding: 16 }}>
            <p style={{ fontSize: 14, color: '#78757D', lineHeight: 1.6, margin: 0 }}>
              비노트 물톡스 부스터 앰플은 히알루론산 성분을 고농축으로 담아 피부 속 수분을 채워주는 기능성 앰플입니다.<br /><br />
              피부 장벽을 강화하고 건조함을 케어하는 데 도움을 드립니다.
            </p>
          </div>
        )}

        {activeTab === 'review' && (
          <div style={{ padding: '0 20px' }}>
            {/* 리뷰 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, marginBottom: 12 }}>
              <p style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/product-review/vinote')}>
                <span style={{ fontSize: 16, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>총 </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#9169EB', lineHeight: 1.5 }}>4,351</span>
                <span style={{ fontSize: 16, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>건 리뷰</span>
              </p>
              <button onClick={() => navigate('/product-review/vinote')} style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.5 }}>더보기</span>
                <img src={chevronRight} alt="" style={{ width: 14, height: 14, display: 'block' }} />
              </button>
            </div>

            {/* 리뷰 쓰기 */}
            <button
              style={{ width: 351, height: 50, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 600, lineHeight: 1.5, marginBottom: 20 }}
            >
              리뷰 쓰기
            </button>

            {/* 평점 분포 + 리뷰 이미지 묶음 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8, paddingBottom: 32 }}>

              {/* 평점 분포 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', height: 84 }}>
                {/* 4.5점 + 별 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                  <div>
                    <span style={{ fontSize: 40, fontWeight: 600, color: '#242227', lineHeight: 1 }}>4.5</span>
                    <span style={{ fontSize: 18, fontWeight: 400, color: '#5F5C66', lineHeight: 1.4 }}>점</span>
                  </div>
                  <StarRow rating={4.5} size={16} fillColor="#DAC7FC" emptyColor="#F0EFF3" gap={-2} />
                </div>
                {/* 구분선 */}
                <div style={{ width: 0.5, height: 46, backgroundColor: '#DAD8DE', flexShrink: 0 }} />
                {/* 세로 바 차트 */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {[{h:34,l:'5점'},{h:30,l:'4점'},{h:15,l:'3점'},{h:6,l:'2점'},{h:2,l:'1점'}].map(({h, l}) => (
                    <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 4, height: 46, backgroundColor: '#F0EFF3', borderRadius: 99, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
                        <div style={{ width: 4, height: h, backgroundColor: '#6633CC' }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.5 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 리뷰 이미지 */}
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', justifyContent: 'center', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {[imgReview01, imgReview02, imgReview03, imgReview04].map((img, i) => (
                <div key={i} style={{ width: 84, height: 84, borderRadius: 12, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {i === 3 && (
                    <>
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: '#FFFFFF' }}>더보기</span>
                    </>
                  )}
                </div>
              ))}
              </div>

            </div>{/* 평점 분포 + 리뷰 이미지 묶음 끝 */}

            {/* 리뷰 목록 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {REVIEWS_PREVIEW.map(r => (
                <div key={r.id} style={{ borderBottom: '1px solid #F0EFF3', paddingBottom: 24, marginBottom: 24 }}>
                  {/* 작성자 헤더 */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <img src={imgProfile} alt="프로필" style={{ width: 58, height: 58, borderRadius: 99, flexShrink: 0, display: 'block' }} />
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: 58, justifyContent: 'space-between' }}>
                      {/* 닉네임 + 뱃지 + 시간/신고 */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ fontSize: 16, fontWeight: 500, color: '#242227', lineHeight: 1 }}>{r.user}</span>
                        <img src={r.badge} alt={r.level} style={{ height: 19, display: 'block', flexShrink: 0 }} />
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                          <span style={{ fontSize: 10, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.7 }}>{r.time}</span>
                          <div style={{ width: 0.3, height: 10, backgroundColor: '#DAD8DE' }} />
                          <span style={{ fontSize: 10, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.7, cursor: 'pointer' }}>신고</span>
                        </div>
                      </div>
                      {/* 피부 태그 */}
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {r.tags.map(t => (
                          <span key={t} style={{ fontSize: 11, fontWeight: 400, color: '#78757D', lineHeight: 1.5, borderRadius: 4, padding: '0 4px', backgroundColor: '#F7F6F9' }}>{t}</span>
                        ))}
                      </div>
                      {/* 별점 */}
                      <StarRow rating={r.rating} size={12} fillColor="#C0A3F7" emptyColor="#DAD8DE" gap={-1} />
                    </div>
                  </div>
                  {/* 리뷰 이미지 */}
                  {r.images.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                      {r.images.map((img, i) => (
                        <div key={i} style={{ width: 80, height: 80, borderRadius: 10, overflow: 'hidden', backgroundColor: '#F0EFF3', flexShrink: 0 }}>
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 리뷰 텍스트 */}
                  <p style={{ fontSize: 16, fontWeight: 400, color: '#5F5C66', margin: '0 0 14px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{r.text}</p>
                  {/* 반응 버튼 */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { label: '믿음이가요', count: r.likes },
                      { label: '도움돼요', count: r.helpful },
                      { label: '써보고싶어요', count: r.wishlist },
                    ].map(({ label, count }) => (
                      <button key={label} style={{ padding: '6px 12px', borderRadius: 99, border: '1px solid #DAD8DE', backgroundColor: '#FFFFFF', fontSize: 12, fontWeight: 400, color: '#78757D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        {label} <span style={{ fontWeight: 600, color: '#5F5C66' }}>{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 함께 구매한 제품 */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0 }}>다른 고객들과 함께 구매한 제품</p>
                <button style={{ fontSize: 12, color: '#9D9AA3', background: 'none', border: 'none', cursor: 'pointer' }}>더보기 &gt;</button>
              </div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {TOGETHER_PRODUCTS.map((p, i) => (
                  <div key={i} style={{ width: 100, flexShrink: 0 }}>
                    <div style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: '#F0EFF3', marginBottom: 6, overflow: 'hidden' }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <p style={{ fontSize: 11, color: '#242227', margin: '0 0 2px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#6633CC', margin: 0 }}>{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 하단 구매 바 ── */}
      <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF', padding: '12px 16px 20px', borderTop: '1px solid #F0EFF3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={toggleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <svg className={pop ? 'heart-pop' : ''} width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill={liked ? '#6633CC' : 'none'} stroke={liked ? '#6633CC' : '#9D9AA3'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 10, color: '#9D9AA3', marginTop: 2 }}>13,677</span>
          </button>
          <button style={{ flex: 1, height: 52, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  )
}
