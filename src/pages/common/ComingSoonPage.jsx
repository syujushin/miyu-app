export default function ComingSoonPage({ title = '곧 만나요!', subtitle = '이 화면은 다음 업데이트에서 만나볼 수 있어요' }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '0 32px',
        textAlign: 'center',
      }}
    >
      {/* 아이콘 */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 24,
          backgroundColor: '#F6F2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
        }}
      >
        ✨
      </div>

      {/* 제목 */}
      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#242227',
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {title}
      </p>

      {/* 보조 텍스트 */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: '#78757D',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
