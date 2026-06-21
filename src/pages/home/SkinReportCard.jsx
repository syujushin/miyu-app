import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import reportBg    from '../../assets/images/home/home-report-bg.png'
import waterDrop   from '../../assets/images/home/home-water-drop.png'
import chevronIcon from '../../assets/Icon/home-card-allow.svg'
import useWeather  from '../../hooks/useWeather'
import { useGuide } from '../../context/GuideContext'

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5  && h < 12) return '좋은 아침이에요'
  if (h >= 12 && h < 18) return '좋은 오후예요'
  if (h >= 18 && h < 22) return '좋은 저녁이에요'
  return '좋은 밤이에요'
}

function getCardTip(weatherId, humidity, temp) {
  if (!weatherId) return '오늘도 건강한 피부 관리\n잊지 마세요!'
  if (weatherId >= 200 && weatherId < 300) return '오늘은 천둥번개가 예상되는 날이에요.\n외출 시 피부 보호에 신경써주세요.'
  if (weatherId >= 300 && weatherId < 400) return '오늘은 가랑비가 내리는 날이에요.\n방수 메이크업으로 예쁨을 지켜요.'
  if (weatherId >= 500 && weatherId < 600) return '오늘은 비가 오는 날이에요.\n방수 메이크업으로 예쁨을 지켜요.'
  if (weatherId >= 600 && weatherId < 700) return '오늘은 눈이 내리는 날이에요.\n촉촉한 보습으로 피부를 지켜요.'
  if (weatherId >= 700 && weatherId < 800) return '오늘은 미세먼지 주의 날이에요.\n외출 후 꼼꼼한 클렌징 필수예요.'
  if (weatherId === 800) {
    if (temp >= 30) return '오늘은 햇살이 강한 날이에요.\n선크림 꼼꼼히 챙겨주세요.'
    if (humidity < 40) return '오늘은 맑지만 건조한 날이에요.\n수분 보충에 더 힘써주세요.'
    return '오늘은 맑고 좋은 날이에요.\n외출 전 자외선 차단 잊지 마세요.'
  }
  if (weatherId > 800) {
    if (humidity > 70) return '오늘은 흐리고 습한 날이에요.\n산뜻한 수분 밸런스 케어 추천해요.'
    return '오늘은 흐린 날씨예요.\n보습 케어를 잊지 마세요.'
  }
  return '오늘도 건강한 피부 관리\n잊지 마세요!'
}

const metrics = [
  { label: '수분', score: 56 },
  { label: '유분', score: 67 },
  { label: '탄력', score: 43 },
]

const glass = {
  width: 100,
  height: 100,
  borderRadius: 12,
  flexShrink: 0,
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '0.5px solid rgba(255, 255, 255, 0.28)',
  boxShadow: [
    'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
    'inset 1px 0 0 rgba(255, 255, 255, 0.10)',
    '0 1px 6px rgba(36, 34, 39, 0.04)',
  ].join(', '),
}

export function MetricsCard({ metrics, containerStyle, trackColor = '#FFFFFF', barColor = '#7445D6', labelSize = 10, scoreSize = 16, barHeight = 2.5, rowGap = 2 }) {
  const { guideVisible } = useGuide()
  const [ready, setReady] = useState(guideVisible)

  useEffect(() => {
    if (guideVisible) { setReady(true); return }
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [guideVisible])

  return (
    <div
      style={{
        ...glass,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 12px',
        gap: 6,
        ...containerStyle,
      }}
    >
      {metrics.map(({ label, score }) => (
        <div key={label} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: rowGap }}>
            <span style={{ fontSize: labelSize, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>
              {label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: scoreSize, fontWeight: 800, color: '#7445D6', lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: labelSize, fontWeight: 400, color: '#242227' }}>점</span>
            </div>
          </div>
          <div style={{ height: barHeight, borderRadius: 99, overflow: 'hidden', background: trackColor }}>
            <div style={{
              width: ready ? `${score}%` : '0%',
              height: '100%',
              background: barColor,
              transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function DonutChart({ score, size = 58 }) {
  const { guideVisible } = useGuide()
  const sw = 3
  const r  = size / 2 - sw / 2
  const cx = size / 2
  const cy = size / 2
  const C  = 2 * Math.PI * r
  const [animated, setAnimated] = useState(guideVisible ? (score / 100) * C : 0)

  useEffect(() => {
    const target = (score / 100) * C
    if (guideVisible) { setAnimated(target); return }
    const duration = 900
    const start    = performance.now()
    const easeOut  = (t) => 1 - Math.pow(1 - t, 3)
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setAnimated(target * easeOut(t))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [score, C, guideVisible])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FFFFFF" strokeWidth={sw} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#7445D6"
        strokeWidth={sw}
        strokeLinecap="butt"
        strokeDasharray={`${animated} ${C}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  )
}

export default function SkinReportCard() {
  const navigate  = useNavigate()
  const skinScore = 66
  const { data, loading } = useWeather()
  const greeting  = getGreeting()
  const tip = loading ? null : getCardTip(data?.weatherId, data?.humidity, data?.temp)

  return (
    <div
      data-guide-id="skin-report"
      onClick={() => navigate('/mypage/my-beauty')}
      style={{
        position: 'relative',
        height: 220,
        borderRadius: 12,
        overflow: 'hidden',
        padding: 20,
        backgroundImage: `url(${reportBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          lineHeight: 0,
        }}
      >
        <img src={chevronIcon} alt="더보기" style={{ width: 12, height: 24, display: 'block' }} />
      </div>


      <div style={{ paddingRight: 24 }}>
        <p style={{ fontSize: 18, fontWeight: 600, color: '#242227', lineHeight: 1.4, margin: 0 }}>
          김구르님, {greeting}.
        </p>
        <p style={{
          fontSize: 12, fontWeight: 400, color: '#5F5C66',
          marginTop: 4, lineHeight: 1.5, marginBottom: 0,
          opacity: tip ? 1 : 0, transition: 'opacity 0.4s',
          whiteSpace: 'pre-line',
        }}>
          {tip}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 9 }}>

        <div
          style={{
            ...glass,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <img
            src={waterDrop}
            alt="물방울 일러스트"
            style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }}
          />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#7445D6', lineHeight: 1 }}>1,250</span>
            <span style={{ fontSize: 10, fontWeight: 400, color: '#242227' }}>ml/2L</span>
          </div>
        </div>

        <MetricsCard metrics={metrics} />

        <div
          data-guide-id="skin-score-card"
          style={{
            ...glass,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            paddingTop: 1,
          }}
        >
          <div style={{ position: 'relative' }}>
            <DonutChart score={skinScore} size={58} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#7445D6', lineHeight: 1 }}>{skinScore}</span>
                <span style={{ fontSize: 10, fontWeight: 400, color: '#242227' }}>점</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 10, fontWeight: 400, color: '#242227', margin: 0 }}>피부 점수</p>
        </div>

      </div>
    </div>
  )
}
