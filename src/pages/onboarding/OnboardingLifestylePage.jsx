import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import radioChecked   from '../../assets/Icon/radio-button-checked.svg'
import radioUnchecked from '../../assets/Icon/radio-button-unchecked.svg'

const SLEEP_OPTIONS = ['5시간 미만', '6-7시간', '8시간 이상']
const WATER_MIN = 0
const WATER_MAX = 3000
const WATER_DEFAULT = 1250

function RadioCard({ label, selected, onSelect }) {
  return (
    <button
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
      }}>
        {label}
      </span>
    </button>
  )
}

export default function OnboardingLifestylePage() {
  const navigate = useNavigate()
  const [sleep, setSleep] = useState(null)
  const [water, setWater] = useState(WATER_DEFAULT)

  const pct = ((water - WATER_MIN) / (WATER_MAX - WATER_MIN)) * 100

  const handleNext = () => {
    localStorage.setItem('miyu_sleep', sleep ?? '')
    localStorage.setItem('miyu_water', String(water))
    navigate('/')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        fontFamily: "'SUIT', sans-serif",
        letterSpacing: '-0.01em',
        position: 'relative',
      }}
    >
      <img src={statusBarSvg} alt="" style={{ width: '100%', flexShrink: 0 }} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '45px 20px 130px' }}>

        {/* Title */}
        <h1 style={{ fontSize: 24, fontWeight: 600, color: '#242227', lineHeight: 1.4, margin: 0, marginBottom: 36 }}>
          일상 환경을<br />알려주세요
        </h1>

        {/* Sleep section */}
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

        {/* Water section */}
        <p style={{ fontSize: 16, fontWeight: 600, color: '#242227', lineHeight: 1.5, margin: 0, marginTop: 32, marginBottom: 16 }}>
          하루 음수량
        </p>

        {/* Number display */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#6633CC', lineHeight: 'normal' }}>
            {water.toLocaleString('ko-KR')}
          </span>
          <span style={{ fontSize: 20, fontWeight: 300, color: '#242227', lineHeight: 'normal' }}>ml</span>
        </div>

        {/* Slider: 12px below number */}
        <div style={{ position: 'relative', height: 15, marginTop: 12 }}>
          {/* Track (rounded, clips fill) */}
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
          {/* Native input (invisible, handles drag) */}
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
          {/* Custom thumb */}
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
      </div>

      {/* Bottom Buttons */}
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
    </div>
  )
}
