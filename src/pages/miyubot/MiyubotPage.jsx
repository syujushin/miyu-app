export default function MiyubotPage() {
  return (
    <div className="flex flex-col h-full px-4 pt-6">
      <h1 className="text-2xl font-semibold" style={{ color: '#242227' }}>Miyubot</h1>
      <p className="text-sm mt-1" style={{ color: '#78757D' }}>AI 뷰티 어시스턴트</p>

      <div className="flex-1 mt-6 space-y-3">
        <div className="flex gap-2">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: 'linear-gradient(135deg, #7733FF, #BB99FF)' }}
          >
            M
          </div>
          <div
            className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%]"
            style={{ background: '#F6F2FF' }}
          >
            <p className="text-sm" style={{ color: '#242227' }}>
              안녕하세요! 저는 Miyubot이에요 💜<br />
              오늘 피부 고민이 있으신가요?
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-4 mb-2 rounded-2xl px-4 py-3 flex items-center gap-2"
        style={{
          background: 'rgba(253, 250, 255, 0.9)',
          border: '1px solid #DAD8DE',
        }}
      >
        <input
          className="flex-1 text-sm outline-none bg-transparent"
          placeholder="메시지를 입력하세요..."
          style={{ color: '#242227' }}
        />
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#6633CC' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
