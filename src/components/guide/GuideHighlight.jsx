import { useEffect } from 'react'
import { useGuide } from '../../context/GuideContext'

const STYLE_ID = 'miyu-guide-hl'

export default function GuideHighlight() {
  const { currentHighlight } = useGuide()

  useEffect(() => {
    let el = document.getElementById(STYLE_ID)

    if (!currentHighlight) {
      el?.remove()
      return
    }

    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }

    const selector = currentHighlight === 'weather-cards'
      ? '[data-guide-id^="weather-card"]'
      : `[data-guide-id="${currentHighlight}"]`

    const isMiyubot = currentHighlight === 'miyubot-nav'

    el.textContent = `
@keyframes miyu-guide-glow-in {
  0%, 100% { box-shadow: inset 0 0 0 0px rgba(102,51,204,0); }
  50%       { box-shadow: inset 0 0 0 4px rgba(102,51,204,0.4); }
}
@keyframes miyu-guide-glow-out {
  0%, 100% { box-shadow: 0 0 0 0px rgba(102,51,204,0); }
  50%       { box-shadow: 0 0 0 4px rgba(102,51,204,0.3), 0 0 16px rgba(102,51,204,0.2); }
}
${selector} {
  animation: ${isMiyubot ? 'miyu-guide-glow-out' : 'miyu-guide-glow-in'} 2s ease-in-out infinite !important;
}
`
    return () => { document.getElementById(STYLE_ID)?.remove() }
  }, [currentHighlight])

  return null
}
