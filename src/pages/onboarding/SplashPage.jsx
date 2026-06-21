import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoMain from '../../assets/logo/logo-main.svg'
import logoWordmark from '../../assets/logo/logo-wordmark.svg'

export default function SplashPage({ onDismiss }) {
  const navigate = useNavigate()
  const progress = 55
  const fading = false

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.38s ease',
        fontFamily: "'SUIT', sans-serif",
      }}
    >
      {/* Logo + text block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 160,
        }}
      >
        {/* 3D rotating logo orb */}
        <div style={{ perspective: '900px' }}>
          <motion.img
            src={logoMain}
            alt="miyu"
            animate={{
              rotateY: [-20, 20],
              y: [0, -8],
              scale: [1, 1.03],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            style={{
              width: 240,
              height: 240,
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 500,
            background: 'linear-gradient(135deg, #B38BFF 0%, #A1B0FF 50%, #D4B8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            marginTop: 40,
            letterSpacing: '-0.02em',
            lineHeight: 1.4,
            textAlign: 'center',
          }}
        >
          당신만을 위한 피부 전문가
        </p>

        {/* Wordmark */}
        <img
          src={logoWordmark}
          alt="miyu"
          style={{
            width: 160,
            height: 68,
            objectFit: 'contain',
            marginTop: 20,
            filter: 'brightness(0) saturate(0) opacity(0.733)',
          }}
        />

        {/* Sub text */}
        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: '#9D9AA3',
            textAlign: 'center',
            lineHeight: 1.7,
            margin: 0,
            marginTop: 14,
            letterSpacing: '-0.01em',
          }}
        >
          나의 피부를 가장 잘 이해하는<br />개인 맞춤형 AI 뷰티 커머스
        </p>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Loading bar */}
      <div
        style={{
          width: '100%',
          paddingLeft: 28,
          paddingRight: 28,
          paddingBottom: 60,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
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
