import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import WeatherBanner    from './WeatherBanner'

export default function AppLayout() {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
      {showBanner && <WeatherBanner onClose={() => setShowBanner(false)} />}
      <BottomNavigation />
    </div>
  )
}
