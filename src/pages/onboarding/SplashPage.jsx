import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logoMain from '../../assets/logo/logo-main.svg'
import logoWordmark from '../../assets/logo/logo-wordmark.svg'

export default function SplashPage({ onDismiss }) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const duration = 2200
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const p = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - p, 2)
      setProgress(ease * 88)
      if (p < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const fadeTimer = setTimeout(() => {
      setFading(true)
      const completed = localStorage.getItem('onboarding_completed')
      const dest = completed ? '/' : '/onboarding'
      setTimeout(() => {
        onDismiss()
        navigate(dest, { replace: true })
      }, 380)
    }, 2500)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(fadeTimer)
    }
  }, [onDismiss, navigate])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0E9FF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.38s ease',
        fontFamily: "'SUIT', sans-serif",
      }}
    >
      {/* Center content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          paddingBottom: 48,
        }}
      >
        {/* Tagline */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            background: 'linear-gradient(90deg, #6633CC 0%, #A17CF0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            marginBottom: 28,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          당신만을 위한 피부 전문가
        </p>

        {/* 3D Ring Logo */}
        <img
          src={logoMain}
          alt="miyu"
          style={{ width: 220, height: 220, objectFit: 'contain' }}
        />

        {/* Wordmark */}
        <img
          src={logoWordmark}
          alt="miyu"
          style={{ width: 110, height: 'auto', marginTop: 20, filter: 'brightness(0) saturate(0) opacity(0.55)' }}
        />
      </div>

      {/* Bottom area */}
      <div
        style={{
          width: '100%',
          paddingBottom: 48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: '#9D9AA3',
            textAlign: 'center',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          나의 피부를 가장 잘 이해하는<br />개인 맞춤형 AI 뷰티 커머스
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: 'calc(100% - 48px)',
            height: 2,
            borderRadius: 99,
            backgroundColor: '#E3D4FD',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7733FF 0%, #BB99FF 100%)',
              borderRadius: 99,
            }}
          />
        </div>
      </div>
    </div>
  )
}
