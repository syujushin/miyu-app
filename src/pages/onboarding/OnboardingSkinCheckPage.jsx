import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import statusBarSvg from '../../assets/Top/Status Bar.svg'

const SKIN_TYPES = [['건성', '중성', '지성', '복합성'], ['수부지', '잘 모르겠어요']]
const SKIN_CONCERNS = [
  '아토피', '여드름', '민감성', '미백/잡티',
  '피지/블랙헤드', '다크서클', '모공', '속건조',
  '주름/탄력', '홍조', '각질', '해당없음',
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function chipBaseStyle(active) {
  return {
    padding: '5px 10px',
    borderRadius: 8,
    border: `1px solid ${active ? '#9169EB' : '#F0EFF3'}`,
    backgroundColor: '#FFFFFF',
    color: active ? '#9169EB' : '#9D9AA3',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.4,
    cursor: 'pointer',
    fontFamily: "'SUIT', sans-serif",
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: 'border-color 0.18s, color 0.18s',
  }
}

const chipVariants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.28, ease: 'easeOut' },
  },
}

function Chip({ label, active, onToggle }) {
  return (
    <motion.button
      variants={chipVariants}
      animate={active ? 'active' : 'idle'}
      whileTap={{ scale: 0.94 }}
      onClick={onToggle}
      style={chipBaseStyle(active)}
    >
      {label}
    </motion.button>
  )
}

function SectionHeader({ title, badge }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: '#242227', lineHeight: 1 }}>{title}</span>
      <span style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3', lineHeight: 1 }}>{badge}</span>
    </div>
  )
}

export default function OnboardingSkinCheckPage() {
  const navigate = useNavigate()
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedConcerns, setSelectedConcerns] = useState([])

  const toggleType = (item) => {
    setSelectedTypes(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  const toggleConcern = (item) => {
    setSelectedConcerns(prev => {
      if (prev.includes(item)) return prev.filter(i => i !== item)
      if (prev.length >= 3) return prev
      return [...prev, item]
    })
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
        style={{ flex: 1, overflowY: 'auto', padding: '45px 20px 220px' }}
      >
        <motion.h1
          variants={fadeUp}
          style={{ fontSize: 24, fontWeight: 600, color: '#242227', lineHeight: 1.4, margin: 0, marginBottom: 32 }}
        >
          피부 상태를<br />좀 더 자세하게 체크해볼게요
        </motion.h1>

        <motion.div variants={fadeUp}>
          <SectionHeader title="피부 타입" badge="중복 선택 가능" />
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SKIN_TYPES.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 8 }}>
                {row.map(item => (
                  <Chip
                    key={item}
                    label={item}
                    active={selectedTypes.includes(item)}
                    onToggle={() => toggleType(item)}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginTop: 40 }}>
          <SectionHeader title="주요 고민" badge="최대 3개" />
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', columnGap: 8, rowGap: 12 }}>
            {SKIN_CONCERNS.map(item => (
              <Chip
                key={item}
                label={item}
                active={selectedConcerns.includes(item)}
                onToggle={() => toggleConcern(item)}
              />
            ))}
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
          padding: '16px 20px 0',
        }}
      >
        <div
          style={{
            width: '100%',
            backgroundColor: '#F7F6F9',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            boxSizing: 'border-box',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.5, margin: 0 }}>
            입력한 정보를 저장하면 추천 서비스 등 맞춤 서비스를 위한
            정보 이용에 동의하게 됩니다.
          </p>
        </div>
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
            onClick={() => {
              localStorage.setItem('miyu_skin_types', JSON.stringify(selectedTypes))
              navigate('/onboarding/lifestyle')
            }}
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
