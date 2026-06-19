import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import logo         from '../../assets/logo/Top/Logo.svg'
import iconSearch   from '../../assets/Icon/ui/icon-search.svg'
import iconNotif    from '../../assets/Icon/ui/icon-notification.svg'
import iconCart     from '../../assets/Icon/ui/icon-cart.svg'

export default function HomeHeader() {
  const navigate = useNavigate()
  return (
    <>
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>
        <button onClick={() => navigate('/')} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
          <img src={logo} alt="miyu" style={{ width: 84, height: 29, display: 'block' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {[{ src: iconSearch, alt: '검색' }, { src: iconNotif, alt: '알림' }, { src: iconCart, alt: '장바구니' }].map(({ src, alt }) => (
            <button key={alt} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <img src={src} alt={alt} style={{ width: 28, height: 28, display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
