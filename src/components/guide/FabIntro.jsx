import { createPortal } from 'react-dom'
import { useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuide } from '../../context/GuideContext'

const CARD_H = 110

function getScale() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--frame-scale')
  ) || 1
}

function getFabRect() {
  const rootEl = document.getElementById('root')
  const origin = rootEl ? rootEl.getBoundingClientRect() : { left: 0, top: 0 }
  const el = document.querySelector('[data-guide-id="guide-fab"]')
  if (!el) return null
  const s = getScale()
  const r = el.getBoundingClientRect()
  return {
    left:   (r.left   - origin.left) / s,
    top:    (r.top    - origin.top)  / s,
    width:  r.width  / s,
    height: r.height / s,
  }
}

export default function FabIntro() {
  const { fabIntroVisible, dismissFabIntro } = useGuide()
  const [rect, setRect] = useState(null)

  useLayoutEffect(() => {
    if (!fabIntroVisible) return
    setRect(getFabRect())
  }, [fabIntroVisible])

  if (!fabIntroVisible) return null

  const portalTarget = document.getElementById('root')

  const cardTop = rect ? rect.top - CARD_H + 44 : 600

  return createPortal(
    <AnimatePresence>
      {fabIntroVisible && (
        <motion.div
          key="fab-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'absolute', inset: 0, zIndex: 9997, pointerEvents: 'none' }}
        >
          {/* 툴팁 카드 — 오버레이 없이 말풍선만 */}
          {rect && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{ opacity: { duration: 0.2 }, y: { delay: 0.2, duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
              style={{
                position: 'absolute',
                top: cardTop,
                right: 12,
                width: 'fit-content',
                maxWidth: 220,
                backgroundColor: '#B08FF4',
                borderRadius: 12,
                padding: '8px 12px',
                pointerEvents: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              {/* 말풍선 꼬리 */}
              <div style={{
                position: 'absolute',
                bottom: -7,
                right: 20,
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #B08FF4',
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.06))',
              }} />

              <p style={{ fontSize: 13, fontWeight: 500, color: '#FFFFFF', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {'주요 기능을\n살펴보세요.'}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget || document.body
  )
}
