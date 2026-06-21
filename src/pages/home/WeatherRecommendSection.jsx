import addIcon      from '../../assets/images/home/add.svg'
import useWeather   from '../../hooks/useWeather'
import { getWeatherSvg }   from '../../utils/weatherSvg'
import { getWeatherIconBg } from '../../utils/weatherIcon'

import imgEsnatureOasis  from '../../assets/images/product/product-toner-esnature-oasis.png'
import imgAnua           from '../../assets/images/product/product-capsule-anua.png'
import imgEsnatureCream  from '../../assets/images/product/product-cream-esnature-squalane.webp'
import imgAtte           from '../../assets/images/product/product-suncream-atte.webp'

import HorizontalScroll from './shared/HorizontalScroll'

const PRODUCTS = [
  { id: 1, img: imgEsnatureOasis, name: '에스네이처', detail: '아쿠아 오아시스 토너 300ml',             price: '24,000' },
  { id: 2, img: imgAnua,          name: '아누아',     detail: '피디알엔 캡슐 100 세럼 50ml 대용량 기획', price: '23,500' },
  { id: 3, img: imgEsnatureCream, name: '에스네이처', detail: '아쿠아 스쿠알란 수분크림 60ml',          price: '23,500' },
  { id: 4, img: imgAtte,          name: '아떼',       detail: '비건 릴리프 무기자차 민감피부 선크림 50ml', price: '34,000' },
]

function WeatherProductCard({ img, name, detail, price, imgOffsetX = 0, imgSize = 80, guideIdx }) {
  return (
    <div
      data-guide-id={`weather-card-${guideIdx}`}
      style={{
        width: 95,
        height: 151,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 8px 0',
        }}
      >
        <img
          src={img}
          alt={name}
          draggable={false}
          style={{ width: imgSize, height: imgSize, objectFit: 'contain', display: 'block', transform: imgOffsetX ? `translateX(${imgOffsetX}px)` : undefined }}
        />
      </div>

      <div style={{ padding: '8px 8px 8px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {name}
        </p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {detail}
        </p>
        <p style={{ margin: 0, lineHeight: 1 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#6633CC' }}>{price}</span>
          <span style={{ fontSize: 11, fontWeight: 400, color: '#242227', marginLeft: 1 }}>원</span>
        </p>
      </div>
    </div>
  )
}

export default function WeatherRecommendSection() {
  const { data, loading } = useWeather()

  const weatherSubText = loading
    ? '날씨 불러오는 중...'
    : data
      ? `서울 ㅣ ${data.description} ${data.temp}°C`
      : '서울 날씨 정보 없음'

  return (
    <div>
      {/* 섹션 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 16, paddingRight: 16, marginBottom: 16 }}>
        {/* 날씨 아이콘 (주/야간 구분, Meteocons 내장 애니메이션) */}
        <div style={{
          width: 56, height: 56,
          borderRadius: 14,
          backgroundColor: getWeatherIconBg(data?.weatherId, data?.isNight),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          opacity: loading ? 0.5 : 1,
          transition: 'opacity 0.3s, background-color 0.5s',
        }}>
          <img
            src={getWeatherSvg(data?.weatherId)}
            alt="날씨 아이콘"
            width={40}
            height={40}
            style={{ display: 'block' }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 19, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.3 }}>
              오늘의 날씨 맞춤 추천
            </p>
            <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
              <img src={addIcon} alt="더보기" style={{ width: 46, height: 18, display: 'block' }} />
            </button>
          </div>
          <p style={{ fontSize: 13, fontWeight: 400, color: loading ? '#9D9AA3' : '#5F5C66', margin: '4px 0 0', lineHeight: 1, transition: 'color 0.3s' }}>
            {weatherSubText}
          </p>
        </div>
      </div>

      {/* 상품 가로 스크롤 */}
      <HorizontalScroll paddingX={16} gap={8}>
        {PRODUCTS.map((p, i) => (
          <WeatherProductCard key={p.id} {...p} guideIdx={i} />
        ))}
      </HorizontalScroll>
    </div>
  )
}
