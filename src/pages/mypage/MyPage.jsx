import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import userInactive from '../../assets/Icon/user-inactive.svg'
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
  { label: '나의 피부 데이터', to: '/mypage/skin-data' },
  { label: '마이 뷰티',       to: '/mypage/my-beauty' },
  { label: '루틴 관리',       to: null },
]
const CS_ITEMS     = ['FAQ', '1:1 문의', '앱 설정']

function MenuItem({ label, to, navigate }) {
  return (
    <button
      onClick={() => to && navigate(to)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: to ? 'pointer' : 'default',
        padding: '16px 0',
        fontSize: 16,
        fontWeight: 400,
        color: '#242227',
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
        textAlign: 'left',
      }}
    >
      {label}
    </button>
  )
}

function Section({ title, items, navigate }) {
  const normalize = (item) => typeof item === 'string' ? { label: item, to: null } : item
  return (
    <>
      <div style={{ height: 1, backgroundColor: '#F0EFF3', margin: '8px 0' }} />
      <div style={{ paddingTop: 8 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: '0 0 4px', lineHeight: 1.4 }}>
          {title}
        </p>
        {items.map(item => {
          const { label, to } = normalize(item)
          return <MenuItem key={label} label={label} to={to} navigate={navigate} />
        })}
      </div>
    </>
  )
}

export default function MyPage() {
  const navigate = useNavigate()
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100%' }}>

      {/* 상태바 */}
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />

      {/* 헤더 */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>
          마이페이지
        </span>
      </div>

      {/* 콘텐츠 */}
      <div style={{ padding: '16px 20px 32px' }}>

        {/* 프로필 행 */}
        <div className="stagger stagger-1" onClick={() => navigate('/mypage/profile')} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, cursor: 'pointer' }}>
          {/* 아바타 */}
          <div style={{
            width: 64, height: 64, borderRadius: 99,
            backgroundColor: '#F0EFF3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <img src={userInactive} alt="프로필" style={{ width: 32, height: 32, display: 'block', opacity: 0.45 }} />
          </div>

          {/* 이름 + 뱃지 + 태그 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>
                김구르
              </span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3,
                backgroundColor: '#ECE0FE', borderRadius: 99,
                padding: '3px 8px',
              }}>
                <img src={badgeLv2} alt="LV2" style={{ width: 14, height: 14, display: 'block', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#6633CC', lineHeight: 1 }}>
                  LV2 루키리뷰어
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {SKIN_TAGS.map(tag => (
                <span key={tag} style={{
                  fontSize: 13, fontWeight: 400, color: '#78757D',
                  backgroundColor: '#F4F3F7', borderRadius: 6,
                  padding: '2px 8px', lineHeight: 1.5,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 화살표 */}
          <img src={chevronRight} alt="" style={{ width: 20, height: 20, display: 'block', flexShrink: 0, opacity: 0.45 }} />
        </div>

        {/* 프로필 수정 버튼 */}
        <button className="stagger stagger-2" style={{
          width: '100%', height: 52,
          borderRadius: 14, border: '1.5px solid #6633CC',
          backgroundColor: 'transparent', cursor: 'pointer',
          fontSize: 16, fontWeight: 500, color: '#6633CC',
          letterSpacing: '-0.01em', lineHeight: 1.5,
          marginBottom: 8,
        }}>
          프로필 수정
        </button>

        {/* 메뉴 섹션 */}
        <div className="stagger stagger-3"><Section title="쇼핑 활동" items={SHOPPING_ITEMS} navigate={navigate} /></div>
        <div className="stagger stagger-4"><Section title="나의 뷰티"  items={BEAUTY_ITEMS}  navigate={navigate} /></div>
        <div className="stagger stagger-5"><Section title="고객센터"   items={CS_ITEMS}      navigate={navigate} /></div>
      </div>

    </div>
  )
}
