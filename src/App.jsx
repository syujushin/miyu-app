import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppLayout      from './components/layout/AppLayout'
import { GuideProvider } from './context/GuideContext'
import GuideCard         from './components/guide/GuideCard'
import GuideHighlight    from './components/guide/GuideHighlight'
import MiyubotGuideCard  from './components/guide/MiyubotGuideCard'
import MypageGuideCard   from './components/guide/MypageGuideCard'
import HomePage       from './pages/home/HomePage'
import MyPage         from './pages/mypage/MyPage'
import ProfilePage    from './pages/mypage/ProfilePage'
import MyBeautyPage  from './pages/mypage/MyBeautyPage'
import SkinDataPage  from './pages/mypage/SkinDataPage'
import MiyubotPage    from './pages/miyubot/MiyubotPage'
import ComingSoonPage from './pages/common/ComingSoonPage'
import AiDemoPage          from './pages/ai-demo/AiDemoPage'
import ProductReviewPage   from './pages/product-review/ProductReviewPage'
import ProductDetailPage   from './pages/product-detail/ProductDetailPage'
import CameraPage          from './pages/camera/CameraPage'
import SplashPage            from './pages/onboarding/SplashPage'
import OnboardingPhotoPage    from './pages/onboarding/OnboardingPhotoPage'
import OnboardingSkinCheckPage  from './pages/onboarding/OnboardingSkinCheckPage'
import OnboardingLifestylePage  from './pages/onboarding/OnboardingLifestylePage'

function AppContent() {
  const [showSplash, setShowSplash] = useState(false)
  const location = useLocation()

  return (
    <GuideProvider>
      {showSplash && <SplashPage onDismiss={() => setShowSplash(false)} />}
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route element={<AppLayout />}>
            <Route index           element={<HomePage />} />
            <Route path="category" element={<ComingSoonPage title="곧 만나요!" subtitle="카테고리 화면은 다음 업데이트에서 만나볼 수 있어요" />} />
            <Route path="miyubot"  element={<MiyubotPage />} />
            <Route path="liked"    element={<ComingSoonPage title="곧 만나요!" subtitle="좋아요 화면은 다음 업데이트에서 만나볼 수 있어요" />} />
            <Route path="mypage"   element={<MyPage />} />
          </Route>
          {/* 독립 전체화면 페이지 (AppLayout 없음) */}
          <Route path="mypage/profile"    element={<ProfilePage />} />
          <Route path="mypage/my-beauty"  element={<MyBeautyPage />} />
          <Route path="mypage/skin-data"  element={<SkinDataPage />} />
          <Route path="onboarding" element={<OnboardingPhotoPage />} />
          <Route path="onboarding/skin-check" element={<OnboardingSkinCheckPage />} />
          <Route path="onboarding/lifestyle"  element={<OnboardingLifestylePage />} />
          <Route path="ai-demo" element={<AiDemoPage />} />
          <Route path="camera"  element={<CameraPage />} />
          <Route path="product-detail/:productId" element={<ProductDetailPage />} />
          <Route path="product-review/:productId" element={<ProductReviewPage />} />
        </Routes>
      </AnimatePresence>
      <GuideCard />
      <MiyubotGuideCard />
      <MypageGuideCard />
      <GuideHighlight />
    </GuideProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
