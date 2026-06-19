import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logoMain     from '../../assets/logo/Top/Logo.svg'
import iconSearch   from '../../assets/Icon/ui/icon-search.svg'
import iconNotif    from '../../assets/Icon/ui/icon-notification.svg'
import iconCart     from '../../assets/Icon/ui/icon-cart.svg'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import imgVinote    from '../../assets/images/product/product-ampoule-vinote.png'

import badgeLv4 from '../../assets/Icon/badges/Property 1=badge-lv4-pro.svg'
import badgeLv2 from '../../assets/Icon/badges/Property 1=badge-lv2-rookie.svg'

const REVIEWS_PREVIEW = [
  {
    id: 1, user: '촉촉세럼집착러', badge: badgeLv4, level: 'LV4 프로리뷰어',
    time: '3시간 전', tags: ['건성', '민감성', '3개월 사용'], rating: 4,
    text: '요즘 피부가 진짜 들쑥날쑥해서 속보습이랑 진정에 좋다는 세럼 유목민으로 어쩔 쓰다보니 피부가 훨씬 편안해진 느낌이에요.\n건조해서 밀당이 심했는데, 자극감은 없도 다감고 않아서 좋아요.',
    likes: 25, helpful: 32, wishlist: 11,
    images: [imgVinote, imgVinote],
  },
  {
    id: 2, user: '피부궁수집가', badge: badgeLv2, level: 'LV2 루키리뷰어',
    time: '3시간 전', tags: ['건성', '민감성', '3개월 사용'], rating: 4,
    text: '세럼 유목민으로 드디어 정착할 제품을 찾은 것 같습니다!\n기초단계 첫 단계에서 사용해주고 잠 좀 시켜주면 피부에 수분감이 팍~ 완전 촉촉해지고 피부 장이 나도 공격적인 이런거 하나도 없이 너무 좋아요',
    likes: 25, helpful: 32, wishlist: 11,
    images: [imgVinote],
  },
]

const TOGETHER_PRODUCTS = [
  { name: '에스네이처 아쿠아 오아시스...', price: '24,000', img: null },
  { name: '아누아 피디알엔 캡슐...', price: '23,500원', img: null },
  { name: '에스네이처 스쿠알란...', price: '23,500원', img: null },
  { name: '아떼 비건 릴리프...', price: '34,000원', img: null },
]

function StarRow({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= rating ? '#6633CC' : '#E3D4FD'} />
        </svg>
      ))}
    </div>
  )
}

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('review')
  const [liked, setLiked] = useState(false)

  const TAB = { borderBottom: '2px solid #6633CC', color: '#6633CC', fontWeight: 600 }
  const TAB_OFF = { borderBottom: '2px solid transparent', color: '#9D9AA3', fontWeight: 400 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF' }}>

      {/* ── 상단 헤더 ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#FFFFFF' }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 8 }}>
          <button onClick={() => navigate('/')} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <img src={logoMain} alt="miyu" style={{ width: 84, height: 29, display: 'block' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[{ src: iconSearch, alt: '검색' }, { src: iconNotif, alt: '알림' }, { src: iconCart, alt: '장바구니' }].map(({ src, alt }) => (
              <button key={alt} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <img src={src} alt={alt} style={{ width: 28, height: 28 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 스크롤 콘텐츠 ── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* 제품 히어로 이미지 */}
        <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={imgVinote} alt="비노트" draggable={false}
            style={{ width: '60%', height: '60%', objectFit: 'contain', filter: 'drop-shadow(0 8px 32px rgba(167,120,240,0.5))' }} />
        </div>

        {/* ── 제품 기본 정보 ── */}
        <div style={{ padding: '20px 16px 0' }}>
          <p style={{ fontSize: 13, fontWeight: 400, color: '#78757D', margin: '0 0 4px' }}>비노트</p>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#242227', margin: '0 0 6px', lineHeight: 1.4 }}>비노트 물톡스 부스터 앰플 30ml</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#6633CC', margin: '0 0 10px' }}>35,900원</p>
          <button
            onClick={() => navigate('/product-review/vinote')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <StarRow rating={4} size={14} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#242227' }}>4.5</span>
            <span style={{ fontSize: 13, fontWeight: 400, color: '#9D9AA3' }}>4,351개의 리뷰 &gt;</span>
          </button>
        </div>

        {/* ── 피부 적합도 ── */}
        <div style={{ margin: '16px 16px 0', borderRadius: 16, background: 'linear-gradient(135deg, #7733FF 0%, #BB99FF 100%)', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14 }}>✨</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>구르님의 피부 적합도 <span style={{ fontSize: 20 }}>98%</span></p>
          </div>
          <p style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.88)', margin: 0, lineHeight: 1.6 }}>
            피부 보습에 도움을 주는 35개의 성분과 수분 증발을 차단해주는 성분이 1개 포함되어 있어 구르님처럼 건성 피부에 적합한 제품입니다.<br />
            비슷한 피부 타입을 가진 다른 소비자들의 리뷰 평가도 4.5점 이상으로 구르님께 적합한 제품으로 예상됩니다.
          </p>
        </div>

        {/* ── 탭 바 ── */}
        <div style={{ display: 'flex', borderBottom: '1px solid #F0EFF3', marginTop: 20 }}>
          {[{ key: 'info', label: '제품정보' }, { key: 'review', label: '리뷰' }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{ flex: 1, height: 44, fontSize: 15, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em', ...(activeTab === key ? TAB : TAB_OFF) }}
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
          <div style={{ padding: '16px 16px 0' }}>
            {/* 리뷰 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242227', margin: 0 }}>총 4,351건 리뷰</p>
              <button style={{ fontSize: 13, color: '#9D9AA3', background: 'none', border: 'none', cursor: 'pointer' }}>더보기 &gt;</button>
            </div>

            {/* 리뷰 쓰기 */}
            <button
              style={{ width: '100%', height: 46, borderRadius: 10, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 15, fontWeight: 600, marginBottom: 20 }}
            >
              리뷰 쓰기
            </button>

            {/* 평점 분포 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 36, fontWeight: 800, color: '#242227', margin: 0, lineHeight: 1 }}>4.5<span style={{ fontSize: 14, fontWeight: 500, color: '#78757D' }}>점</span></p>
                <StarRow rating={4} size={16} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[['5점', 0.72], ['4점', 0.18], ['3점', 0.06], ['2점', 0.02], ['1점', 0.02]].map(([label, ratio]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, color: '#78757D', width: 24 }}>{label}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 99, backgroundColor: '#F0EFF3' }}>
                      <div style={{ width: `${ratio * 100}%`, height: '100%', borderRadius: 99, backgroundColor: '#6633CC' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 리뷰 이미지 */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 20, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: '#F0EFF3', flexShrink: 0, overflow: 'hidden' }}>
                  <img src={imgVinote} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              <div style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: '#F0EFF3', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#78757D', margin: 0 }}>더보기</p>
              </div>
            </div>

            {/* 리뷰 목록 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {REVIEWS_PREVIEW.map(r => (
                <div key={r.id} style={{ borderBottom: '1px solid #F0EFF3', paddingBottom: 20 }}>
                  {/* 작성자 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 99, backgroundColor: '#F0EFF3', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#242227', margin: 0 }}>{r.user}</p>
                        <img src={r.badge} alt={r.level} style={{ height: 18, display: 'block' }} />
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 11, color: '#9D9AA3' }}>{r.time}</span>
                        <span style={{ fontSize: 11, color: '#C1BEC6' }}>·</span>
                        <span style={{ fontSize: 11, color: '#C1BEC6', cursor: 'pointer' }}>신고</span>
                      </div>
                    </div>
                  </div>
                  {/* 피부 태그 */}
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                    {r.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, color: '#78757D', border: '1px solid #DAD8DE', borderRadius: 4, padding: '2px 7px' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ marginBottom: 8 }}><StarRow rating={r.rating} size={14} /></div>
                  {/* 리뷰 이미지 */}
                  {r.images.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                      {r.images.slice(0,2).map((img, i) => (
                        <div key={i} style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', backgroundColor: '#F0EFF3' }}>
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: 13, color: '#242227', margin: '0 0 12px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{r.text}</p>
                  {/* 반응 */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { label: '임용이기요', count: r.likes },
                      { label: '도움돼요', count: r.helpful },
                      { label: '써보고싶어요', count: r.wishlist },
                    ].map(({ label, count }) => (
                      <button key={label} style={{ padding: '5px 10px', borderRadius: 99, border: '1px solid #DAD8DE', backgroundColor: '#FFFFFF', fontSize: 11, color: '#78757D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {label} <span style={{ fontWeight: 600, color: '#242227' }}>{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 → 리뷰 페이지 */}
            <button
              onClick={() => navigate('/product-review/vinote')}
              style={{ width: '100%', height: 46, borderRadius: 10, backgroundColor: '#F6F2FF', border: 'none', cursor: 'pointer', color: '#6633CC', fontSize: 14, fontWeight: 600, margin: '12px 0 24px' }}
            >
              리뷰 전체보기
            </button>

            {/* 함께 구매한 제품 */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0 }}>다른 고객들과 함께 구매한 제품</p>
                <button style={{ fontSize: 12, color: '#9D9AA3', background: 'none', border: 'none', cursor: 'pointer' }}>더보기 &gt;</button>
              </div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {TOGETHER_PRODUCTS.map((p, i) => (
                  <div key={i} style={{ width: 100, flexShrink: 0 }}>
                    <div style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: '#F0EFF3', marginBottom: 6 }} />
                    <p style={{ fontSize: 11, color: '#242227', margin: '0 0 2px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{p.name}</p>
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
          <button onClick={() => setLiked(p => !p)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
