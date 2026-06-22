import { motion } from 'framer-motion'
import { useGuide } from '../../context/GuideContext'
import { useLocation, useNavigate } from 'react-router-dom'

export default function GuideFAB({ bottom }) {
  const { guideVisible, fabIntroVisible, startGuide, miyubotGuideVisible, startMiyubotGuide, mbIntroSeen, cameraOpen, mypageGuideVisible, startMypageGuide, mpIntroSeen } = useGuide()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isHome    = pathname === '/'
  const isMiyubot = pathname === '/miyubot'
  const isMypage  = pathname === '/mypage' || pathname.startsWith('/mypage/')

  if ((!isHome && !isMiyubot && !isMypage) || guideVisible || miyubotGuideVisible || mypageGuideVisible || cameraOpen) return null

  const handleClick = () => {
    if (isMiyubot) startMiyubotGuide()
    else if (isMypage) startMypageGuide()
    else { startGuide(); if (!isHome) navigate('/') }
  }

  return (
    <motion.button
      data-guide-id="guide-fab"
      onClick={handleClick}
      animate={(fabIntroVisible || (isMiyubot && !mbIntroSeen) || (isMypage && !mpIntroSeen)) ? { x: [0, -3, 3, -3, 3, 0] } : { x: 0 }}
      transition={(fabIntroVisible || (isMiyubot && !mbIntroSeen) || (isMypage && !mpIntroSeen)) ? { duration: 0.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' } : {}}
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
        boxShadow: 'none',
        flexShrink: 0,
        transition: 'bottom 0.25s ease',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, userSelect: 'none' }}>?</span>
    </motion.button>
  )
}
