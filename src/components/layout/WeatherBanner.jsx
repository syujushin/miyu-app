import closeIcon from '../../assets/Icon/weather/minus.svg'

export default function WeatherBanner({ onClose }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 8px 4px 16px',
        height: 38,
        flexShrink: 0,
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '0.5px solid rgba(255, 255, 255, 0.28)',
        boxShadow: [
          'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          'inset 1px 0 0 rgba(255, 255, 255, 0.10)',
          '0 1px 6px rgba(36, 34, 39, 0.04)',
        ].join(', '),
      }}
    >
      {/* 날씨 아이콘 🌤️ */}
      <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>🌤️</span>

      {/* 텍스트 */}
      <p
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 400,
          color: '#6633CC',
          margin: 0,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        오늘은 맑고 건조해요. 보습에 신경 써주세요!
      </p>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={closeIcon} alt="닫기" style={{ width: 24, height: 24, display: 'block' }} />
      </button>
    </div>
  )
}
