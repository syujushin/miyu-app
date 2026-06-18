export default function ExplorePage() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold" style={{ color: '#242227' }}>탐색</h1>
      <div
        className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-2"
        style={{ background: '#F0EFF3' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#9D9AA3" strokeWidth="1.8" />
          <path d="M20 20L16.65 16.65" stroke="#9D9AA3" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="text-sm" style={{ color: '#9D9AA3' }}>제품, 성분, 브랜드 검색</span>
      </div>
      <p className="mt-8 text-center text-sm" style={{ color: '#9D9AA3' }}>
        준비 중입니다
      </p>
    </div>
  )
}
