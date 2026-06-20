import { useState, useRef, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import WeatherBanner    from './WeatherBanner'

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
          key={animKey}
          className={animClass}
          style={{ height: '100%', overflowY: 'auto', overscrollBehavior: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <Outlet />
        </div>
      </main>

      {showBanner && pathname !== '/miyubot' && !pathname.startsWith('/mypage') && (
        <div style={{ position: 'absolute', bottom: NAV_HEIGHT - 2, left: 0, right: 0, zIndex: 20 }}>
          <WeatherBanner onClose={() => setShowBanner(false)} />
        </div>
      )}

      {pathname !== '/miyubot' && <BottomNavigation />}
    </div>
  )
}
