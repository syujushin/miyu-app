import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout      from './components/layout/AppLayout'
import HomePage       from './pages/home/HomePage'
import MyPage         from './pages/mypage/MyPage'
import MiyubotPage    from './pages/miyubot/MiyubotPage'
import ComingSoonPage from './pages/common/ComingSoonPage'
import AiDemoPage          from './pages/ai-demo/AiDemoPage'
import ProductReviewPage   from './pages/product-review/ProductReviewPage'
import ProductDetailPage   from './pages/product-detail/ProductDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index           element={<HomePage />} />
          <Route path="category" element={<ComingSoonPage title="곧 만나요!" subtitle="카테고리 화면은 다음 업데이트에서 만나볼 수 있어요" />} />
          <Route path="miyubot"  element={<MiyubotPage />} />
          <Route path="liked"    element={<ComingSoonPage title="곧 만나요!" subtitle="좋아요 화면은 다음 업데이트에서 만나볼 수 있어요" />} />
          <Route path="mypage"   element={<MyPage />} />
        </Route>
        {/* AI 데모 — 별도 레이아웃 없이 독립 페이지 */}
        <Route path="ai-demo" element={<AiDemoPage />} />
        <Route path="product-detail/:productId" element={<ProductDetailPage />} />
        <Route path="product-review/:productId" element={<ProductReviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}
