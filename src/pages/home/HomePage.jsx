import { useRef } from 'react'
import HomeHeader               from '../../components/layout/HomeHeader'
import SkinReportCard           from './SkinReportCard'
import CategorySection          from './CategorySection'
import PopularProductsSection   from './PopularProductsSection'
import MiyubotBanner            from './MiyubotBanner'
import WeatherRecommendSection  from './WeatherRecommendSection'
import PersonalRecommendSection from './PersonalRecommendSection'
import TopReviewSection         from './TopReviewSection'
import { useGuide }             from '../../context/GuideContext'

export default function HomePage() {
  const { guideDone } = useGuide()
  const prevGuideDoneRef = useRef(guideDone)
  const justEndedRef = useRef(false)
  if (!prevGuideDoneRef.current && guideDone) justEndedRef.current = true
  prevGuideDoneRef.current = guideDone

  return (
    <div className={justEndedRef.current ? 'guide-done' : ''} style={{ paddingBottom: 60 }}>
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
