import statusBarSvg from '../../assets/Top/Status Bar.svg'
import logo         from '../../assets/logo/Top/Logo.svg'
import iconSearch   from '../../assets/Icon/ui/icon-search.svg'
import iconNotif    from '../../assets/Icon/ui/icon-notification.svg'
import iconCart     from '../../assets/Icon/ui/icon-cart.svg'

export default function HomeHeader() {
  return (
    <>
      {/* Status Bar 에셋 */}
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />

      {/* 앱 헤더 */}
      <div
        style={{
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <img src={logo} alt="miyu" style={{ width: 84, height: 29, display: 'block' }} />

        {/* 아이콘 28px, 간격 8px */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {[
            { src: iconSearch, alt: '검색' },
            { src: iconNotif,  alt: '알림' },
            { src: iconCart,   alt: '장바구니' },
          ].map(({ src, alt }) => (
            <button
              key={alt}
              style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
            >
              <img src={src} alt={alt} style={{ width: 28, height: 28, display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
