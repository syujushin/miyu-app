import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import arrowBack    from '../../assets/Icon/ui/icon-arrow-back.svg'
import waterDrop    from '../../assets/images/home/home-water-drop.png'
import logoIcon     from '../../assets/logo/logo-icon-square.svg'
import imgMakeon    from '../../assets/images/product/product-device-makeon.png'

/* ── 데이터 ── */
const METRICS = [
  { label: '수분', score: 56 },
  { label: '유분', score: 67 },
  { label: '탄력', score: 43 },
]
const SKIN_TYPE_CHIPS  = ['복합성 피부', '건조함', '민감성', '모공']
const EXCLUDE_CHIPS    = ['향료', '리모넨']
const PERSONAL_CHIPS   = ['봄웜라이트', '살몬코랄', '로즈베이지']
const SKIN_SCORE       = 66

/* ── 도넛 차트 ── */
function DonutChart({ score, size = 96 }) {
  const sw = 7
  const r  = size / 2 - sw / 2
  const C  = 2 * Math.PI * r
  const progress = (score / 100) * C
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F0EFF3" strokeWidth={sw} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke="url(#skinGrad)"
        strokeWidth={sw}
        strokeLinecap="butt"
        strokeDasharray={`${progress} ${C}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6633CC" />
          <stop offset="100%" stopColor="#9169EB" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── 칩 ── */
function Chip({ label, color = '#6633CC', bg = '#F0E9FF' }) {
  return (
    <span style={{
      fontSize: 13, fontWeight: 400, color,
      backgroundColor: bg, borderRadius: 99,
      padding: '4px 12px', lineHeight: 1.5,
    }}>
      {label}
    </span>
  )
}

/* ── 섹션 카드 제목 ── */
function CardTitle({ children }) {
  return (
    <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: '0 0 14px', lineHeight: 1.4 }}>
      {children}
    </p>
  )
}

export default function MyBeautyPage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F7F6F9', minHeight: '100%' }}>

      {/* 상태바 */}
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />

      {/* 헤더 */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
        <button onClick={() => navigate(-1)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
          <img src={arrowBack} alt="뒤로" style={{ width: 28, height: 28, display: 'block' }} />
        </button>
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: 17, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em',
        }}>
          마이 뷰티
        </span>
      </div>

      <div style={{ padding: '8px 16px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── 오늘의 피부 점수 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
            <img src={logoIcon} alt="miyu" style={{ width: 20, height: 20, borderRadius: 6, display: 'block' }} />
            <CardTitle>오늘의 피부 점수</CardTitle>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* 도넛 */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <DonutChart score={SKIN_SCORE} size={96} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: '#6633CC', lineHeight: 1 }}>{SKIN_SCORE}</span>
                  <span style={{ fontSize: 11, fontWeight: 400, color: '#242227' }}>점</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 400, color: '#9D9AA3', marginTop: 2 }}>피부 점수</span>
              </div>
            </div>

            {/* 수분/유분/탄력 바 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {METRICS.map(({ label, score }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 400, color: '#5F5C66' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#6633CC', lineHeight: 1 }}>{score}</span>
                      <span style={{ fontSize: 10, fontWeight: 400, color: '#242227' }}>점</span>
                    </div>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, backgroundColor: '#F0EFF3', overflow: 'hidden' }}>
                    <div style={{
                      width: `${score}%`, height: '100%',
                      background: 'linear-gradient(90deg, #6633CC, #9169EB)',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 음수량 */}
          <div style={{
            marginTop: 16,
            backgroundColor: '#F7F6F9', borderRadius: 12,
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <img src={waterDrop} alt="음수량" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', margin: '0 0 2px' }}>오늘 음수량</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#6633CC', lineHeight: 1 }}>1,250</span>
                <span style={{ fontSize: 11, fontWeight: 400, color: '#78757D' }}>ml / 2L</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 11, fontWeight: 400, color: '#9D9AA3', margin: '10px 0 0', textAlign: 'right' }}>
            11/29 측정
          </p>
        </div>

        {/* ── 나의 피부 정보 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <CardTitle>나의 피부 정보</CardTitle>

          {/* 피부 타입 */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', margin: '0 0 8px' }}>피부 타입 · 고민</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {SKIN_TYPE_CHIPS.map(c => <Chip key={c} label={c} />)}
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: '#F0EFF3', marginBottom: 14 }} />

          {/* 퍼스널 컬러 */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', margin: '0 0 8px' }}>퍼스널 컬러</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {PERSONAL_CHIPS.map(c => <Chip key={c} label={c} color="#6633CC" bg="#F0E9FF" />)}
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: '#F0EFF3', marginBottom: 14 }} />

          {/* 제외 성분 */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', margin: '0 0 8px' }}>제외 성분</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {EXCLUDE_CHIPS.map(c => <Chip key={c} label={c} color="#78757D" bg="#F4F3F7" />)}
            </div>
          </div>
        </div>

        {/* ── 나의 디바이스 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <CardTitle>나의 디바이스</CardTitle>
          <div style={{
            backgroundColor: '#F7F6F9', borderRadius: 12,
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <img src={imgMakeon} alt="메이크온 디바이스" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#242227', margin: '0 0 2px' }}>LG 프라엘 LED 마스크</p>
              <p style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', margin: 0 }}>사용 중</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
