import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import WeatherBanner    from './WeatherBanner'

/* 바텀 네비 높이: 탭 4+48 + 하단 34 + 보더 1 = 87px */
const NAV_HEIGHT = 87

export default function AppLayout() {
  const [showBanner, setShowBanner] = useState(true)
  const { pathname } = useLocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>

      {/* 배너를 콘텐츠 위에 absolute로 올려야 backdrop-filter가 실제로 동작 */}
      {showBanner && pathname !== '/miyubot' && (
        <div
          style={{
            position: 'absolute',
            bottom: NAV_HEIGHT - 2,
            left: 0,
            right: 0,
            zIndex: 20,
          }}
        >
          <WeatherBanner onClose={() => setShowBanner(false)} />
        </div>
      )}

      {pathname !== '/miyubot' && <BottomNavigation />}
    </div>
  )
}
