import { useNavigate } from 'react-router-dom'
import statusBarSvg  from '../../assets/Top/Status Bar.svg'
import arrowBack     from '../../assets/Icon/ui/icon-arrow-back.svg'
import chevronRight  from '../../assets/Icon/ui/icon-chevron-right.svg'
import logoIcon      from '../../assets/logo/logo-icon-square.svg'
import imgTint       from '../../assets/images/product/product-tint-fwee-pinkobsession-rosebeige.png'
import imgEye        from '../../assets/images/product/product-eyepalette-fwee-glass-02summer.jpg'
import imgBlusher    from '../../assets/images/product/product-cheek-dasique.png'

/* ── 피부 타입 분석 데이터 ── */
const SKIN_TYPES = [
  { label: '건성',  pct: 64, color: '#8257E0' },
  { label: '지성',  pct: 35, color: '#8257E0' },
  { label: '복합성', pct: 86, color: '#6633CC' },
]

/* ── 주요 피부 고민 데이터 ── */
const CONCERNS = [
  { label: '블랙헤드', pct: 77, color: '#6633CC' },
  { label: '트러블',   pct: 34, color: '#8257E0' },
  { label: '건조함',   pct: 52, color: '#8257E0' },
]

/* ── 어울리는/피하는 컬러 ── */
const GOOD_COLORS  = ['#F5C97A', '#F0A96B', '#E8856A', '#D4715E', '#C45A50']
const BAD_COLORS   = ['#D4AADC', '#C47FCC', '#9B6BBE', '#E066AA', '#D93580']

/* ── 추천 카테고리 ── */
const PRODUCT_CATS = [
  { img: imgTint,    label: '립',    sub: '코랄빛 핑크' },
  { img: imgEye,     label: '섀도우', sub: '골드 펄' },
  { img: imgBlusher, label: '블러셔', sub: '피치 코랄' },
]

/* ── 공통 컴포넌트 ── */
function SectionHeader({ title, showLink = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>{title}</span>
      {showLink && (
        <button style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3' }}>추천 제품</span>
          <img src={chevronRight} alt="" style={{ width: 14, height: 14, opacity: 0.4 }} />
        </button>
      )}
    </div>
  )
}

function BarItem({ label, pct, color }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#242227' }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 99, backgroundColor: '#F0EFF3', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, #6633CC, #9169EB)` }} />
      </div>
    </div>
  )
}

function InfoBox({ text }) {
  return (
    <div style={{ backgroundColor: '#F6F2FF', borderRadius: 10, padding: '12px 14px', marginTop: 4 }}>
      <p style={{ fontSize: 13, fontWeight: 400, color: '#5F5C66', margin: 0, lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}

export default function SkinDataPage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F7F6F9', minHeight: '100%' }}>

      {/* 상태바 */}
      <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />

      {/* 헤더 */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, position: 'relative', backgroundColor: '#F7F6F9' }}>
        <button onClick={() => navigate(-1)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
          <img src={arrowBack} alt="뒤로" style={{ width: 28, height: 28, display: 'block' }} />
        </button>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 17, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>
          나의 피부 데이터
        </span>
      </div>

      <div style={{ padding: '8px 16px 100px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── 복합성 피부 히어로 카드 ── */}
        <div style={{
          borderRadius: 16, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #E8DDFF 0%, #D4C5FF 30%, #F0C8E8 70%, #FFD6D6 100%)',
          padding: '24px 20px 28px',
          minHeight: 160,
        }}>
          {/* 배경 블롭 */}
          <div style={{ position: 'absolute', right: -20, top: -20, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,200,230,0.7) 0%, rgba(200,160,255,0.4) 50%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 20, bottom: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,200,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#242227', margin: '0 0 12px', letterSpacing: '-0.01em', position: 'relative' }}>
            복합성 피부
          </h2>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap', position: 'relative' }}>
            {['건성', '민감성', '복합성'].map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 500, color: '#6633CC', backgroundColor: 'rgba(255,255,255,0.65)', borderRadius: 99, padding: '3px 10px', border: '1px solid rgba(102,51,204,0.25)' }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: 14, fontWeight: 400, color: '#5F5C66', margin: 0, lineHeight: 1.6, position: 'relative' }}>
            이마와 코는 유분이 많고<br />볼과 턱은 건조한 복합성 피부
          </p>
        </div>

        {/* ── 피부 타입 분석 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <SectionHeader title="피부 타입 분석" />
          {SKIN_TYPES.map(item => <BarItem key={item.label} {...item} />)}
          <InfoBox text="복합성 피부는 T존은 유분이 많고 U존은 건조한, 부위별로 차이가 있는 피부 타입이에요." />
        </div>

        {/* ── 주요 피부 고민 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <SectionHeader title="주요 피부 고민" />
          {CONCERNS.map(item => <BarItem key={item.label} {...item} />)}
          <InfoBox text={"모공/블랙헤드가 가장 큰 고민이에요.\n피지 조절과 각질 관리에 집중하면 개선될 수 있어요."} />
        </div>

        {/* ── 봄웜 브라이트 히어로 카드 ── */}
        <div style={{
          borderRadius: 16, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #FFE8D6 0%, #FFD0C0 30%, #FFBCBC 70%, #FFA8C0 100%)',
          padding: '24px 20px 28px',
          minHeight: 160,
        }}>
          <div style={{ position: 'absolute', right: -10, top: -20, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,200,180,0.7) 0%, rgba(255,160,140,0.4) 50%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 30, bottom: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,160,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#242227', margin: '0 0 12px', letterSpacing: '-0.01em', position: 'relative' }}>
            봄웜 브라이트
          </h2>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap', position: 'relative' }}>
            {['코랄피치', '살몬오렌지', '로즈베이지'].map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 500, color: '#C04040', backgroundColor: 'rgba(255,255,255,0.65)', borderRadius: 99, padding: '3px 10px', border: '1px solid rgba(200,80,80,0.2)' }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: 14, fontWeight: 400, color: '#5F5C66', margin: 0, lineHeight: 1.6, position: 'relative' }}>
            따뜻하고 밝은 노란빛 베이스에<br />생기 있는 코랄 톤
          </p>
        </div>

        {/* ── 컬러 팔레트 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <SectionHeader title="컬러 팔레트" />

          {/* 어울려요 */}
          <p style={{ fontSize: 13, fontWeight: 500, color: '#78757D', margin: '0 0 8px' }}>어울려요</p>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {GOOD_COLORS.map((c, i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, backgroundColor: c }} />
            ))}
          </div>

          {/* 피하세요 */}
          <p style={{ fontSize: 13, fontWeight: 500, color: '#78757D', margin: '0 0 8px' }}>피하세요</p>
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {BAD_COLORS.map((c, i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, backgroundColor: c }} />
            ))}
          </div>

          {/* 추천 카테고리 */}
          <div style={{ display: 'flex', gap: 10 }}>
            {PRODUCT_CATS.map(({ img, label, sub }) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: 12, backgroundColor: '#F7F6F9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={img} alt={label} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#242227' }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 400, color: '#9D9AA3', marginTop: -4 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 스타일링 팁 ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px' }}>
          <SectionHeader title="스타일링 팁" />
          <p style={{ fontSize: 14, fontWeight: 400, color: '#5F5C66', margin: 0, lineHeight: 1.7 }}>
            복숭아, 코랄 톤의 의상과 액세서리를 선택하세요.<br />
            골드 계열 액세사리가 피부를 더욱 빛나게 만들어줍니다.
          </p>
        </div>

      </div>

      {/* ── 하단 고정 CTA ── */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '12px 16px 28px', backgroundColor: '#F7F6F9', zIndex: 30 }}>
        <button
          onClick={() => navigate('/miyubot')}
          style={{
            width: '100%', height: 54, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(90deg, #6633CC, #9169EB)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <img src={logoIcon} alt="" style={{ width: 22, height: 22, borderRadius: 6, display: 'block' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            미유봇으로 재진단하기
          </span>
        </button>
      </div>

    </div>
  )
}
