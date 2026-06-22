import { createPortal } from 'react-dom'
import { useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuide, MYPAGE_GUIDE_STEPS } from '../../context/GuideContext'

const GAP = 16
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

function spotlightBounds(r, current) {
  const padX = current?.padX ?? 0
  const padY = current?.padY ?? 0
  const w = current?.fixedW ?? (r.width + padX * 2)
  const h = current?.fixedH ?? (r.height + padY * 2)
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  return { left: cx - w / 2, top: cy - h / 2, right: cx + w / 2, bottom: cy + h / 2, width: w, height: h }
}

export default function MypageGuideCard() {
  const { mpStep, mypageGuideVisible, nextMypage, skipMypage } = useGuide()
  const [rect, setRect] = useState(null)
  const current = MYPAGE_GUIDE_STEPS[mpStep]
  const isLast = mpStep === MYPAGE_GUIDE_STEPS.length - 1

  useLayoutEffect(() => {
    if (!mypageGuideVisible) return
    setRect(getRect(current?.highlight))
  }, [mpStep, mypageGuideVisible, current?.highlight])

  if (!mypageGuideVisible) return null

  const rx = current?.rx ?? 12
  const anchorRect = rect ? spotlightBounds(rect, current) : null
  const placement = current?.placement
  const tooltipBelow = placement === 'below' ? true
    : placement === 'above' ? false
    : anchorRect ? anchorRect.bottom < VIEWPORT_H * 0.52 : false

  const offsetY = current?.offsetY ?? 0
  const tooltipPos = anchorRect
    ? tooltipBelow
      ? { top: Math.max(8, anchorRect.bottom + GAP - offsetY) }
      : { bottom: Math.max(8, VIEWPORT_H - anchorRect.top + GAP + offsetY) }
    : { top: VIEWPORT_H - 130 }

  const CARD_MAX_W = 280
  const elCenterX = anchorRect ? anchorRect.left + anchorRect.width / 2 : 195
  const rawCardLeft = elCenterX - CARD_MAX_W / 2
  const cardLeft = Math.max(12, Math.min(rawCardLeft, 390 - CARD_MAX_W - 12))
  const tailLeft = Math.max(14, Math.min(elCenterX - cardLeft, CARD_MAX_W - 14))

  const portalTarget = typeof document !== 'undefined' ? document.getElementById('root') : null

  return createPortal(
    <AnimatePresence>
      {mypageGuideVisible && (
        <motion.div
          key="mp-guide-root"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={skipMypage}
          style={{ position: 'absolute', inset: 0, zIndex: 9998, pointerEvents: 'all', touchAction: 'none', cursor: 'default' }}
        >
          {/* SVG 스포트라이트 */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <mask id="mp-spotlight">
                <rect width="100%" height="100%" fill="white" />
                {rect && (() => {
                  const b = spotlightBounds(rect, current)
                  const svgRx = Math.min(rx, b.width / 2, b.height / 2)
                  return <rect x={b.left} y={b.top} width={b.width} height={b.height} rx={svgRx} ry={svgRx} fill="black" />
                })()}
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.58)" mask="url(#mp-spotlight)" />
          </svg>

          {/* 툴팁 카드 */}
          {anchorRect && (
            <motion.div
              key={mpStep}
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, y: tooltipBelow ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                ...tooltipPos,
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

              <p style={{ fontSize: 16, fontWeight: 600, color: '#242227', margin: '0 0 6px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {current?.title}
              </p>
              <p style={{ fontSize: 13, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {current?.message}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
                <span onClick={skipMypage} style={{ fontSize: 12, fontWeight: 400, color: '#C1BEC6', cursor: 'pointer', letterSpacing: '-0.01em' }}>
                  건너뛰기
                </span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6 }}>
                  {MYPAGE_GUIDE_STEPS.map((_, i) => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: i === mpStep ? '#9169EB' : '#F0EFF3', transition: 'background-color 0.25s ease' }} />
                  ))}
                </div>
                <span onClick={nextMypage} style={{ fontSize: 12, fontWeight: 600, color: '#6633CC', cursor: 'pointer', letterSpacing: '-0.01em' }}>
                  {isLast ? '시작하기 →' : '다음 →'}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget || document.body
  )
}
