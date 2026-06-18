import HomeHeader               from '../../components/layout/HomeHeader'
import SkinReportCard           from './SkinReportCard'
import CategorySection          from './CategorySection'
import PopularProductsSection   from './PopularProductsSection'
import MiyubotBanner            from './MiyubotBanner'
import WeatherRecommendSection  from './WeatherRecommendSection'
import PersonalRecommendSection from './PersonalRecommendSection'
import TopReviewSection         from './TopReviewSection'

export default function HomePage() {
  return (
    <div style={{ paddingBottom: 60 }}>
      {/* 스테이터스바 + 앱 헤더 — 상단 고정 */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#F4F3F7' }}>
        <HomeHeader />
      </div>

      <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8 }}>
        <SkinReportCard />
      </div>

      <div style={{ marginTop: 28 }}>
        <CategorySection />
      </div>

      <div style={{ marginTop: 28 }}>
        <PopularProductsSection />
      </div>

      <div style={{ marginTop: 28 }}>
        <MiyubotBanner />
      </div>

      <div style={{ marginTop: 28 }}>
        <WeatherRecommendSection />
      </div>

      {/* 구르님을 위한 맞춤 추천 */}
      <div style={{ marginTop: 28 }}>
        <PersonalRecommendSection />
      </div>

      {/* 탑 리뷰어가 작성한 랭킹 아이템 */}
      <div style={{ marginTop: 28 }}>
        <TopReviewSection />
      </div>
    </div>
  )
}
