import { createPortal } from 'react-dom'
import { useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuide, MIYUBOT_GUIDE_STEPS } from '../../context/GuideContext'

const GAP = 16
const CARD_H = 110
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

function getRects(highlights) {
  if (!highlights?.length) return []
  const rootEl = document.getElementById('root')
  const origin = rootEl ? rootEl.getBoundingClientRect() : { left: 0, top: 0 }
  return highlights
    .map(id => document.querySelector(`[data-guide-id="${id}"]`))
    .filter(Boolean)
    .map(el => normalize(el.getBoundingClientRect(), origin))
}

// spotlight 실제 경계 계산 (fixedW/fixedH 또는 padX/padY 적용 후)
function spotlightBounds(r, current) {
  const padX = current?.padX ?? 0
  const padY = current?.padY ?? 0
  const w = current?.fixedW ?? (r.width + padX * 2)
  const h = current?.fixedH ?? (r.height + padY * 2)
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  return { left: cx - w / 2, top: cy - h / 2, right: cx + w / 2, bottom: cy + h / 2, width: w, height: h }
}

export default function MiyubotGuideCard() {
  const { mbStep, miyubotGuideVisible, nextMiyubot, skipMiyubot } = useGuide()
  const [rect, setRect] = useState(null)
  const [rects, setRects] = useState([])
  const current = MIYUBOT_GUIDE_STEPS[mbStep]
  const isLast = mbStep === MIYUBOT_GUIDE_STEPS.length - 1
  const isMulti = !!current?.highlights

  useLayoutEffect(() => {
    if (!miyubotGuideVisible) return
    if (isMulti) {
      setRects(getRects(current.highlights))
      setRect(null)
    } else {
      setRect(getRect(current?.highlight))
      setRects([])
    }
  }, [mbStep, miyubotGuideVisible, isMulti, current?.highlight, current?.highlights])

  if (!miyubotGuideVisible) return null

  const rx = current?.rx ?? 14

  // 말풍선 위치를 spotlight 실제 경계 기준으로 계산
  let anchorRect = null
  if (rect) {
    anchorRect = spotlightBounds(rect, current)
  } else if (rects.length > 0) {
    const spots = rects.map(r => spotlightBounds(r, current))
    anchorRect = {
      left:   Math.min(...spots.map(s => s.left)),
      top:    Math.min(...spots.map(s => s.top)),
      right:  Math.max(...spots.map(s => s.right)),
      bottom: Math.max(...spots.map(s => s.bottom)),
      get width()  { return this.right - this.left },
      get height() { return this.bottom - this.top },
    }
  }

  const hasAnchor = !!anchorRect
  const placement = current?.placement
  const tooltipBelow = placement === 'below' ? true
    : placement === 'above' ? false
    : anchorRect ? anchorRect.bottom < VIEWPORT_H * 0.52 : false

  // below: top 기준, above: bottom 기준 → 실제 카드 높이와 무관하게 8px 간격 보장
  // offsetY 양수 = 위로 이동
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
      {miyubotGuideVisible && (
        <motion.div
          key="mb-guide-root"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'absolute', inset: 0, zIndex: 9998, pointerEvents: 'all', touchAction: 'none' }}
        >
          {/* SVG 스포트라이트 */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <mask id="mb-spotlight">
                <rect width="100%" height="100%" fill="white" />
                {rect && (() => {
                  const b = spotlightBounds(rect, current)
                  const svgRx = Math.min(rx, b.width / 2, b.height / 2)
                  return <rect x={b.left} y={b.top} width={b.width} height={b.height} rx={svgRx} ry={svgRx} fill="black" />
                })()}
                {rects.map((r, i) => {
                  const b = spotlightBounds(r, current)
                  const svgRx = Math.min(rx, b.width / 2, b.height / 2)
                  return <rect key={i} x={b.left} y={b.top} width={b.width} height={b.height} rx={svgRx} ry={svgRx} fill="black" />
                })}
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.58)" mask="url(#mb-spotlight)" />
          </svg>

          {/* 툴팁 카드 */}
          {hasAnchor && (
            <motion.div
              key={mbStep}
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
                <span
                  onClick={skipMiyubot}
                  style={{ fontSize: 12, fontWeight: 400, color: '#C1BEC6', cursor: 'pointer', letterSpacing: '-0.01em' }}
                >
                  건너뛰기
                </span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6 }}>
                  {MIYUBOT_GUIDE_STEPS.map((_, i) => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: i === mbStep ? '#9169EB' : '#F0EFF3', transition: 'background-color 0.25s ease' }} />
                  ))}
                </div>
                <span
                  onClick={nextMiyubot}
                  style={{ fontSize: 12, fontWeight: 600, color: '#6633CC', cursor: 'pointer', letterSpacing: '-0.01em' }}
                >
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
