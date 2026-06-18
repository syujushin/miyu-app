import reportBg    from '../../assets/images/home/home-report-bg.png'
import waterDrop   from '../../assets/images/home/home-water-drop.png'
import chevronIcon from '../../assets/Icon/home-card-allow.svg'

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
  /* Fill FFFFFF 25% */
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

function MetricsCard({ metrics }) {
  return (
    <div
      style={{
        ...glass,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 12px',
        gap: 6,
      }}
    >
      {metrics.map(({ label, score }) => (
        <div key={label} style={{ width: '100%' }}>
          {/* alignItems: center → 라벨·숫자 세로 중앙 정렬 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 400, color: '#242227', lineHeight: 1.5 }}>
              {label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#7445D6', lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 10, fontWeight: 400, color: '#242227' }}>점</span>
            </div>
          </div>
          <div style={{ height: 2.5, borderRadius: 99, overflow: 'hidden', background: '#FFFFFF' }}>
            <div style={{ width: `${score}%`, height: '100%', borderRadius: 0, background: '#7445D6' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* 양 끝 라운딩(round), 솔리드 Primary 07 */
function DonutChart({ score, size = 58 }) {
  const sw = 3
  const r  = size / 2 - sw / 2
  const cx = size / 2
  const cy = size / 2
  const C  = 2 * Math.PI * r
  const progress = (score / 100) * C

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FFFFFF" strokeWidth={sw} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#7445D6"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={`${progress} ${C}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  )
}

export default function SkinReportCard() {
  const skinScore = 66

  return (
    /*
      position: relative → 쉐브론 absolute 배치
      display: flex + flexDirection: column + justifyContent: space-between
      → 인사텍스트(상단 20px) / 카드행(하단 20px) 패딩 정확히 맞춤
    */
    <div
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
      }}
    >
      {/* 쉐브론: 12×24, 내부 패딩 20 기준 우상단에 딱 붙임 */}
      <button
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          lineHeight: 0,
        }}
      >
        <img src={chevronIcon} alt="더보기" style={{ width: 12, height: 24, display: 'block' }} />
      </button>

      {/* 인사 텍스트 — 우측 쉐브론 영역 피하도록 paddingRight */}
      <div style={{ paddingRight: 24 }}>
        <p style={{ fontSize: 18, fontWeight: 600, color: '#242227', lineHeight: 1.4, margin: 0 }}>
          김구르님, 좋은 아침이에요.
        </p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#5F5C66', marginTop: 4, lineHeight: 1.5, marginBottom: 0 }}>
          오늘은 날씨가 건조하니<br />
          수분 보충에 더 힘써주세요
        </p>
      </div>

      {/* 3개 글래스 카드 — space-between으로 하단 패딩 20 자동 정렬 */}
      <div style={{ display: 'flex', gap: 9 }}>

        {/* 물방울 카드 */}
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

        {/* 도넛 카드 */}
        <div
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
