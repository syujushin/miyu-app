import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import WeatherBanner    from './WeatherBanner'
import { useGuide }     from '../../context/GuideContext'
import GuideFAB         from '../guide/GuideFAB'

const NAV_HEIGHT = 87

const TAB_ORDER = ['/', '/category', '/miyubot', '/liked', '/mypage']

function getPageClass(from, to) {
  if (to === from) return ''
  if (to.startsWith('/mypage') && !from.startsWith('/mypage')) return 'page-from-below'
  if (from.startsWith('/mypage') && !to.startsWith('/mypage')) return 'page-fade'
  if (to === '/miyubot' || from === '/miyubot') return 'page-fade'
  const fi = TAB_ORDER.findIndex(p => from === p || from.startsWith(p + '/'))
  const ti = TAB_ORDER.findIndex(p => to   === p || to.startsWith(p + '/'))
  if (fi < 0 || ti < 0) return 'page-fade'
  if (ti > fi) return 'page-from-right'
  if (ti < fi) return 'page-from-left'
  return 'page-fade'
}

export default function AppLayout() {
  const [showBanner, setShowBanner] = useState(true)
  const { pathname } = useLocation()
  const prevPath   = useRef(pathname)
  const [animKey,   setAnimKey]   = useState(0)
  const [animClass, setAnimClass] = useState('')
  const { guideVisible, step, currentHighlight } = useGuide()
  const scrollRef = useRef(null)
  const prevGuideVisible = useRef(guideVisible)

  useLayoutEffect(() => {
    if (!guideVisible || !scrollRef.current) return
    const container = scrollRef.current

    if (currentHighlight !== 'weather-section') {
      container.scrollTop = 0
      return
    }

    const el = document.querySelector('[data-guide-id="weather-section"]')
    if (!el) return

    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    const elAbsoluteBottom = elRect.bottom - containerRect.top + container.scrollTop
    container.scrollTop = Math.max(0, elAbsoluteBottom - containerRect.height + 60)
  }, [guideVisible, step, currentHighlight])

  // 가이드 종료 시 콘텐츠 리마운트 → stagger 애니메이션 재생
  useEffect(() => {
    if (prevGuideVisible.current && !guideVisible) {
      setAnimClass('')
      setAnimKey(k => k + 1)
    }
    prevGuideVisible.current = guideVisible
  }, [guideVisible])

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setAnimClass(getPageClass(prevPath.current, pathname))
      setAnimKey(k => k + 1)
      prevPath.current = pathname
    }
  }, [pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflowX: 'hidden' }}>
      <main style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        <div
          ref={scrollRef}
          key={animKey}
          className={`${animClass}${guideVisible ? ' guide-active' : ''}`}
          style={{ height: '100%', overflowY: guideVisible ? 'hidden' : 'auto', overscrollBehavior: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <Outlet />
        </div>
      </main>

      {showBanner && pathname !== '/miyubot' && !pathname.startsWith('/mypage') && (
        <div style={{ position: 'absolute', bottom: NAV_HEIGHT - 2, left: 0, right: 0, zIndex: 20 }}>
          <WeatherBanner onClose={() => setShowBanner(false)} />
        </div>
      )}

      <GuideFAB bottom={showBanner && pathname !== '/miyubot' && !pathname.startsWith('/mypage') ? 131 : 103} />
      {pathname !== '/miyubot' && <BottomNavigation />}
    </div>
  )
}
