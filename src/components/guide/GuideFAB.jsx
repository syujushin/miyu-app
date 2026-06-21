import { useGuide } from '../../context/GuideContext'
import { useLocation } from 'react-router-dom'

export default function GuideFAB({ bottom }) {
  const { guideVisible, startGuide } = useGuide()
  const { pathname } = useLocation()

  if (pathname !== '/' || guideVisible) return null

  return (
    <button
      onClick={startGuide}
      style={{
        position: 'absolute',
        bottom,
        right: 16,
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#6633CC',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        boxShadow: '0 4px 16px rgba(102, 51, 204, 0.32)',
        flexShrink: 0,
        transition: 'bottom 0.25s ease',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, userSelect: 'none' }}>?</span>
    </button>
  )
}
