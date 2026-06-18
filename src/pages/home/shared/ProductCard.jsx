import controlIcon from '../../../assets/Icon/control.svg'

export default function ProductCard({ img, name, detail, price, tags, clickable, imgSize = 100 }) {
  return (
    <div
      style={{
        width: 120,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: clickable ? 'auto' : 'none',
        cursor: clickable ? 'pointer' : 'default',
      }}
    >
      {/* 제품 이미지 100×100, 패딩 10px */}
      <div style={{ padding: '10px 10px 0', flexShrink: 0 }}>
        <img
          src={img}
          alt={name}
          draggable={false}
          style={{ width: imgSize, height: imgSize, objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* 텍스트 영역 */}
      <div
        style={{
          flex: 1,
          padding: '10px 6px 10px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        {/* 제품명 + 점3개 버튼 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flex: 1 }}>
            {name}
          </p>
          <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, pointerEvents: 'auto', display: 'flex' }}>
            <img src={controlIcon} alt="더보기" style={{ width: 16, height: 16, display: 'block' }} />
          </button>
        </div>

        {/* 세부 내용 */}
        <p style={{ fontSize: 12, fontWeight: 400, color: '#78757D', margin: 0, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {detail}
        </p>

        {/* 가격 */}
        <p style={{ margin: 0, lineHeight: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#6633CC', lineHeight: 1 }}>{price}</span>
          <span style={{ fontSize: 11, fontWeight: 400, color: '#242227', marginLeft: 1, lineHeight: 1 }}>원</span>
        </p>

        {/* 태그 */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: '#2B0073',
                backgroundColor: '#F8F5FF',
                borderRadius: 4,
                padding: '1px 6px',
                lineHeight: 1.6,
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
