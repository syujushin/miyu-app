import imgProfile from '../../assets/images/review/Profile.svg'

function StarRow({ rating }) {
  return (
    <div style={{ display: 'flex', gap: -1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={12} height={12} viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= rating ? '#C0A3F7' : '#DAD8DE'}
          />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCard({ id, user, badge, time, tags, rating, image, images, text, likes, helpful, wishlist, reactions, toggleReaction }) {
  const imgs = images ?? (image ? [image] : [])

  return (
    <>
      {/* 작성자 헤더 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <img src={imgProfile} alt="프로필" style={{ width: 58, height: 58, borderRadius: 99, flexShrink: 0, display: 'block' }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: 58, justifyContent: 'space-between' }}>
          {/* 닉네임 + 뱃지 + 시간/신고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: '#242227', lineHeight: 1 }}>{user}</span>
            <img src={badge} alt="" style={{ height: 19, display: 'block', flexShrink: 0 }} />
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.7 }}>{time}</span>
              <div style={{ width: 0.3, height: 10, backgroundColor: '#DAD8DE' }} />
              <span style={{ fontSize: 10, fontWeight: 400, color: '#9D9AA3', lineHeight: 1.7, cursor: 'pointer' }}>신고</span>
            </div>
          </div>
          {/* 피부 태그 */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {tags.map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 400, color: '#78757D', lineHeight: 1.5, borderRadius: 4, padding: '0 4px', backgroundColor: '#F7F6F9' }}>{t}</span>
            ))}
          </div>
          {/* 별점 */}
          <StarRow rating={rating} />
        </div>
      </div>

      {/* 리뷰 이미지 */}
      {imgs.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {imgs.map((img, i) => (
            <div key={i} style={{ width: 80, height: 80, borderRadius: 10, overflow: 'hidden', backgroundColor: '#F0EFF3', flexShrink: 0 }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      {/* 리뷰 텍스트 */}
      <p style={{ fontSize: 15, fontWeight: 400, color: '#5F5C66', margin: '0 0 20px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{text}</p>

      {/* 반응 버튼 */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[
          { label: '믿음이가요', count: likes },
          { label: '도움돼요', count: helpful },
          { label: '써보고싶어요', count: wishlist },
        ].map(({ label, count }) => {
          const active = reactions?.[id]?.[label]
          return (
            <button
              key={label}
              onClick={() => toggleReaction?.(id, label)}
              style={{
                padding: '6px 12px', borderRadius: 8, border: 'none',
                background: '#FFFFFF',
                boxShadow: active ? 'inset 0 0 0 1.5px #B08FF4' : 'inset 0 0 0 1px #F0EFF3',
                fontSize: 13, lineHeight: 1.5, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0,
              }}
            >
              <span style={{ fontWeight: active ? 600 : 500, color: active ? '#B08FF4' : '#9D9AA3' }}>{label}</span>
              <span style={{ fontWeight: 600, color: active ? '#B08FF4' : '#9D9AA3' }}>{active ? count + 1 : count}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
