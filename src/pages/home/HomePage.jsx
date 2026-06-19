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
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#F4F3F7' }}>
        <HomeHeader />
      </div>

      <div className="stagger stagger-1" style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8 }}>
        <SkinReportCard />
      </div>

      <div className="stagger stagger-2" style={{ marginTop: 28 }}>
        <CategorySection />
      </div>

      <div className="stagger stagger-3" style={{ marginTop: 28 }}>
        <PopularProductsSection />
      </div>

      <div className="stagger stagger-4" style={{ marginTop: 28 }}>
        <MiyubotBanner />
      </div>

      <div className="stagger stagger-5" style={{ marginTop: 28 }}>
        <WeatherRecommendSection />
      </div>

      <div className="stagger stagger-6" style={{ marginTop: 28 }}>
        <PersonalRecommendSection />
      </div>

      <div className="stagger stagger-7" style={{ marginTop: 28 }}>
        <TopReviewSection />
      </div>
    </div>
  )
}
