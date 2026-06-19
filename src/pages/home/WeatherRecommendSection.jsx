import addIcon      from '../../assets/images/home/add.svg'
import weatherSunny from '../../assets/Icon/weather/weather-sunny.svg'

import imgPcalm      from '../../assets/images/product/product-mist-pcalm.png'
import imgCetaphil   from '../../assets/images/product/product-lotion-cetaphil.png'
import imgCosrxPatch from '../../assets/images/product/product-troublepatch-cosrx.png'
import imgMixsoon    from '../../assets/images/product/product-eyecream-mixsoon.png'

import HorizontalScroll from './shared/HorizontalScroll'

/* 추후 실제 이미지로 교체 예정 */
const PRODUCTS = [
  { id: 1, img: imgPcalm,      name: 'P.CALM',   detail: '민감진정 수분 미스트',                   price: '16,000' },
  { id: 2, img: imgCetaphil,   name: '갈더마',    detail: '세타필 모이스처라이징 로션',              price: '19,000' },
  { id: 3, img: imgCosrxPatch, name: '코스알엑스', detail: '아크네 핌플 마스터 패치',                price: '6,500'  },
  { id: 4, img: imgMixsoon,    name: '믹순',      detail: '콩 아이크림 20ml',                      price: '19,500' },
]

/* 95×151(허그), 패딩 top8 right0 bottom8 left8, 태그/컨트롤 없음 */
function WeatherProductCard({ img, name, detail, price, imgOffsetX = 0 }) {
  return (
    <div
      style={{
        width: 95,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 이미지 80×80 — 가운데 정렬 */}
      <div
        style={{
          paddingTop: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={img}
          alt={name}
          draggable={false}
          style={{ width: 80, height: 80, objectFit: 'contain', display: 'block', transform: imgOffsetX ? `translateX(${imgOffsetX}px)` : undefined }}
        />
      </div>

      {/* 텍스트 영역 — padding: 8 0 8 8 */}
      <div
        style={{
          padding: '8px 0 8px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
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
  return (
    <div>
      {/* 섹션 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 16, paddingRight: 16, marginBottom: 16 }}>
        <img src={weatherSunny} alt="날씨" style={{ width: 48, height: 48, display: 'block', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          {/* 타이틀 + 더보기 같은 행 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 19, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.3 }}>
              오늘의 날씨 맞춤 추천
            </p>
            {/* TODO: 더보기 클릭 동작 연동 예정 */}
            <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
              <img src={addIcon} alt="더보기" style={{ width: 46, height: 18, display: 'block' }} />
            </button>
          </div>
          {/* TODO: 날씨 API 연동 예정 */}
          <p style={{ fontSize: 13, fontWeight: 400, color: '#5F5C66', margin: '4px 0 0', lineHeight: 1 }}>
            서울 ㅣ 맑음 15°C
          </p>
        </div>
      </div>

      {/* 상품 가로 스크롤 */}
      <HorizontalScroll paddingX={16} gap={8}>
        {PRODUCTS.map((p) => (
          <WeatherProductCard key={p.id} {...p} />
        ))}
      </HorizontalScroll>
    </div>
  )
}
