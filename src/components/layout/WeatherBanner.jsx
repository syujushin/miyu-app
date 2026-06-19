import useWeather from '../../hooks/useWeather'
import { getWeatherSvg } from '../../utils/weatherSvg'
import closeIcon from '../../assets/Icon/weather/minus.svg'

export default function WeatherBanner({ onClose }) {
  const { data, loading, error } = useWeather()

  const tipText = loading
    ? '날씨 정보를 불러오는 중이에요...'
    : error || !data
      ? '오늘도 건강한 피부 관리 잊지 마세요!'
      : data.tip

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 8px 4px 16px',
        height: 38,
        flexShrink: 0,
        background: 'rgba(206, 183, 250, 0.10)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '0.5px solid rgba(255, 255, 255, 0.35)',
        boxShadow: [
          'inset 0 1px 0 rgba(255, 255, 255, 0.60)',
          'inset 1px 0 0 rgba(255, 255, 255, 0.20)',
          '0 2px 10px rgba(102, 51, 204, 0.08)',
        ].join(', '),
      }}
    >
      <img
        src={getWeatherSvg(data?.weatherId)}
        alt="날씨 아이콘"
        width={26}
        height={26}
        style={{ flexShrink: 0, display: 'block' }}
      />

      {/* 팁 텍스트 */}
      <p
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 400,
          color: loading ? '#9D9AA3' : '#6633CC',
          margin: 0,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          transition: 'color 0.3s ease',
        }}
      >
        {tipText}
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
