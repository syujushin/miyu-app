export default function ReviewPage() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold" style={{ color: '#242227' }}>리뷰</h1>
      <p className="text-sm mt-1" style={{ color: '#78757D' }}>피부 적합도 기반 리뷰</p>

      <div className="mt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ background: '#F7F6F9', border: '1px solid #F0EFF3' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-full"
                style={{ background: '#ECE0FE' }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: '#242227' }}>사용자{i}</p>
                <p className="text-xs" style={{ color: '#9D9AA3' }}>Lv{i} · 건성</p>
              </div>
              <span
                className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#F0E8FF', color: '#6633CC' }}
              >
                적합도 {90 - i * 5}%
              </span>
            </div>
            <p className="text-sm" style={{ color: '#5F5C66' }}>
              피부에 잘 맞고 촉촉함이 오래 지속돼요.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
