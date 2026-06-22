import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import profileSvg   from '../../assets/images/review/Profile.svg'
import badgeLv2     from '../../assets/Icon/badges/Property 1=badge-lv2-rookie.svg'
import chevronRight from '../../assets/Icon/ui/icon-chevron-right.svg'

const SKIN_TAGS = ['건성', '복합성', '봄웜브라이트']

const SHOPPING_ITEMS = [
  '주문/배송 확인',
  '재입고 알림',
  '쿠폰/포인트',
  '내가 쓴 리뷰',
  '좋아요 상품 보기',
]
const BEAUTY_ITEMS = [
  { label: '마이 루틴',       to: '/mypage/my-beauty', guideId: 'mypage-my-routine' },
  { label: '나의 피부 데이터', to: '/mypage/skin-data', guideId: 'mypage-skin-data' },
  { label: '루틴 관리',       to: null },
]
const CS_ITEMS     = ['FAQ', '1:1 문의', '앱 설정']

function MenuItem({ label, to, navigate, guideId }) {
  return (
    <button
      data-guide-id={guideId}
      onClick={() => to && navigate(to)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: to ? 'pointer' : 'default',
        padding: 0,
        fontSize: 15,
        fontWeight: 400,
        color: '#242227',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        textAlign: 'left',
      }}
    >
      {label}
    </button>
  )
}

function Section({ title, items, navigate, noDivider }) {
  const normalize = (item) => typeof item === 'string' ? { label: item, to: null } : item
  return (
    <>
      {!noDivider && <div style={{ height: 1, backgroundColor: '#F0EFF3', margin: '24px -20px' }} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.4 }}>
          {title}
        </p>
        {items.map(item => {
          const { label, to, guideId } = normalize(item)
          return <MenuItem key={label} label={label} to={to} navigate={navigate} guideId={guideId} />
        })}
      </div>
    </>
  )
}

export default function MyPage() {
  const navigate = useNavigate()
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* 고정 헤더 */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#FFFFFF' }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
        <div style={{ height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#242227', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
            마이페이지
          </span>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div style={{ padding: '0 20px 32px' }}>

        {/* 프로필 행 */}
        <div data-guide-id="mypage-profile" className="stagger stagger-1" onClick={() => navigate('/mypage/profile')} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, cursor: 'pointer' }}>
          {/* 프로필 이미지 */}
          <img src={profileSvg} alt="프로필" style={{ width: 68, height: 68, borderRadius: 99, display: 'block', flexShrink: 0 }} />

          {/* 이름 + 뱃지 + 태그 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: '#242227', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                김구르
              </span>
              <img src={badgeLv2} alt="LV2" style={{ display: 'block', flexShrink: 0 }} />
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {SKIN_TAGS.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 400, color: '#78757D',
                  lineHeight: 1.5, letterSpacing: '-0.01em',
                  backgroundColor: '#F7F6F9', borderRadius: 2, padding: '0 4px', height: 17, display: 'inline-flex', alignItems: 'center',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 화살표 */}
          <img src={chevronRight} alt="" style={{ width: 20, height: 20, display: 'block', flexShrink: 0 }} />
        </div>

        {/* 프로필 수정 버튼 */}
        <button className="stagger stagger-2" style={{
          width: 358, height: 50,
          borderRadius: 12, border: '0.5px solid #6633CC',
          backgroundColor: 'transparent', cursor: 'pointer',
          fontSize: 15, fontWeight: 500, color: '#6633CC',
          letterSpacing: '-0.01em', lineHeight: 1.5,
          marginBottom: 40, display: 'block',
        }}>
          프로필 수정
        </button>

        {/* 메뉴 섹션 */}
        <div className="stagger stagger-3"><Section title="쇼핑 활동" items={SHOPPING_ITEMS} navigate={navigate} noDivider /></div>
        <div className="stagger stagger-4"><Section title="나의 뷰티"  items={BEAUTY_ITEMS}  navigate={navigate} /></div>
        <div className="stagger stagger-5"><Section title="고객센터"   items={CS_ITEMS}      navigate={navigate} /></div>
      </div>

    </div>
  )
}
