import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── 더미 리뷰 데이터 ── */
const REVIEWS = [
  {
    id: 1, user: '레몬퍼플', level: 'LV1 뉴비리뷰어', time: '3시간 전',
    skinTags: ['복합성', '여드름', '가을소프트'], rating: 4,
    text: '전반적으로 무겁지 않은데 촉촉하다는 평이 많아요. 리치한 제형의 기름기를 꺼리는 지성 피부와, 속건조를 잡고 싶어하는 건성 피부 모두를 만족시킨 황금 밸런스라는 평이에요.',
    images: [],
  },
  {
    id: 2, user: '미유러버', level: 'LV3 파워리뷰어', time: '1일 전',
    skinTags: ['건성', '민감성', '봄웜'], rating: 5,
    text: '보습력이 정말 좋아요. 건조한 계절에 딱이에요. 향도 거의 없어서 민감한 피부에도 부담 없이 사용했어요.',
    images: [],
  },
  {
    id: 3, user: '스킨덕후', level: 'LV2 루키리뷰어', time: '3일 전',
    skinTags: ['복합성', '모공', '중간톤'], rating: 4,
    text: '자극이 전혀 없었어요. 앰플인데 가볍게 흡수되는 게 마음에 들고 가성비도 좋다고 생각해요.',
    images: [],
  },
]

const FILTER_CONFIG = [
  { key: 'rating',    label: '별점',    options: ['5점','4점','3점','2점','1점'] },
  { key: 'type',      label: '후기 유형', options: ['사진 포함','영상 포함','텍스트만'] },
  { key: 'level',     label: '신뢰지수', options: ['Lv.5','Lv.4','Lv.3','Lv.2','Lv.1'] },
  { key: 'skinType',  label: '피부타입', options: ['건성','중성','지성','복합성','수부지'] },
  { key: 'concern',   label: '피부고민', options: ['민감성','여드름','아토피','해당없음'] },
  { key: 'tone',      label: '피부톤',   options: ['밝은톤','중간톤','어두운톤','봄웜','여름쿨','가을웜','겨울쿨'] },
  { key: 'period',    label: '사용기간', options: ['일주일','1개월','6개월','1년 이상'] },
  { key: 'age',       label: '연령대',   options: ['10대','20대','30대','40대 이상'] },
  { key: 'gender',    label: '성별',     options: ['여성','남성'] },
]

function StarRow({ rating, size = 14, color = '#6633CC' }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= rating ? color : '#E3D4FD'} />
        </svg>
      ))}
    </div>
  )
}

export default function ProductReviewPage() {
  const navigate = useNavigate()
  const [skinMatchOn, setSkinMatchOn] = useState(true)
  const [showFilter, setShowFilter]   = useState(false)
  const [selected, setSelected]       = useState({})

  const toggle = (key, opt) => {
    setSelected(prev => {
      const cur = prev[key] || []
      return { ...prev, [key]: cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt] }
    })
  }
  const isSelected = (key, opt) => (selected[key] || []).includes(opt)
  const resetFilters = () => setSelected({})

  const chipStyle = (active) => ({
    padding: '7px 14px',
    borderRadius: 8,
    border: active ? '1.5px solid #6633CC' : '1.5px solid #DAD8DE',
    backgroundColor: '#FFFFFF',
    color: active ? '#6633CC' : '#78757D',
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF' }}>

      {/* 헤더 */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0EFF3' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
          <button onClick={() => navigate(-1)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', marginLeft: -8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#242227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 600, color: '#242227', margin: 0, letterSpacing: '-0.01em' }}>제품 리뷰</p>
          {/* 내 피부 맞춤 토글 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#242227' }}>내 피부 맞춤</span>
            <button
              onClick={() => setSkinMatchOn(p => !p)}
              style={{
                width: 44, height: 26, borderRadius: 99, border: 'none', cursor: 'pointer',
                backgroundColor: skinMatchOn ? '#6633CC' : '#DAD8DE',
                position: 'relative', transition: 'background-color 0.2s', padding: 0,
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 99, backgroundColor: '#FFFFFF',
                position: 'absolute', top: 3,
                left: skinMatchOn ? 21 : 3,
                transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }} />
            </button>
            <button onClick={() => setShowFilter(true)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', marginRight: -8 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <line x1="4" y1="6" x2="20" y2="6" stroke="#242227" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="4" y1="12" x2="20" y2="12" stroke="#242227" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="4" y1="18" x2="20" y2="18" stroke="#242227" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="9" cy="6" r="2.5" fill="#FFFFFF" stroke="#242227" strokeWidth="1.5"/>
                <circle cx="15" cy="12" r="2.5" fill="#FFFFFF" stroke="#242227" strokeWidth="1.5"/>
                <circle cx="9" cy="18" r="2.5" fill="#FFFFFF" stroke="#242227" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 리뷰 콘텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 100px' }}>

        {/* 전체 피부타입 리뷰 분석 (toggle OFF일 때) */}
        {!skinMatchOn && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #F0EFF3', padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #B38BFF, #D4B8FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14 }}>✨</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242227', margin: 0 }}>전체 피부타입 리뷰 분석</p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 400, color: '#5F5C66', margin: '0 0 10px', lineHeight: 1.6 }}>
              전반적으로 <span style={{ color: '#6633CC', fontWeight: 500 }}>무겁지 않은데 촉촉하다</span>는 평이 많아요. 리치한 제형의 기름기를 꺼리는 지성 피부와, 속건조를 잡고 싶어하는 건성 피부 모두를 만족시킨 황금 밸런스라는 평이에요.
            </p>
            <p style={{ fontSize: 13, fontWeight: 400, color: '#5F5C66', margin: 0, lineHeight: 1.6 }}>
              특히 예민한 피부를 가진 분들도 트러블 반응 없이 한 통을 다 비웠다는 <span style={{ color: '#6633CC', fontWeight: 500 }}>순한 사용감</span>에 만족감을 드러내고 있어요.
            </p>
            {/* 평점 + 이미지 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
              <div>
                <p style={{ fontSize: 28, fontWeight: 800, color: '#6633CC', margin: 0, lineHeight: 1 }}>4.5<span style={{ fontSize: 14, fontWeight: 500 }}>점</span></p>
                <StarRow rating={4} size={13} />
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[null,null].map((_, i) => (
                  <div key={i} style={{ width: 72, height: 72, borderRadius: 8, backgroundColor: '#F0EFF3' }} />
                ))}
                <div style={{ width: 72, height: 72, borderRadius: 8, backgroundColor: '#F0EFF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 12, color: '#78757D', fontWeight: 500 }}>더보기</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 리뷰어 레벨 안내 */}
        <div style={{ backgroundColor: '#F6F2FF', borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14 }}>💎</span>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6633CC', margin: 0 }}>LV. 리뷰어 등급은 평가 지수를 종합한 활동 데이터입니다</p>
        </div>

        {/* 리뷰 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {REVIEWS.map(r => (
            <div key={r.id} style={{ borderBottom: '1px solid #F0EFF3', paddingBottom: 16 }}>
              {/* 작성자 정보 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 99, backgroundColor: '#F0EFF3', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#242227', margin: 0 }}>{r.user}</p>
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#6633CC', backgroundColor: '#F6F2FF', borderRadius: 4, padding: '1px 6px' }}>💎 {r.level}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: '#9D9AA3' }}>{r.time}</span>
                    <span style={{ fontSize: 11, color: '#C1BEC6' }}>·</span>
                    <span style={{ fontSize: 11, color: '#C1BEC6', cursor: 'pointer' }}>신고</span>
                  </div>
                </div>
              </div>
              {/* 피부 태그 */}
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                {r.skinTags.map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 500, color: '#78757D', border: '1px solid #DAD8DE', borderRadius: 4, padding: '2px 7px' }}>{t}</span>
                ))}
              </div>
              {/* 별점 */}
              <div style={{ marginBottom: 8 }}>
                <StarRow rating={r.rating} size={14} />
              </div>
              {/* 리뷰 텍스트 */}
              <p style={{ fontSize: 13, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.6 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 구매하기 버튼 */}
      <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF', padding: '12px 16px 20px', borderTop: '1px solid #F0EFF3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: '0 auto 2px' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#9D9AA3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ fontSize: 10, color: '#9D9AA3', margin: 0 }}>13,677</p>
          </div>
          <button style={{ flex: 1, height: 52, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
            구매하기
          </button>
        </div>
      </div>

      {/* 필터 바텀시트 */}
      {showFilter && (
        <>
          <div onClick={() => setShowFilter(false)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: '#FFFFFF', borderRadius: '20px 20px 0 0', maxHeight: '85%', display: 'flex', flexDirection: 'column' }}>
            {/* 핸들 */}
            <div style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: '#DAD8DE', margin: '12px auto 0' }} />
            {/* 필터 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px' }}>
              <p style={{ fontSize: 19, fontWeight: 600, color: '#242227', margin: 0 }}>필터</p>
              <button onClick={resetFilters} style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', background: 'none', border: 'none', cursor: 'pointer' }}>초기화</button>
            </div>
            {/* 필터 내용 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
              {FILTER_CONFIG.map(({ key, label, options }) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#242227', margin: '0 0 10px' }}>{label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {options.map(opt => (
                      <button key={opt} onClick={() => toggle(key, opt)} style={chipStyle(isSelected(key, opt))}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* 적용 버튼 */}
            <div style={{ padding: '12px 20px 28px', borderTop: '1px solid #F0EFF3' }}>
              <button onClick={() => setShowFilter(false)} style={{ width: '100%', height: 52, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>
                구매하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
