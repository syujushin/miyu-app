import logoMain from '../../assets/logo/logo-main.svg'

export default function MiyubotBanner() {
  return (
    <div style={{ paddingLeft: 16, paddingRight: 16 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 16px',
          height: 68,
          borderRadius: 12,
          background: '#E3D4FD',
          boxSizing: 'border-box',
        }}
      >
        {/* 글래스모피즘 원형 아이콘 */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 99,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'none',
          }}
        >
          <img src={logoMain} alt="miyu" style={{ width: 44, height: 44, objectFit: 'contain', display: 'block' }} />
        </div>

        {/* 텍스트 */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#242227',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            미유봇이 찾아준 맞춤 추천
          </p>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: '#78757D',
              margin: '2px 0 0',
              lineHeight: 1.4,
            }}
          >
            지금 당신에게 어울리는 제품이에요
          </p>
        </div>

        {/* 바로가기 버튼 — TODO: 미유봇 페이지 연동 예정 */}
        <button
          style={{
            width: 66,
            height: 27,
            padding: 0,
            borderRadius: 99,
            background: '#6633CC',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            바로가기
          </span>
        </button>
      </div>
    </div>
  )
}
