import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import arrowBack    from '../../assets/Icon/ui/icon-arrow-back.svg'
import chevronRight from '../../assets/Icon/chevron-right.svg'
import bgSvg        from '../../assets/Icon/background.svg'
import waterDrop      from '../../assets/images/home/home-water-drop.png'
import iconWater      from '../../assets/Icon/icon-water.png'
import nightImg       from '../../assets/Icon/night.png'
import checkBox       from '../../assets/Icon/Routine/CheckBox.svg'
import unCheckBox     from '../../assets/Icon/Routine/unCheckBox.svg'
import iconClose      from '../../assets/Icon/ui/icon-close.svg'
import logoIcon          from '../../assets/logo/logo-icon-square.svg'
import imgMakeon         from '../../assets/images/product/product-device-makeon.png'
import imgBergamot       from '../../assets/images/product/product-innerbeauty-bergamot-collagen.jpg'
import imgToriden        from '../../assets/images/product/product-toner-toriden.png'
import imgEsnatureSerum  from '../../assets/images/product/product-serum-esnature.png'
import imgEstra          from '../../assets/images/product/product-cream-estra.png'

/* ── 애니메이션 variants ── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}

/* ── 체크 축하 파티클 ── */
const PARTICLES = [
  { angle: 0,   dist: 40, color: '#7733FF', size: 7 },
  { angle: 45,  dist: 40, color: '#BB99FF', size: 7 },
  { angle: 90,  dist: 40, color: '#CEB7FA', size: 7 },
  { angle: 135, dist: 40, color: '#A1B0FF', size: 7 },
  { angle: 180, dist: 40, color: '#6633CC', size: 7 },
  { angle: 225, dist: 40, color: '#F0C8E8', size: 7 },
  { angle: 270, dist: 40, color: '#B38BFF', size: 7 },
  { angle: 315, dist: 40, color: '#9169EB', size: 7 },
]
function CheckParticles({ active }) {
  return (
    <AnimatePresence>
      {active && PARTICLES.map(({ angle, dist, color, size }, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, x: Math.cos(rad) * dist, y: Math.sin(rad) * dist }}
            transition={{ duration: 0.38, ease: 'easeOut', delay: i * 0.008 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              marginTop: -(size / 2), marginLeft: -(size / 2),
              width: size, height: size, borderRadius: '50%',
              backgroundColor: color, pointerEvents: 'none', zIndex: 20,
            }}
          />
        )
      })}
    </AnimatePresence>
  )
}

/* ── 데이터 ── */
const METRICS = [
  { label: '수분', score: 56 },
  { label: '유분', score: 67 },
  { label: '탄력', score: 43 },
]
const SKIN_TYPE_CHIPS  = ['복합성 피부', '건조함', '민감성', '모공']
const EXCLUDE_CHIPS    = ['향료', '리모넨']
const PERSONAL_CHIPS   = ['봄웜라이트', '살몬코랄', '로즈베이지']

/* ── 루틴 데이터 ── */
const ROUTINE_SECTIONS = [
  {
    tag: '☀️ 외출 전',
    items: [
      { id: 1, img: imgToriden,       name: '토리든 다이브인 저분자 히알루론산 토너', desc: '화장솜에 충분히 적신 후 살살 닦아주세요', done: true },
      { id: 2, img: imgEsnatureSerum, name: '에스네이처 아쿠아 스쿠알란 세럼', desc: '충분히 흡수될 때까지 두드려주세요', done: false },
      { id: 3, img: imgEstra,         name: '에스트라 아토베리어365 크림', desc: '얇게 두드리면서 펴발라주세요', done: false },
    ],
  },
]

/* ── 루틴 카드 ── */
function RoutineCard() {
  const [checks, setChecks] = useState(() => {
    const init = {}
    ROUTINE_SECTIONS.forEach(s => s.items.forEach(i => { init[i.id] = i.done }))
    return init
  })
  const [editing, setEditing] = useState(false)
  const [items, setItems] = useState(ROUTINE_SECTIONS[0].items)
  const [burst, setBurst] = useState(null)

  const toggle = (id) => {
    if (!editing) {
      setChecks(prev => {
        const next = { ...prev, [id]: !prev[id] }
        if (next[id]) setBurst(id)
        return next
      })
    }
  }
  useEffect(() => {
    if (burst !== null) {
      const t = setTimeout(() => setBurst(null), 700)
      return () => clearTimeout(t)
    }
  }, [burst])
  const deleteItem = (id) => setItems(prev => prev.filter(item => item.id !== id))

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '16px' }}>
      {/* 카드 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.4 }}>루틴</p>
        <span onClick={() => setEditing(e => !e)} style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', cursor: 'pointer' }}>
          {editing ? '완료' : '편집'}
        </span>
      </div>

      {ROUTINE_SECTIONS.map((section, si) => (
        <div key={si}>
          {/* 섹션 태그 */}
          <p style={{ fontSize: 13, fontWeight: 500, color: '#242227', margin: '0 0 10px', lineHeight: 1.4 }}>
            {section.tag}
          </p>

          {/* 루틴 아이템 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => toggle(item.id)}
                animate={burst === item.id ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  backgroundColor: checks[item.id] ? '#F0E9FF' : '#F7F6F9', borderRadius: 8,
                  height: 62, padding: '0 12px', boxSizing: 'border-box',
                  cursor: editing ? 'default' : 'pointer', position: 'relative',
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'contain', backgroundColor: '#FFFFFF', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#242227', margin: 0, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{item.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', margin: '1px 0 0', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{item.desc}</p>
                </div>
                {editing ? (
                  <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id) }} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                    <img src={iconClose} alt="삭제" style={{ width: 20, height: 20, display: 'block', opacity: 0.5 }} />
                  </button>
                ) : (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <CheckParticles active={burst === item.id} />
                    <button onClick={(e) => { e.stopPropagation(); toggle(item.id) }} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'block' }}>
                      <img src={checks[item.id] ? checkBox : unCheckBox} alt="" style={{ width: 16, height: 16, display: 'block' }} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* 제품 추가하기 버튼 */}
      <button style={{
        width: '100%', height: 40, marginTop: 12,
        borderRadius: 8, border: '0.5px solid #6633CC',
        backgroundColor: 'transparent', cursor: 'pointer',
        fontSize: 15, fontWeight: 500, color: '#6633CC',
        letterSpacing: '-0.01em', lineHeight: 1.5,
      }}>
        제품 추가하기
      </button>
    </div>
  )
}

/* ── 도넛 차트 (차오르는 애니메이션) ── */
function DonutChart({ score, size = 80, id = 'skinGrad' }) {
  const sw = 4
  const r  = size / 2 - sw / 2
  const C  = 2 * Math.PI * r
  const progress = useMotionValue(0)
  const dashArray = useTransform(progress, v => `${v} ${C}`)

  useEffect(() => {
    const controls = animate(progress, (score / 100) * C, {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.15,
    })
    return controls.stop
  }, [])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F7F6F9" strokeWidth={sw} />
      <motion.circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={sw}
        strokeLinecap="butt"
        strokeDasharray={dashArray}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7733FF" />
          <stop offset="100%" stopColor="#BB99FF" />
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

const INNER_BEAUTY_ITEMS = [
  { id: 1, img: imgBergamot, name: '베르가못 저분자 콜라겐 부스터', sub: '콜라겐 | 매일 1회 | 아침' },
]
const DEVICE_ITEMS = [
  { id: 1, name: 'LG 프라엘 LED 마스크', sub: '사용 중' },
]

export default function MyBeautyPage() {
  const navigate = useNavigate()
  const [waterAmount, setWaterAmount] = useState(1250)
  const [waterEditing, setWaterEditing] = useState(false)
  const adjustWater = (delta) => setWaterAmount(prev => Math.max(0, prev + delta))
  const [innerChecks, setInnerChecks] = useState({})
  const [innerEditing, setInnerEditing] = useState(false)
  const [innerItems, setInnerItems] = useState(INNER_BEAUTY_ITEMS)
  const [innerBurst, setInnerBurst] = useState(null)
  const toggleInner = (id) => {
    if (!innerEditing) {
      setInnerChecks(prev => {
        const next = { ...prev, [id]: !prev[id] }
        if (next[id]) setInnerBurst(id)
        return next
      })
    }
  }
  const deleteInner = (id) => setInnerItems(prev => prev.filter(i => i.id !== id))
  useEffect(() => {
    if (innerBurst !== null) { const t = setTimeout(() => setInnerBurst(null), 700); return () => clearTimeout(t) }
  }, [innerBurst])

  const [deviceChecks, setDeviceChecks] = useState({})
  const [deviceEditing, setDeviceEditing] = useState(false)
  const [deviceItems, setDeviceItems] = useState(DEVICE_ITEMS)
  const [deviceBurst, setDeviceBurst] = useState(null)
  const toggleDevice = (id) => {
    if (!deviceEditing) {
      setDeviceChecks(prev => {
        const next = { ...prev, [id]: !prev[id] }
        if (next[id]) setDeviceBurst(id)
        return next
      })
    }
  }
  useEffect(() => {
    if (deviceBurst !== null) { const t = setTimeout(() => setDeviceBurst(null), 700); return () => clearTimeout(t) }
  }, [deviceBurst])
  const deleteDevice = (id) => setDeviceItems(prev => prev.filter(i => i.id !== id))

  return (
    <div style={{ backgroundColor: '#F7F6F9', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <img src={bgSvg} alt="" draggable={false} style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 0 }} />

      {/* 고정 헤더 */}
      <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
          <button onClick={() => navigate(-1)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <img src={arrowBack} alt="뒤로" style={{ width: 28, height: 28, display: 'block' }} />
          </button>
          <span style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            fontSize: 18, fontWeight: 500, color: '#242227', lineHeight: 1.4, letterSpacing: '-0.01em',
          }}>
            마이 루틴
          </span>
        </div>
      </div>

      {/* 스크롤 콘텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', zIndex: 1 }}>

        {/* 날짜 선택 */}
        <div style={{ padding: '12px 16px 20px' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em', lineHeight: 1 }}>
              1.15 목 오전 7시
            </span>
            <img src={chevronRight} alt="" style={{ width: 18, height: 18, display: 'block', transform: 'rotate(90deg)' }} />
          </button>
        </div>

      <motion.div initial="hidden" animate="visible" variants={stagger} style={{ padding: '0 16px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── 오늘 내 피부 상태 ── */}
        <motion.div variants={fadeUp} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '16px' }}>
          <CardTitle>오늘 내 피부 상태</CardTitle>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {METRICS.map(({ label, score }, i) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ position: 'relative' }}>
                  <DonutChart score={score} id={`skinGrad${i}`} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <span style={{ fontSize: 24, fontWeight: 800, color: '#6633CC', lineHeight: 1.4 }}>{score}</span>
                      <span style={{ fontSize: 12, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>점</span>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 루틴 ── */}
        <motion.div variants={fadeUp}><RoutineCard /></motion.div>

        {/* ── 물 섭취량 + 수면 시간 ── */}
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8 }}>
          {/* 물 섭취량 */}
          <div style={{ width: 174, height: 180, backgroundColor: '#FFFFFF', borderRadius: 12, padding: '16px', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.4 }}>물 섭취량</p>
              <span onClick={() => setWaterEditing(e => !e)} style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', cursor: 'pointer' }}>
                {waterEditing ? '완료' : '편집'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              {waterEditing && (
                <button onClick={() => adjustWater(-50)} style={{
                  width: 16, height: 16, borderRadius: 99, flexShrink: 0,
                  border: '1px solid #E3D4FD', backgroundColor: '#FFFFFF',
                  fontSize: 10, fontWeight: 400, color: '#9D9AA3', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>−</button>
              )}
              <div style={{ position: 'relative', width: 114, height: 114, flexShrink: 0, transform: 'scale(0.95)', transformOrigin: 'center' }}>
                <img src={iconWater} alt="물 섭취량" style={{ width: 114, height: 114, objectFit: 'contain', display: 'block' }} />
                <div style={{ position: 'absolute', top: 23, left: 18, right: 18, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#6633CC', lineHeight: 1.5 }}>{waterAmount.toLocaleString('ko-KR')}</span>
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>ml</span>
                </div>
              </div>
              {waterEditing && (
                <button onClick={() => adjustWater(+50)} style={{
                  width: 16, height: 16, borderRadius: 99, flexShrink: 0,
                  border: '1px solid #E3D4FD', backgroundColor: '#FFFFFF',
                  fontSize: 10, fontWeight: 400, color: '#9D9AA3', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              )}
            </div>
          </div>

          {/* 수면 시간 */}
          <div style={{ width: 174, height: 180, backgroundColor: '#FFFFFF', borderRadius: 12, padding: '16px', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.4 }}>수면 시간</p>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', cursor: 'pointer' }}>편집</span>
            </div>
            <img src={nightImg} alt="수면 시간" style={{ width: 108, height: 87, objectFit: 'contain', display: 'block', margin: '0 auto 4px', position: 'relative', top: 4 }} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'center', marginTop: -4 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#6633CC', lineHeight: 1.5 }}>7</span>
              <span style={{ fontSize: 14, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>시간</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#6633CC', lineHeight: 1.5 }}>30</span>
              <span style={{ fontSize: 14, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>분</span>
            </div>
          </div>
        </motion.div>

        {/* ── 이너뷰티 ── */}
        <motion.div variants={fadeUp} style={{ width: 358, backgroundColor: '#FFFFFF', borderRadius: 12, padding: '16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.4 }}>이너뷰티</p>
            <span onClick={() => setInnerEditing(e => !e)} style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', cursor: 'pointer' }}>
              {innerEditing ? '완료' : '편집'}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {innerItems.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => toggleInner(item.id)}
                animate={innerBurst === item.id ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  backgroundColor: innerChecks[item.id] ? '#F0E9FF' : '#F7F6F9',
                  borderRadius: 8, height: 62, padding: '0 12px', boxSizing: 'border-box',
                  cursor: innerEditing ? 'default' : 'pointer', position: 'relative',
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'contain', backgroundColor: '#FFFFFF', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#242227', margin: 0, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{item.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', margin: '2px 0 0', lineHeight: 1.4 }}>{item.sub}</p>
                </div>
                {innerEditing ? (
                  <button onClick={(e) => { e.stopPropagation(); deleteInner(item.id) }} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                    <img src={iconClose} alt="삭제" style={{ width: 20, height: 20, display: 'block', opacity: 0.5 }} />
                  </button>
                ) : (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <CheckParticles active={innerBurst === item.id} />
                    <button onClick={(e) => { e.stopPropagation(); toggleInner(item.id) }} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'block' }}>
                      <img src={innerChecks[item.id] ? checkBox : unCheckBox} alt="" style={{ width: 16, height: 16, display: 'block' }} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 디바이스 ── */}
        <motion.div variants={fadeUp} style={{ width: 358, backgroundColor: '#FFFFFF', borderRadius: 12, padding: '16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.4 }}>디바이스</p>
            <span onClick={() => setDeviceEditing(e => !e)} style={{ fontSize: 13, fontWeight: 500, color: '#9D9AA3', cursor: 'pointer' }}>
              {deviceEditing ? '완료' : '편집'}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {deviceItems.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => toggleDevice(item.id)}
                animate={deviceBurst === item.id ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  backgroundColor: deviceChecks[item.id] ? '#F0E9FF' : '#F7F6F9',
                  borderRadius: 8, height: 62, padding: '0 12px', boxSizing: 'border-box',
                  cursor: deviceEditing ? 'default' : 'pointer', position: 'relative',
                }}
              >
                <img src={imgMakeon} alt="디바이스" style={{ width: 40, height: 40, objectFit: 'contain', backgroundColor: '#FFFFFF', borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#242227', margin: '0 0 2px', lineHeight: 1.4 }}>{item.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', margin: 0, lineHeight: 1.4 }}>{item.sub}</p>
                </div>
                {deviceEditing ? (
                  <button onClick={(e) => { e.stopPropagation(); deleteDevice(item.id) }} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                    <img src={iconClose} alt="삭제" style={{ width: 20, height: 20, display: 'block', opacity: 0.5 }} />
                  </button>
                ) : (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <CheckParticles active={deviceBurst === item.id} />
                    <button onClick={(e) => { e.stopPropagation(); toggleDevice(item.id) }} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'block' }}>
                      <img src={deviceChecks[item.id] ? checkBox : unCheckBox} alt="" style={{ width: 16, height: 16, display: 'block' }} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
      </div>
    </div>
  )
}
