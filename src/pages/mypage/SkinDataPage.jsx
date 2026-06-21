import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import statusBarSvg  from '../../assets/Top/Status Bar.svg'
import arrowBack     from '../../assets/Icon/ui/icon-arrow-back.svg'
import chevronRight  from '../../assets/Icon/ui/icon-chevron-right.svg'
import logoIcon      from '../../assets/logo/logo-icon-square.svg'
import imgTint    from '../../assets/images/MyData/lip.png'
import imgEye     from '../../assets/images/MyData/shadow.png'
import imgBlusher from '../../assets/images/MyData/blusher.png'
import skinTypeImg         from '../../assets/images/skin-type.png'
import personalColorImg    from '../../assets/images/personal-color-palette.png'
import bgSvg               from '../../assets/Icon/background.svg'

/* ── 피부 타입 분석 데이터 ── */
const SKIN_TYPES = [
  { label: '건성',   pct: 64 },
  { label: '지성',   pct: 35 },
  { label: '복합성', pct: 86 },
]

/* ── 주요 피부 고민 데이터 ── */
const CONCERNS = [
  { label: '블랙헤드', pct: 77 },
  { label: '트러블',   pct: 34 },
  { label: '건조함',   pct: 52 },
]

/* ── 어울리는/피하는 컬러 ── */
const GOOD_COLORS  = ['#F7E3BA', '#FAD49E', '#F9B390', '#F29988', '#EC7979']
const BAD_COLORS   = ['#E6B2FF', '#CC99FF', '#D383FC', '#E87DE8', '#EB4799']

/* ── 추천 카테고리 ── */
const PRODUCT_CATS = [
  { img: imgTint,    label: '립',    sub: '코랄빛 핑크' },
  { img: imgEye,     label: '섀도우', sub: '골드 펄' },
  { img: imgBlusher, label: '블러셔', sub: '피치 코랄' },
]

/* ── 공통 컴포넌트 ── */
function SectionHeader({ title, showLink = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: '#242227', lineHeight: 1.5 }}>{title}</span>
      {showLink && (
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', lineHeight: 1.5 }}>추천 제품</span>
          <img src={chevronRight} alt="" style={{ width: 14, height: 14, opacity: 1 }} />
        </button>
      )}
    </div>
  )
}

function BarItem({ label, pct }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const duration = 800
    const start = performance.now()
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setWidth(pct * easeOut(t))
      if (t < 1) requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [pct])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#6633CC', lineHeight: 1.5 }}>{pct}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 99, backgroundColor: '#F7F6F9', overflow: 'hidden' }}>
        <div style={{ width: `${width}%`, height: '100%', background: 'linear-gradient(90deg, #BB99FF, #7733FF)' }} />
      </div>
    </div>
  )
}

function InfoBox({ text }) {
  return (
    <div style={{ backgroundColor: '#F7F6F9', borderRadius: 8, padding: '10px 14px', marginTop: 4 }}>
      <p style={{ fontSize: 12, fontWeight: 400, color: '#5F5C66', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{text}</p>
    </div>
  )
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}

export default function SkinDataPage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F7F6F9', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* 배경 */}
      <img src={bgSvg} alt="" draggable={false} style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 0 }} />

      {/* 상태바 */}
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block', position: 'relative', zIndex: 1 }} />

      {/* 헤더 */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, position: 'relative', zIndex: 1 }}>
        <button onClick={() => navigate(-1)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
          <img src={arrowBack} alt="뒤로" style={{ width: 28, height: 28, display: 'block' }} />
        </button>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 18, fontWeight: 500, color: '#242227', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
          나의 피부 데이터
        </span>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 16px 40px', paddingTop: 114 - 44 - 52, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}
      >

        {/* ── 복합성 피부 히어로 카드 ── */}
        <motion.div variants={fadeUp} style={{
          borderRadius: 12, overflow: 'hidden', position: 'relative',
          height: 131, flexShrink: 0,
          backgroundImage: `url(${skinTypeImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div style={{ position: 'relative', zIndex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1, letterSpacing: '-0.01em' }}>
              복합성 피부
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {['건성', '민감성', '복합성'].map(t => (
                  <span key={t} style={{
                    fontSize: 11, fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5,
                    backgroundColor: '#9169EB', borderRadius: 4, padding: '2px 6px',
                  }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize: 12, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5 }}>
                이마와 코는 유분이 많고<br />볼과 턱은 건조한 복합성 피부
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 피부 타입 분석 ── */}
        <motion.div variants={fadeUp} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="피부 타입 분석" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SKIN_TYPES.map(item => <BarItem key={item.label} {...item} />)}
          </div>
          <InfoBox text={"복합성 피부는 T존은 유분이 많고 U존은 건조한,\n부위별로 차이가 있는 피부 타입이에요."} />
        </motion.div>

        {/* ── 주요 피부 고민 ── */}
        <motion.div variants={fadeUp} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="주요 피부 고민" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CONCERNS.map(item => <BarItem key={item.label} {...item} />)}
          </div>
          <InfoBox text={"모공/블랙헤드가 가장 큰 고민이에요.\n피지 조절과 각질 관리에 집중하면 개선될 수 있어요."} />
        </motion.div>

        {/* ── 봄웜 브라이트 히어로 카드 ── */}
        <motion.div variants={fadeUp} style={{
          borderRadius: 12, overflow: 'hidden', position: 'relative',
          height: 131, flexShrink: 0,
          backgroundImage: `url(${personalColorImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div style={{ position: 'relative', zIndex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1, letterSpacing: '-0.01em' }}>
              봄웜 브라이트
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {['코랄피치', '살몬오렌지', '로즈베이지'].map(t => (
                  <span key={t} style={{
                    fontSize: 11, fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5,
                    backgroundColor: '#F28888', borderRadius: 4, padding: '2px 6px',
                  }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize: 12, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5 }}>
                따뜻하고 밝은 노란빛 베이스에<br />생기 있는 코랄 톤
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 컬러 팔레트 ── */}
        <motion.div variants={fadeUp} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="컬러 팔레트" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 400, color: '#242227', lineHeight: 1.5, margin: '0 0 4px' }}>어울려요</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {GOOD_COLORS.map((c, i) => (
                  <div key={i} style={{ width: 62, height: 40, borderRadius: 4, backgroundColor: c, flexShrink: 0 }} />
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 13, fontWeight: 400, color: '#242227', lineHeight: 1.5, margin: '0 0 4px' }}>피하세요</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {BAD_COLORS.map((c, i) => (
                  <div key={i} style={{ width: 62, height: 40, borderRadius: 4, backgroundColor: c, flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {PRODUCT_CATS.map(({ img, label, sub }) => (
              <div key={label} style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                padding: '12px 20px',
                backgroundColor: '#F7F6F9', borderRadius: 12,
                gap: 4,
              }}>
                <img src={img} alt={label} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#242227', lineHeight: 1.5 }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 400, color: '#78757D', lineHeight: 1.5 }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 하단 CTA ── */}
        <motion.button
          variants={fadeUp}
          onClick={() => navigate('/miyubot')}
          style={{
            width: 358, height: 50, borderRadius: 12, border: 'none', cursor: 'pointer',
            backgroundColor: '#6633CC',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            flexShrink: 0, alignSelf: 'center',
          }}
        >
          <img src={logoIcon} alt="" style={{ width: 20, height: 20, borderRadius: 6, display: 'block' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.5 }}>
            미유봇으로 재진단하기
          </span>
        </motion.button>

      </motion.div>

    </div>
  )
}
