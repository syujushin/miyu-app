import HomeHeader             from '../../components/layout/HomeHeader'
import SkinReportCard         from './SkinReportCard'
import CategorySection        from './CategorySection'
import PopularProductsSection from './PopularProductsSection'

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8 }}>
        <SkinReportCard />
      </div>
      <div style={{ marginTop: 28 }}>
        <CategorySection />
      </div>
      <div style={{ marginTop: 28 }}>
        <PopularProductsSection />
      </div>
    </div>
  )
}
