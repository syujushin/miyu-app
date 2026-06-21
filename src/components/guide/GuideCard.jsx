import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { useGuide, GUIDE_STEPS } from '../../context/GuideContext'

export default function GuideCard() {
  const { step, guideVisible } = useGuide()
  const [displayStep, setDisplayStep] = useState(step)
  const [textVisible, setTextVisible] = useState(true)

  useEffect(() => {
    setTextVisible(false)
    const t = setTimeout(() => {
      setDisplayStep(step)
      setTextVisible(true)
    }, 180)
    return () => clearTimeout(t)
  }, [step])

  const message = GUIDE_STEPS[displayStep]?.message ?? ''

  if (!guideVisible) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 876,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 390,
        backgroundColor: '#E3D4FD',
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <p
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: '#8257E0',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.5,
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 0.18s ease',
        }}
      >
        {message}
      </p>

      {/* 도트 인디케이터 */}
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {GUIDE_STEPS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === displayStep ? 16 : 5,
              height: 5,
              borderRadius: 99,
              backgroundColor: i === displayStep ? '#A17CF0' : '#FFFFFF',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>,
    document.body
  )
}
