import { createPortal } from 'react-dom'
import { useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuide, GUIDE_STEPS } from '../../context/GuideContext'

const GAP = 16   // 컷아웃 가장자리 ~ 카드 사이 간격
const CARD_H = 120
const VIEWPORT_H = 844

function getScale() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--frame-scale')
  ) || 1
}

function normalize(r, origin) {
  const s = getScale()
  const left   = (r.left   - origin.left) / s
  const top    = (r.top    - origin.top)  / s
  const right  = (r.right  - origin.left) / s
  const bottom = (r.bottom - origin.top)  / s
  return { left, top, right, bottom, width: right - left, height: bottom - top }
}

function getRect(highlight) {
  if (!highlight) return null
  const rootEl = document.getElementById('root')
  const origin = rootEl ? rootEl.getBoundingClientRect() : { left: 0, top: 0 }

  const el = document.querySelector(`[data-guide-id="${highlight}"]`)
  return el ? normalize(el.getBoundingClientRect(), origin) : null
}

export default function GuideCard() {
  const { step, guideVisible, next, skip } = useGuide()
  const [rect, setRect] = useState(null)
  const current = GUIDE_STEPS[step]
  const isLast = step === GUIDE_STEPS.length - 1

  useLayoutEffect(() => {
    if (!guideVisible) return
    setRect(getRect(current?.highlight))
  }, [step, guideVisible, current?.highlight])

  if (!guideVisible) return null

  const isWeather = current?.highlight === 'weather-section'
  const padY = isWeather ? 16 : 0

  const tooltipBelow = rect ? rect.bottom < VIEWPORT_H * 0.52 : false
  const rawTop = rect
    ? tooltipBelow ? rect.bottom + padY + GAP : rect.top - padY - CARD_H - GAP
    : VIEWPORT_H - CARD_H
  const tooltipTop = Math.max(0, Math.min(rawTop, VIEWPORT_H - CARD_H))

  const CARD_MAX_W = 280
  const elCenterX = rect ? rect.left + rect.width / 2 : 195
  const rawCardLeft = elCenterX - CARD_MAX_W / 2
  const cardLeft = Math.max(12, Math.min(rawCardLeft, 390 - CARD_MAX_W - 12))
  const tailLeft = Math.max(14, Math.min(elCenterX - cardLeft, CARD_MAX_W - 14))

  const portalTarget = typeof document !== 'undefined' ? document.getElementById('root') : null

  return createPortal(
    <AnimatePresence>
      {guideVisible && (
        <motion.div
          key="guide-root"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={skip}
          style={{ position: 'absolute', inset: 0, zIndex: 9998, pointerEvents: 'all', cursor: 'default' }}
        >
          {/* SVG 스포트라이트 */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <mask id="miyu-spotlight">
                <rect width="100%" height="100%" fill="white" />
                {rect && (
                  <rect
                    x={rect.left} y={rect.top - padY}
                    width={rect.width} height={rect.height + padY * 2}
                    rx={isWeather ? 0 : 14} fill="black"
                  />
                )}
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.58)" mask="url(#miyu-spotlight)" />
          </svg>

          {/* 툴팁 카드 — rect 측정 완료 후에만 렌더 */}
          {rect && <motion.div
            key={step}
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: tooltipBelow ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: tooltipTop,
              left: cardLeft,
              width: 'fit-content',
              maxWidth: CARD_MAX_W,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: '16px 18px 14px',
              pointerEvents: 'all',
              boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
            }}
          >
            {/* 말풍선 꼬리 */}
            <div style={{
              position: 'absolute',
              ...(tooltipBelow
                ? { top: -8, borderBottom: '8px solid #FFFFFF', borderTop: 'none' }
                : { bottom: -8, borderTop: '8px solid #FFFFFF', borderBottom: 'none' }),
              left: tailLeft,
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              filter: tooltipBelow
                ? 'drop-shadow(0 -2px 2px rgba(0,0,0,0.06))'
                : 'drop-shadow(0 2px 2px rgba(0,0,0,0.06))',
            }} />

            {/* 제목 */}
            <p style={{ fontSize: 16, fontWeight: 600, color: '#242227', margin: '0 0 6px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
              {current?.title}
            </p>
            {/* 설명 */}
            <p style={{ fontSize: 13, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
              {current?.message}
            </p>

            {/* 하단: 건너뛰기 + 도트 + 다음 */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
              <span
                onClick={skip}
                style={{ fontSize: 12, fontWeight: 400, color: '#C1BEC6', cursor: 'pointer', letterSpacing: '-0.01em' }}
              >
                건너뛰기
              </span>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6 }}>
                {GUIDE_STEPS.map((_, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: i === step ? '#9169EB' : '#F0EFF3', transition: 'background-color 0.25s ease' }} />
                ))}
              </div>
              <span
                onClick={next}
                style={{ fontSize: 12, fontWeight: 600, color: '#6633CC', cursor: 'pointer', letterSpacing: '-0.01em' }}
              >
                {isLast ? '시작하기 →' : '다음 →'}
              </span>
            </div>
          </motion.div>}
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget || document.body
  )
}
