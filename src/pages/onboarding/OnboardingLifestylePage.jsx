import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, animate } from 'framer-motion'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import radioChecked   from '../../assets/Icon/radio-button-checked.svg'
import radioUnchecked from '../../assets/Icon/radio-button-unchecked.svg'

const SLEEP_OPTIONS = ['5시간 미만', '6-7시간', '8시간 이상']
const WATER_MIN = 0
const WATER_MAX = 3000
const WATER_DEFAULT = 1250

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function RadioCard({ label, selected, onSelect }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      style={{
        width: '100%',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 16px',
        borderRadius: 12,
        border: `1px solid ${selected ? '#9169EB' : '#F0EFF3'}`,
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        fontFamily: "'SUIT', sans-serif",
        letterSpacing: '-0.01em',
        boxSizing: 'border-box',
        textAlign: 'left',
        flexShrink: 0,
        transition: 'border-color 0.18s',
      }}
    >
      <img
        src={selected ? radioChecked : radioUnchecked}
        alt=""
        style={{ width: 24, height: 24, flexShrink: 0 }}
      />
      <span style={{
        fontSize: 16,
        fontWeight: selected ? 500 : 400,
        color: selected ? '#242227' : '#9D9AA3',
        lineHeight: 1.5,
        transition: 'color 0.18s',
      }}>
        {label}
      </span>
    </motion.button>
  )
}

export default function OnboardingLifestylePage() {
  const navigate = useNavigate()
  const [sleep, setSleep] = useState(null)
  const [water, setWater] = useState(WATER_DEFAULT)

  const displayRef = useRef(WATER_DEFAULT)
  const [displayWater, setDisplayWater] = useState(WATER_DEFAULT)

  useEffect(() => {
    const from = displayRef.current
    const controls = animate(from, water, {
      duration: 0.38,
      ease: 'easeOut',
      onUpdate: (v) => {
        const rounded = Math.round(v)
        displayRef.current = rounded
        setDisplayWater(rounded)
      },
    })
    return () => controls.stop()
  }, [water])

  const pct = ((water - WATER_MIN) / (WATER_MAX - WATER_MIN)) * 100

  const handleNext = () => {
    localStorage.setItem('miyu_sleep', sleep ?? '')
    localStorage.setItem('miyu_water', String(water))
    navigate('/')
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-25%', opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: "'SUIT', sans-serif",
        letterSpacing: '-0.01em',
      }}
    >
      <img src={statusBarSvg} alt="" style={{ width: '100%', flexShrink: 0 }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{ flex: 1, overflowY: 'auto', padding: '45px 20px 130px' }}
      >
        <motion.h1
          variants={fadeUp}
          style={{ fontSize: 24, fontWeight: 600, color: '#242227', lineHeight: 1.4, margin: 0, marginBottom: 36 }}
        >
          일상 환경을<br />알려주세요
        </motion.h1>

        <motion.div variants={fadeUp}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#242227', lineHeight: 1.5, margin: 0, marginBottom: 16 }}>
            하루 수면시간
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SLEEP_OPTIONS.map(opt => (
              <RadioCard
                key={opt}
                label={opt}
                selected={sleep === opt}
                onSelect={() => setSleep(opt)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#242227', lineHeight: 1.5, margin: 0, marginBottom: 16 }}>
            하루 음수량
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#6633CC', lineHeight: 'normal' }}>
              {displayWater.toLocaleString('ko-KR')}
            </span>
            <span style={{ fontSize: 20, fontWeight: 300, color: '#242227', lineHeight: 'normal' }}>ml</span>
          </div>

          <div style={{ position: 'relative', height: 15, marginTop: 12 }}>
            <div style={{
              position: 'absolute',
              left: 0, right: 0,
              top: '50%', transform: 'translateY(-50%)',
              height: 6,
              borderRadius: 99,
              backgroundColor: '#F0EFF3',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: 'linear-gradient(to right, #7733FF, #BB99FF)',
              }} />
            </div>
            <input
              type="range"
              min={WATER_MIN}
              max={WATER_MAX}
              step={50}
              value={water}
              onChange={e => setWater(Number(e.target.value))}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                opacity: 0, cursor: 'pointer', margin: 0,
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${pct}%`,
              transform: 'translate(-50%, -50%)',
              width: 15, height: 15,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '6px 6px 10px rgba(0,0,0,0.10)',
              pointerEvents: 'none',
            }} />
          </div>
        </motion.div>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 6, marginBottom: 39 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              width: 176, height: 50, borderRadius: 12,
              border: '1px solid #6633CC', backgroundColor: 'transparent',
              color: '#6633CC', fontSize: 17, fontWeight: 600, lineHeight: 1.4,
              cursor: 'pointer', fontFamily: "'SUIT', sans-serif", letterSpacing: '-0.01em',
              boxSizing: 'border-box',
            }}
          >
            건너뛰기
          </button>
          <button
            onClick={handleNext}
            style={{
              width: 176, height: 50, borderRadius: 12,
              border: 'none', backgroundColor: '#6633CC',
              color: '#FFFFFF', fontSize: 17, fontWeight: 600, lineHeight: 1.4,
              cursor: 'pointer', fontFamily: "'SUIT', sans-serif", letterSpacing: '-0.01em',
            }}
          >
            다음
          </button>
        </div>
        <div style={{ width: 140, height: 5, borderRadius: 99, backgroundColor: '#000000', marginBottom: 8 }} />
      </div>
    </motion.div>
  )
}
