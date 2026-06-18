export default function MyPage() {
  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold"
          style={{ background: 'linear-gradient(135deg, #7733FF, #BB99FF)' }}
        >
          미
        </div>
        <div>
          <p className="text-lg font-semibold" style={{ color: '#242227' }}>미유님</p>
          <p className="text-sm" style={{ color: '#78757D' }}>복합성 · 민감성</p>
        </div>
      </div>

      <div
        className="mt-6 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center"
        style={{ background: '#F6F2FF' }}
      >
        {[
          { label: '피부 점수', value: '82' },
          { label: '작성 리뷰', value: '12' },
          { label: '저장 제품', value: '28' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xl font-semibold" style={{ color: '#6633CC' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#78757D' }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {['피부 데이터 상세', '루틴 관리', '찜한 제품', '설정'].map((item) => (
          <button
            key={item}
            className="w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-medium text-left"
            style={{ background: '#F7F6F9', color: '#242227' }}
          >
            {item}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#9D9AA3" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
