import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import statusBarSvg  from '../../assets/Top/Status Bar.svg'
import chevronLeft   from '../../assets/Icon/chevron-left.svg'
import diamondIcon   from '../../assets/Icon/Diamond02.svg'
import toggleSvg     from '../../assets/Icon/Toggle.svg'
import filterSvg     from '../../assets/Icon/filter.svg'
import imgReview01  from '../../assets/images/review/review01.png'
import imgReview02  from '../../assets/images/review/review02.png'
import imgReview03  from '../../assets/images/review/review03.png'
import imgReview04  from '../../assets/images/review/review04.png'
import imgReview05  from '../../assets/images/review/review05.png'
import imgReview06  from '../../assets/images/review/review06.png'
import imgReview07  from '../../assets/images/review/review07.png'

import miyuLogo from '../../assets/logo/logo-icon-square.svg'
import badgeLv1 from '../../assets/Icon/badges/Property 1=badge-lv1-newbie.svg'
import badgeLv3 from '../../assets/Icon/badges/Property 1=badge-lv3-power.svg'
import badgeLv5 from '../../assets/Icon/badges/Property 1=badge-lv5-master.svg'

import ReviewCard from '../../components/review/ReviewCard'

const FILTER_CONFIG = [
  { key: 'rating',   label: '별점',    options: ['5점','4점','3점','2점','1점'] },
  { key: 'type',     label: '후기 유형', options: ['사진 포함','영상 포함','텍스트만'] },
  { key: 'level',    label: '신뢰지수', options: ['Lv.5','Lv.4','Lv.3','Lv.2','Lv.1'] },
  { key: 'skinType', label: '피부타입', options: ['건성','중성','지성','복합성','수부지'] },
  { key: 'concern',  label: '피부고민', options: ['민감성','여드름','아토피','해당없음'] },
  { key: 'tone',     label: '피부톤',   options: ['밝은톤','중간톤','어두운톤','봄웜','여름쿨','가을웜','겨울쿨'] },
  { key: 'period',   label: '사용기간', options: ['일주일','1개월','6개월','1년 이상'] },
  { key: 'age',      label: '연령대',   options: ['10대','20대','30대','40대 이상'] },
  { key: 'gender',   label: '성별',     options: ['여성','남성'] },
]

const REVIEWS_ALL = [
  {
    id: 1, user: '레몬퍼플', badge: badgeLv1, time: '3시간 전',
    tags: ['복합성', '여드름', '가을소프트'], rating: 4, image: imgReview01,
    text: '너무 좋아요..자극1도없고 퍼스트세럼으로 종구 화장전에 바르면 넘 베이스도 잘 먹어요',
    likes: 25, helpful: 32, wishlist: 11,
  },
  {
    id: 2, user: '피부결수집가', badge: badgeLv5, time: '3시간 전',
    tags: ['건성', '민감성', '봄웜', '3개월 사용'], rating: 4, image: imgReview02,
    text: '세럼 유목민으로 드디어 정착할 제품을 찾은 거 같습니다!\n기초단계 첫 단계에서 사용해주고 잘 흡수 시켜주면 피부에 수분감이 팡~ 완전 촉촉해지고 피부에 광이 나요\n끈적임 이런거 하나도 없이 너무 좋네요\n\n제형은 완전 물제형인데 효과는 기대했던 거 보단 훨 좋아요\n\n특히 메이크업 전에 잘 사용만 해준다면 화장도 엄청 잘 먹어요 향도 거의 무향이라 부담스럽지 않게 사용가능합니다',
    likes: 25, helpful: 32, wishlist: 11,
  },
  {
    id: 3, user: '촉촉세럼집착러', badge: badgeLv1, time: '3시간 전',
    tags: ['건성', '민감성', '봄웜', '3개월 사용'], rating: 4, image: imgReview03,
    text: '요즘 피부가 진짜 들쑥날쑥해서 속보습이랑 진정에 좋다는 세럼 써봤어요. 처음엔 그냥 무난하네? 했는데 며칠 쓰다보니까 피부가 훨씬 편안해진 느낌이에요.\n건조해서 땅기던 것도 덜하고, 자극받은 날에도 따갑지 않아서 좋았어요.\n양이 좀 적어서 금방 쓸 것 같긴 한데… 그래도 효과는 확실히 있어서 재구매할 것 같아요.',
    likes: 25, helpful: 32, wishlist: 11,
  },
]

const REVIEWS_MATCHED = [
  {
    id: 4, user: '새벽수분러', badge: badgeLv3, time: '1일 전',
    tags: ['복합성', '민감성', '봄웜', '6개월 사용'], rating: 5, image: imgReview05,
    text: '복합성 민감성 피부인데 거의 모든 세럼에서 자극이 왔었어요. 이건 진짜 달랐어요. 첫날부터 따갑거나 붉어지는 거 없이 순하게 흡수되더라고요.\n특히 건조한 부위에 집중적으로 발라줬는데 다음날 아침에 당기는 느낌이 확 줄어든 게 체감이 됐어요. 향도 거의 없고 발림도 가볍고 부담 없이 매일 쓰고 있습니다.',
    likes: 41, helpful: 58, wishlist: 29,
  },
  {
    id: 5, user: '글로우스킨연구소', badge: badgeLv5, time: '2일 전',
    tags: ['건성', '봄웜', '모공', '1개월 사용'], rating: 4, image: imgReview06,
    text: '평소에 수분크림 없이는 못 살던 피부인데 이 세럼 하나로 레이어링 한 단계가 줄었어요.\n워터리한 텍스처인데 생각보다 보습력이 오래가고, 모공 주변이 당기던 것도 많이 나아진 것 같아요. 아직 한 달밖에 안 됐는데 재구매 리스트에 이미 올려놨습니다.',
    likes: 17, helpful: 23, wishlist: 8,
  },
  {
    id: 6, user: '피치톤스킨', badge: badgeLv1, time: '5일 전',
    tags: ['건성', '민감성', '봄웜', '2주 사용'], rating: 5, image: imgReview07,
    text: '민감성이라 성분 하나하나 다 따지는 편인데 이건 딱히 걸리는 게 없어서 믿고 써봤어요.\n2주 쓰는 동안 트러블도 안 나고 피부 결이 눈에 띄게 부드러워졌어요. 세안 후 바로 바르면 흡수가 정말 빠르고 뒤에 다른 제품도 잘 먹어서 앞으로도 계속 쓸 것 같아요.',
    likes: 9, helpful: 14, wishlist: 6,
  },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function StarRow({ rating, size = 14, fillColor = '#6633CC', emptyColor = '#9169EB', gap = 2 }) {
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

export default function ProductReviewPage() {
  const navigate = useNavigate()
  const [skinMatchOn, setSkinMatchOn] = useState(false)
  const [showFilter, setShowFilter]   = useState(false)
  const [selected, setSelected]       = useState({})
  const [reactions, setReactions]     = useState({})
  const [liked, setLiked]             = useState(false)
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'lv-banner-shimmer'
    style.textContent = `
      @keyframes borderSpin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .lv-banner-stroke {
        position: relative;
        overflow: hidden;
        background: linear-gradient(to right, #B38BFF, #A1B0FF, #D4B8FF);
      }
      .lv-banner-stroke::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        height: 400px;
        margin-top: -200px;
        margin-left: -200px;
        background: conic-gradient(
          from 0deg,
          transparent 0%,
          transparent 60%,
          rgba(255,255,255,0.3) 70%,
          rgba(255,255,255,0.7) 78%,
          rgba(255,255,255,1) 82%,
          rgba(255,255,255,0.7) 86%,
          rgba(255,255,255,0.3) 92%,
          transparent 100%
        );
        filter: blur(6px);
        animation: borderSpin 4s linear infinite;
        z-index: 0;
      }
      .lv-banner-stroke > * {
        position: relative;
        z-index: 1;
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  const BASE_LIKES = 13677


  const toggle = (key, opt) => {
    setSelected(prev => {
      const cur = prev[key] || []
      return { ...prev, [key]: cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt] }
    })
  }
  const isSelected = (key, opt) => (selected[key] || []).includes(opt)
  const resetFilters = () => setSelected({})

  const toggleReaction = (reviewId, label) => {
    setReactions(prev => ({
      ...prev,
      [reviewId]: { ...prev[reviewId], [label]: !prev[reviewId]?.[label] },
    }))
  }

  const currentReviews = skinMatchOn ? REVIEWS_MATCHED : REVIEWS_ALL

  const chipStyle = (active) => ({
    padding: '7px 14px', borderRadius: 8,
    border: active ? '1.5px solid #6633CC' : '1.5px solid #DAD8DE',
    backgroundColor: '#FFFFFF', color: active ? '#6633CC' : '#78757D',
    fontSize: 14, fontWeight: active ? 600 : 400,
    cursor: 'pointer', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF', fontFamily: "'SUIT', sans-serif", letterSpacing: '-0.01em' }}>

      {/* 상태바 */}
      <img src={statusBarSvg} alt="" style={{ width: '100%', display: 'block', flexShrink: 0 }} />

      {/* 헤더 */}
      <div style={{ flexShrink: 0 }}>
        {/* Row 1: 뒤로가기 + 타이틀 (최상단에서 58px) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 11, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
          >
            <img src={chevronLeft} alt="" style={{ width: 28, height: 28, display: 'block' }} />
          </button>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#242227', margin: 0, lineHeight: 1.4 }}>제품 리뷰</p>
        </div>
        {/* Row 2: 내 피부 맞춤 + 토글 (좌) / 필터 (우) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 400, color: '#242227', lineHeight: 1.4 }}>내 피부 맞춤</span>
            <button
              onClick={() => setSkinMatchOn(p => !p)}
              style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexShrink: 0 }}
            >
              {skinMatchOn ? (
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="10" fill="#6633CC"/>
                  <circle cx="22.4" cy="10" r="8" fill="white"/>
                </svg>
              ) : (
                <img src={toggleSvg} alt="" style={{ width: 32, height: 20, display: 'block' }} />
              )}
            </button>
          </div>
          <button onClick={() => setShowFilter(true)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
            <img src={filterSvg} alt="" style={{ width: 36, height: 36, display: 'block' }} />
          </button>
        </div>
      </div>

      {/* 스크롤 콘텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        <AnimatePresence mode="wait">
        <motion.div
          key={skinMatchOn ? 'matched' : 'all'}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >

        {/* AI 분석 카드 */}
        <motion.div variants={fadeUp} style={{ backgroundColor: skinMatchOn ? '#FDFAFF' : '#FAFAFA', borderRadius: 16, marginTop: 0, marginLeft: 20, marginRight: 20, marginBottom: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid #F6F2FF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <img src={miyuLogo} alt="미유" style={{ width: 22, height: 22, display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: 18, fontWeight: 600, color: '#242227', lineHeight: 1 }}>
              {skinMatchOn ? '구르님과 비슷한 피부타입 리뷰 분석' : '전체 피부타입 리뷰 분석'}
            </span>
          </div>

          {skinMatchOn ? (
            <>
              <p style={{ fontSize: 16, fontWeight: 400, color: '#5F5C66', lineHeight: 1.5, margin: 0 }}>
                구르님 피부에는 <span style={{ color: '#9169EB' }}>데일리 진정·속보습용 세럼</span>으로 적합해요. 꾸준히 사용했을 때 피부가 한결 편안해졌다는 후기가 많고, 자극 없이 사용 가능해 민감한 날에도 부담이 적어요.
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, color: '#5F5C66', lineHeight: 1.5, margin: 0 }}>
                <span style={{ color: '#9169EB' }}>가벼운 제형으로 메이크업 전에 잘 어울려요.</span> 화장이 밀리지 않고 베이스가 잘 먹는다는 평가가 많아요.
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 16, fontWeight: 400, color: '#5F5C66', lineHeight: 1.5, margin: 0 }}>
                전반적으로 <span style={{ color: '#9169EB' }}>무겁지 않은데 촉촉하다</span>는 평이 많아요. 리치한 제형을 꺼리는 지성 피부와, 속건조를 잡고 싶어하는 건성 피부 모두를 만족시킨 황금 밸런스라는 평이에요.
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, color: '#5F5C66', lineHeight: 1.5, margin: 0 }}>
                특히 예민한 피부를 가진 분들도 트러블 반응 없이 한 통을 다 비웠다는 <span style={{ color: '#9169EB' }}>순한 사용감</span>에 만족감을 드러내고 있어요.
              </p>
            </>
          )}
        </motion.div>

        {/* 평점 + 리뷰 이미지 */}
        <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginTop: 36, marginBottom: 36 }}>
            {/* 4.5점 + 별 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <div>
                <span style={{ fontSize: 40, fontWeight: 600, color: '#242227', lineHeight: 1 }}>4.5</span>
                <span style={{ fontSize: 18, fontWeight: 400, color: '#5F5C66', lineHeight: 1.4 }}>점</span>
              </div>
              <StarRow rating={4.5} size={16} fillColor="#DAC7FC" emptyColor="#F0EFF3" gap={-2} />
            </div>
            {/* 리뷰 이미지 3개 */}
            <div style={{ display: 'flex', gap: 4 }}>
              {(skinMatchOn ? [imgReview05, imgReview06, imgReview07] : [imgReview01, imgReview02, imgReview03]).map((img, i) => (
                <div key={i} style={{ width: 84, height: 84, borderRadius: 12, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {i === 2 && (
                    <>
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5 }}>더보기</span>
                    </>
                  )}
                </div>
              ))}
            </div>
        </motion.div>

        {/* LV 배너 */}
        <div className="lv-banner-stroke" style={{ margin: '40px 20px 8px', width: 350, boxSizing: 'border-box', borderRadius: 9.5, padding: 1.5 }}>
          <div style={{ height: 42, borderRadius: 8, backgroundColor: '#FFFFFF', padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, }}>
            <img src={diamondIcon} alt="" style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }} />
            <p style={{ fontSize: 14, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5, letterSpacing: '-0.01em' }}><span style={{ color: '#6633CC' }}>리뷰어 등급</span>은 평가 지수를 종합한 활동 데이터입니다</p>
          </div>
        </div>

        {/* 리뷰 목록 */}
        <motion.div variants={fadeUp}>
          {currentReviews.map((r, i) => (
            <div key={r.id}>
              {i > 0 && <div style={{ height: 1, backgroundColor: '#F0EFF3' }} />}
              <div style={{ padding: '20px 16px' }}>
                <ReviewCard {...r} reactions={reactions} toggleReaction={toggleReaction} />
              </div>
            </div>
          ))}
        </motion.div>

        </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 구매 바 */}
      <div style={{ backgroundColor: '#FFFFFF', paddingTop: 16, paddingBottom: 32, paddingLeft: 16, paddingRight: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setLiked(p => !p)}
            style={{ width: 50, height: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, gap: 2 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill={liked ? '#6633CC' : 'none'} stroke={liked ? '#6633CC' : '#78757D'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4, color: '#78757D' }}>{(BASE_LIKES + (liked ? 1 : 0)).toLocaleString()}</span>
          </button>
          <button style={{ width: 300, height: 50, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 17, fontWeight: 600, lineHeight: 1.4, flexShrink: 0 }}>
            구매하기
          </button>
        </div>
      </div>

      {/* 필터 바텀시트 */}
      {showFilter && (
        <>
          <div onClick={() => setShowFilter(false)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: '#FFFFFF', borderRadius: '20px 20px 0 0', maxHeight: '85%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: '#DAD8DE', margin: '12px auto 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px' }}>
              <p style={{ fontSize: 19, fontWeight: 600, color: '#242227', margin: 0 }}>필터</p>
              <button onClick={resetFilters} style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', background: 'none', border: 'none', cursor: 'pointer' }}>초기화</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
              {FILTER_CONFIG.map(({ key, label, options }) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#242227', margin: '0 0 10px' }}>{label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {options.map(opt => (
                      <button key={opt} onClick={() => toggle(key, opt)} style={chipStyle(isSelected(key, opt))}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 20px 28px', borderTop: '1px solid #F0EFF3' }}>
              <button onClick={() => setShowFilter(false)} style={{ width: '100%', height: 52, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>
                적용하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
