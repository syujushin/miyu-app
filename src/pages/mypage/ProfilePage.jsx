import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import arrowBack    from '../../assets/Icon/ui/icon-arrow-back.svg'
import userInactive from '../../assets/Icon/user-inactive.svg'
import badgeLv2     from '../../assets/Icon/badges/Property 1=badge-lv2-rookie.svg'
import chevronRight from '../../assets/Icon/ui/icon-chevron-right.svg'

const STATS = [
  { label: '상품 구매', value: 102 },
  { label: '상품 리뷰', value: 61 },
  { label: '리뷰 평가', value: 113 },
]

const REVIEW_CATEGORIES = [
  { name: '메이크업', review: 47, rating: 40 },
  { name: '스킨케어', review: 30, rating: 24 },
  { name: '헤어케어', review: 11, rating: 15 },
  { name: '바디케어', review: 11, rating: 21 },
  { name: '뷰티소품', review: 17, rating: 13 },
]

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F7F6F9', minHeight: '100%' }}>

      {/* 상태바 */}
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />

      {/* 헤더 */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
        >
          <img src={arrowBack} alt="뒤로" style={{ width: 28, height: 28, display: 'block' }} />
        </button>
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: 17, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em',
        }}>
          프로필
        </span>
      </div>

      {/* 콘텐츠 */}
      <div style={{ padding: '8px 16px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* 프로필 카드 */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '28px 20px 20px' }}>
          {/* 아바타 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{
              width: 88, height: 88, borderRadius: 99,
              backgroundColor: '#F0EFF3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={userInactive} alt="프로필" style={{ width: 44, height: 44, display: 'block', opacity: 0.4 }} />
            </div>
          </div>

          {/* 이름 */}
          <p style={{ fontSize: 22, fontWeight: 700, color: '#242227', textAlign: 'center', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
            김구르
          </p>

          {/* 현재 등급 + 뱃지 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 400, color: '#78757D' }}>현재등급</span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              backgroundColor: '#6633CC', borderRadius: 99,
              padding: '4px 10px',
            }}>
              <img src={badgeLv2} alt="LV2" style={{ width: 14, height: 14, display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', lineHeight: 1 }}>
                LV2 루키리뷰어
              </span>
            </div>
          </div>

          {/* 레벨 프로그레스 바 */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ height: 6, borderRadius: 99, backgroundColor: '#F0EFF3', overflow: 'hidden' }}>
              <div style={{
                width: '68%', height: '100%',
                background: 'linear-gradient(90deg, #6633CC, #9169EB)',
                borderRadius: 99,
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3' }}>LV2</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3' }}>LV3</span>
            </div>
          </div>

          {/* 레벨업 안내 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: '#F7F6F9', borderRadius: 10, padding: '10px 14px',
            marginTop: 4,
          }}>
            <span style={{ fontSize: 13, fontWeight: 400, color: '#242227', lineHeight: 1.5, flex: 1 }}>
              <span style={{ fontWeight: 600, color: '#6633CC' }}>평가 점수 32점</span>
              {' '}추가 달성 시{' '}
              <span style={{ fontWeight: 600, color: '#6633CC' }}>레벨 업</span>
              {' '}🔺
            </span>
            <span style={{
              fontSize: 12, fontWeight: 500, color: '#78757D',
              backgroundColor: '#FFFFFF', borderRadius: 99,
              padding: '4px 10px', whiteSpace: 'nowrap',
              border: '1px solid #F0EFF3',
            }}>
              1만원 쿠폰 증정
            </span>
          </div>
        </div>

        {/* 통계 카드 */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '20px 0',
          display: 'flex',
        }}>
          {STATS.map(({ label, value }, i) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid #F0EFF3' : 'none',
              padding: '0 12px',
            }}>
              <p style={{ fontSize: 13, fontWeight: 400, color: '#9D9AA3', margin: '0 0 6px', lineHeight: 1.4 }}>{label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: '#6633CC', margin: 0, lineHeight: 1 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* 내가 쓴 리뷰 */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>내가 쓴 리뷰</span>
          <img src={chevronRight} alt="" style={{ width: 18, height: 18, display: 'block', opacity: 0.35 }} />
        </div>

        {/* 내가 받은 리뷰 평가 */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '18px 20px' }}>
          {/* 헤더 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>내가 받은 리뷰 평가</span>
            <img src={chevronRight} alt="" style={{ width: 18, height: 18, display: 'block', opacity: 0.35 }} />
          </div>

          {/* 카테고리 행 */}
          {REVIEW_CATEGORIES.map(({ name, review, rating }, i) => (
            <div key={name}>
              {i > 0 && <div style={{ height: 1, backgroundColor: '#F0EFF3' }} />}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0',
              }}>
                <span style={{ fontSize: 15, fontWeight: 400, color: '#242227' }}>{name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#9D9AA3' }}>
                    리뷰 <span style={{ fontWeight: 700, color: '#6633CC' }}>{review}</span>
                  </span>
                  <div style={{ width: 1, height: 12, backgroundColor: '#DAD8DE' }} />
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#9D9AA3' }}>
                    평가 <span style={{ fontWeight: 700, color: '#6633CC' }}>{rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
