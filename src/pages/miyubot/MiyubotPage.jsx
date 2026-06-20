import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MetricsCard } from '../home/SkinReportCard'

import statusBarSvg  from '../../assets/Top/Status Bar.svg'
import logoSvg       from '../../assets/logo/Top/Logo.svg'
import logoIcon      from '../../assets/logo/logo-icon-square.svg'
import homeIcon      from '../../assets/Icon/home-inactive.svg'
import menuIcon      from '../../assets/Icon/ui/icon-menu.svg'
import newChatIcon   from '../../assets/Icon/ui/Top/icon-newchat.svg'
import chevronIcon   from '../../assets/Icon/ui/Recommend/chevron.svg'
import cameraIcon     from '../../assets/Icon/miyubot-camera.svg'
import sendIcon        from '../../assets/Icon/miyubot-send.svg'
import { CamFaceMesh, CameraOverlay } from '../../components/camera/FaceScanCamera'
import heartActive   from '../../assets/Icon/ui/icon-heart-active.svg'
import heartInactive from '../../assets/Icon/ui/icon-heart-inactive.svg'

/* ── 데이터 ── */
const SKIN_CHIPS     = ['복합성 피부', '건조함', '모공']
const PERSONAL_CHIPS = ['봄웜라이트', '살몬코랄', '로즈베이지']
const SUGGESTION_CHIPS = [
  '무화과 메이크업에 어울리는 블러셔를 찾고 있어',
  '봄웜 라이트 전용 신상 추천해줘',
  '코랄빛이 살짝 도는 로즈베이지색의 틴트 제품 추천해줘',
]
import img11 from '../../assets/images/product/product-blusher-vdl.png'
import img12 from '../../assets/images/product/product-cheek-banilaco.png'
import img13 from '../../assets/images/product/product-cheek-dasique.png'

import { findProductByName, MIYU_PRODUCTS } from '../../data/products'

/* ── 루틴 단계 데이터 ── */
const ROUTINE_DATA = {
  evening: {
    intro: '무자극 보습 중심으로 피부 장벽을 안정시키는 게 우선이에요. 구르님의 피부 데이터를 기반으로 저녁 루틴 5단계를 추천드릴게요. 건조함, 민감성 피부에 맞춘 루틴이에요.',
    steps: [
      { step: 1, name: '토너',     reason: '저분자 히알루론산이 피부 깊숙이 수분을 채워주고 후속 제품 흡수력을 높여줘요',                       product: '토리든 다이브인 저분자 히알루론산 토너', price: '14,900' },
      { step: 2, name: '앰플',     reason: '3종 세라마이드 복합체가 예민해진 피부 장벽을 집중적으로 회복시켜 자극을 줄여줘요',                   product: '앰플엔 세라마이드샷 앰플',             price: '14,900' },
      { step: 3, name: '세럼',     reason: '스쿠알란 성분이 건조함을 채우고 민감성 피부에 자극 없이 수분막을 형성해줘요',                         product: '에스네이처 아쿠아 스쿠알란',           price: '24,000' },
      { step: 4, name: '크림',     reason: '아토베리어 복합체가 피부 장벽을 강화하고 수분 손실을 막아 다음 날 촉촉함을 유지해줘요',               product: '에스트라 아토베리어365 크림 80ml',     price: '33,000' },
      { step: 5, name: '수분 마스크', reason: '티트리 성분이 진정 효과를 주면서 수면 중 피부를 촉촉하게 케어해 다음 날 맑은 피부를 만들어줘요', product: '메디힐 티트리 케어 솔루션 에센셜 마스크', price: '12,900' },
    ],
  },
  morning: {
    intro: '외출 전 자외선과 환경 자극으로부터 피부를 보호하는 게 중요해요. 구르님의 피부 데이터를 기반으로 아침 루틴 5단계를 추천드릴게요. 가볍고 산뜻하게 흡수되는 제품 위주로 구성했어요.',
    steps: [
      { step: 1, name: '토너',     reason: '가볍고 산뜻하게 흡수되며 수분 공급과 동시에 피부 결을 정돈해줘요',                                 product: '파티온 포도당 하이드로 에센스 토너 500ml', price: '29,000' },
      { step: 2, name: '세럼',     reason: '피디알엔 성분이 피부 장벽을 보호하면서 가볍게 흡수되어 속건조를 예방해줘요',                         product: '아누아 피디알엔 캡슐',                 price: '23,500' },
      { step: 3, name: '크림',     reason: '가벼운 텍스처로 피부에 자연스럽게 흡수되어 메이크업 밀착력을 높여줘요',                               product: '에스트라 아토베리어365 크림 80ml',     price: '33,000' },
      { step: 4, name: '선크림',   reason: '자작나무 수분 성분이 피부 보습을 유지하면서 SPF50+/PA++++ 강력 자외선 차단으로 피부를 보호해줘요',  product: '라운드랩 자작나무 수분 선크림',          price: '15,000' },
      { step: 5, name: '베이스 마무리', reason: '피부 톤을 자연스럽게 정리하고 메이크업 지속력을 높여 외출 준비를 마무리해줘요',                  product: 'VDL 치크스테인 블러셔 01 바운딩 피치', price: '12,900' },
    ],
  },
}

const BLUSHER_PRODUCTS = [
  { id: 1, img: img11, name: 'VDL 치크스테인 블러셔',          price: '12,900', reason: '봄웜 피부에 딱 맞는 라이트 피치 발색으로 화사한 혈색을 연출해줘요' },
  { id: 2, img: img12, name: '바닐라코 프라이밍 베일 치크 6g 5종', price: '12,000', reason: '피치 계열의 생기 있는 발색으로 건강하고 자연스러운 혈색 메이크업 완성' },
  { id: 3, img: img13, name: '데이지크 블렌딩 무드 치크',          price: '24,000', reason: '피치·코랄 베이지 톤이 물들듯 스며들어 구르님 퍼스널 컬러에 잘 어울려요' },
]
const CATEGORIES = [
  { label: '기초케어',  key: 'skincare' },
  { label: '메이크업',  key: 'makeup' },
  { label: '이너뷰티',  key: 'innerbeauty' },
  { label: '디바이스',  key: 'device' },
  { label: '피부진단',  key: 'diagnosis' },
]

/* ── 제품 이미지 — src 없거나 로드 실패 시 브랜드 플레이스홀더 표시 ── */
function ProductImg({ src, name, size = 44 }) {
  const [err, setErr] = useState(false)
  if (!src || err) {
    return (
      <div style={{ width: size, height: size, borderRadius: 8, backgroundColor: '#ECE0FE', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logoIcon} alt="" style={{ width: Math.round(size * 0.55), height: Math.round(size * 0.55), borderRadius: 4, display: 'block' }} />
      </div>
    )
  }
  return (
    <img src={src} alt={name} draggable={false} onError={() => setErr(true)}
      style={{ width: size, height: size, objectFit: 'contain', borderRadius: 8, flexShrink: 0, display: 'block' }} />
  )
}

/* ── 공통 스타일 ── */
const skinChipStyle = {
  fontSize: 12, fontWeight: 400, color: '#242227',
  backgroundColor: '#F6F2FF', borderRadius: 8,
  padding: '3px 6px', lineHeight: 1.5, whiteSpace: 'nowrap',
}
const botCardStyle = {
  borderRadius: '0 20px 20px 20px',
  backgroundColor: '#F7F6F9',
  padding: 16,
  marginBottom: 20,
  width: '100%',
  maxWidth: 320,
}

/* ── 사용자 말풍선 ── */
function UserBubble({ text }) {
  return (
    <div className="msg-user" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
      <div style={{
        backgroundColor: '#6633CC',
        borderRadius: '20px 0 20px 20px',
        padding: '16px 16px',
        maxWidth: '75%',
        fontSize: 15, fontWeight: 400, color: '#FFFFFF',
        lineHeight: 1.5, letterSpacing: '-0.01em', whiteSpace: 'pre-line',
      }}>
        {text}
      </div>
    </div>
  )
}

/* ── 하트 버튼 (바운스 포함) ── */
function HeartButton({ size = 20 }) {
  const [liked, setLiked] = useState(false)
  const [pop,   setPop]   = useState(false)
  const toggle = () => {
    setLiked(p => !p)
    setPop(true)
    setTimeout(() => setPop(false), 300)
  }
  return (
    <button onClick={toggle} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, alignSelf: 'center', pointerEvents: 'auto' }}>
      <img src={liked ? heartActive : heartInactive} alt="좋아요"
        className={pop ? 'heart-pop' : ''}
        style={{ width: size, height: size, display: 'block', transition: 'none' }} />
    </button>
  )
}

/* ── 루틴 단계 카드 아이템 ── */
function RoutineStepItem({ step, name, reason, product, price }) {
  const [liked, setLiked] = useState(false)
  const found  = findProductByName(product)
  const imgSrc = found?.img ?? null

  return (
    <div style={{ backgroundColor: '#F7F6F9', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
      {/* 단계 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 26, height: 26, borderRadius: 99, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6633CC' }}>{step}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>{name}</span>
        </div>
        <img src={chevronIcon} alt="" style={{ width: 20, height: 20, display: 'block', flexShrink: 0 }} />
      </div>

      {/* 추천 이유 — 라벨 14 SemiBold, 서브텍스트 14 Regular */}
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#6633CC', margin: '0 0 3px', lineHeight: 1.4 }}>추천 이유</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5 }}>{reason}</p>
      </div>

      {/* 제품 서브카드 — 흰색, 276×69, 패딩 12 */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: '12px 12px', height: 59, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10 }}>
        <ProductImg src={imgSrc} name={product} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#242227', margin: 0, lineHeight: 1.5, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{product}</p>
          <p style={{ margin: '-3px 0 0', lineHeight: 1.4 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#6633CC' }}>{price}</span>
            <span style={{ fontSize: 10, color: '#242227', marginLeft: 1 }}>원</span>
          </p>
        </div>
        <HeartButton />
      </div>
    </div>
  )
}

/* ── 루틴 응답 전체 (텍스트 + 5단계 카드) ── */
function RoutineResponse({ timeSlot }) {
  const data = ROUTINE_DATA[timeSlot]
  if (!data) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
      {/* 인트로 텍스트 카드 — marginBottom 0으로 덮어씌워 gap만 사용 */}
      <div style={{ ...botCardStyle, marginBottom: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.6 }}>
          {data.intro}
        </p>
      </div>
      {/* 5단계 스텝 카드 */}
      {data.steps.map(s => <RoutineStepItem key={s.step} {...s} />)}
    </div>
  )
}

/* ── 피부진단 결과 카드 ── */
function SkinDiagnosisCard({ onAction }) {
  const diagData = [
    {
      title: '구르님의 피부 타입',
      chips: ['복합성 피부', '건조함', '민감성'],
    },
    {
      title: '구르님의 퍼스널 컬러',
      chips: ['봄웜라이트', '살몬코랄', '로즈베이지'],
    },
    {
      title: '구르님의 사용 중인 디바이스',
      chips: ['LG 프라엘 LED 마스크'],
    },
  ]
  return (
    <div>
      <div style={{ ...botCardStyle, marginBottom: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: '0 0 12px', lineHeight: 1.4 }}>
          최근 피부 진단 기록
        </p>
        {diagData.map((d, i) => (
          <div key={d.title} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '12px 14px', marginBottom: i < diagData.length - 1 ? 8 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <img src={logoIcon} alt="miyu" style={{ width: 20, height: 20, borderRadius: 6, display: 'block', flexShrink: 0 }} />
              <p style={{ fontSize: 14, fontWeight: 600, color: '#242227', margin: 0 }}>{d.title}</p>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {d.chips.map(c => <span key={c} style={skinChipStyle}>{c}</span>)}
            </div>
          </div>
        ))}
      </div>
      {/* 액션 버튼 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 20 }}>
        {['피부 상태 재진단 방법', '피부 진단 기록보기'].map(label => (
          <button
            key={label}
            onClick={() => onAction(label)}
            style={{ padding: '12px 20px', borderRadius: 99, backgroundColor: '#F6F2FF', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#6633CC', lineHeight: 1.5, letterSpacing: '-0.01em' }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 재진단 방법 카드 ── */
function DiagnosisMethodCard() {
  const methods = [
    { tag: '카메라로 즉시 촬영', desc: "'+' 버튼 눌러 카메라 선택, 촬영 후 고민 설명" },
    { tag: '이미지 업로드',       desc: "'+' 버튼 눌러 이미지 선택 후 고민 설명" },
  ]
  return (
    <div style={{ ...botCardStyle, marginBottom: 0 }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#242227', margin: '0 0 12px', lineHeight: 1.4 }}>
        피부 상태 재진단 방법
      </p>
      {methods.map((m, i) => (
        <div key={m.tag} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '12px 14px', marginBottom: i < methods.length - 1 ? 8 : 0 }}>
          <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 500, color: '#242227', backgroundColor: '#F6F2FF', borderRadius: 99, padding: '3px 10px', marginBottom: 8 }}>
            {m.tag}
          </span>
          <p style={{ fontSize: 13, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.55 }}>{m.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── 기초케어 초기 카드 (피부 기록 + 질문) ── */
function SkincareInitCard() {
  return (
    <div style={{ ...botCardStyle, marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: '0 0 12px', lineHeight: 1.5 }}>
        구르님의 최근 피부 상태를 알려드릴게요.
      </p>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          <img src={logoIcon} alt="miyu" style={{ width: 20, height: 20, borderRadius: 6, display: 'block', flexShrink: 0 }} />
          <p style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.5 }}>구르님의 피부 기록</p>
          <span style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3' }}>11/29</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {SKIN_CHIPS.map(c => <span key={c} style={skinChipStyle}>{c}</span>)}
        </div>
      </div>
      <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5 }}>
        오늘은 어떤 고민이 있으신가요?<br />
        정확한 솔루션을 제시해드리겠습니다.
      </p>
    </div>
  )
}

/* ── 루틴 시간대 선택 칩 ── */
function RoutineChips({ onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 12, marginBottom: 0 }}>
      {['아침 외출 전', '저녁 외출 후'].map(label => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          style={{ padding: '12px 20px', borderRadius: 99, backgroundColor: '#F6F2FF', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#6633CC', lineHeight: 1.5, letterSpacing: '-0.01em' }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ── 메이크업 봇 카드 (퍼스널 컬러) ── */
function MakeupBotCard() {
  return (
    <div style={{ ...botCardStyle, marginBottom: 12 }}>
      <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: '0 0 12px', lineHeight: 1.5 }}>
        구르님의 퍼스널을 기반으로 추천해드릴게요.
      </p>
      <p style={{ fontSize: 13, fontWeight: 500, color: '#78757D', margin: '0 0 8px', lineHeight: 1.4 }}>
        퍼스널 진단 기록
      </p>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          <img src={logoIcon} alt="miyu" style={{ width: 20, height: 20, borderRadius: 6, display: 'block', flexShrink: 0 }} />
          <p style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.5 }}>
            구르님의 퍼스널 컬러
          </p>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {PERSONAL_CHIPS.map(c => <span key={c} style={skinChipStyle}>{c}</span>)}
        </div>
      </div>
      <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5 }}>
        어떤 메이크업 제품을 추천 받고 싶으신가요?
      </p>
    </div>
  )
}

/* ── 블러셔 봇 텍스트 카드 ── */
function BlusherTextCard() {
  return (
    <div style={{ ...botCardStyle, marginBottom: 12 }}>
      <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: '0 0 14px', lineHeight: 1.6 }}>
        구르님은 따뜻하고 화사한 21호 봄 웜톤이에요. 피부 톤에 자연스럽게 녹아드는 코랄과 피치 베이지 블러셔가 가장 잘 어울려요.
      </p>
      <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.6 }}>
        요청하신 무화과 메이크업처럼 은은하고 부드러운 룩에는 이런 컬러들이 얼굴에 따뜻한 생기를 더해주고, 전체 메이크업 톤을 한층 조화롭게 완성해 줄 거예요.
      </p>
    </div>
  )
}

/* ── 블러셔 개별 제품 카드 — 300×205(hug), padding 12, radius 20 ── */
function BlusherProductCard({ img, name, price, reason }) {
  const [liked, setLiked] = useState(false)
  return (
    <div style={{
      width: 280,
      borderRadius: 20,
      backgroundColor: '#F7F6F9',
      padding: 16,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxSizing: 'border-box',
    }}>
      {/* 흰색 제품 영역 — 276×69 */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: '12px 12px',
        height: 69,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <ProductImg src={img} name={name} />

        {/* 제품명 + 가격 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#242227', margin: '0 0 3px', lineHeight: 1.4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {name}
          </p>
          <p style={{ margin: 0, lineHeight: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#6633CC' }}>{price}</span>
            <span style={{ fontSize: 11, fontWeight: 400, color: '#242227', marginLeft: 1 }}>원</span>
          </p>
        </div>

        <HeartButton />
      </div>

      {/* 추천 이유 라벨 + 텍스트 (줄바꿈) */}
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#6633CC', margin: '0 0 2px', lineHeight: 1.5 }}>
          추천 이유
        </p>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5, minHeight: 42, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {reason}
        </p>
      </div>

      {/* 구매하기 버튼 — 276×44 */}
      <button style={{
        width: '100%',
        height: 44,
        padding: 0,
        borderRadius: 12,
        backgroundColor: '#6633CC',
        border: 'none',
        cursor: 'pointer',
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
        pointerEvents: 'auto',
        boxSizing: 'border-box',
      }}>
        구매하기
      </button>
    </div>
  )
}

/* ── 블러셔 제품 가로 스크롤 ── */
function BlusherProductScroll() {
  const scrollRef  = useRef(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => { isDragging.current = true; startX.current = e.pageX - scrollRef.current.offsetLeft; scrollLeft.current = scrollRef.current.scrollLeft }
  const onMouseMove = (e) => { if (!isDragging.current) return; scrollRef.current.scrollLeft = scrollLeft.current - (e.pageX - scrollRef.current.offsetLeft - startX.current) }
  const onMouseUp   = () => { isDragging.current = false }

  return (
    <div
      ref={scrollRef}
      className="category-scroll"
      style={{ overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', marginBottom: 20, cursor: 'grab', userSelect: 'none' }}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
    >
      <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
        {BLUSHER_PRODUCTS.map(p => <BlusherProductCard key={p.id} {...p} />)}
      </div>
    </div>
  )
}

/* ── GPT 추천 제품 카드 ── */
function GptProductCard({ name, price, reason }) {
  const [liked, setLiked] = useState(false)
  const found = findProductByName(name)
  const imgSrc = found?.img ?? null

  return (
    <div style={{ width: 280, borderRadius: 20, backgroundColor: '#F7F6F9', padding: 16, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
      {/* 흰색 제품 영역 */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '12px 12px', height: 69, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 12 }}>
        <ProductImg src={imgSrc} name={name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#242227', margin: '0 0 3px', lineHeight: 1.4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</p>
          <p style={{ margin: 0, lineHeight: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#6633CC' }}>{price}</span>
            <span style={{ fontSize: 11, fontWeight: 400, color: '#242227', marginLeft: 1 }}>원</span>
          </p>
        </div>
        <HeartButton />
      </div>
      {/* 추천 이유 */}
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#6633CC', margin: '0 0 2px', lineHeight: 1.5 }}>추천 이유</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5, minHeight: 42, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{reason}</p>
      </div>
      {/* 구매하기 */}
      <button style={{ width: '100%', height: 44, padding: 0, borderRadius: 12, backgroundColor: '#6633CC', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 14, fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', pointerEvents: 'auto', boxSizing: 'border-box' }}>
        구매하기
      </button>
    </div>
  )
}

/* ── GPT 추천 제품 가로 스크롤 ── */
function GptProductScroll({ products }) {
  const scrollRef  = useRef(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)
  const onMouseDown = (e) => { isDragging.current = true; startX.current = e.pageX - scrollRef.current.offsetLeft; scrollLeft.current = scrollRef.current.scrollLeft }
  const onMouseMove = (e) => { if (!isDragging.current) return; scrollRef.current.scrollLeft = scrollLeft.current - (e.pageX - scrollRef.current.offsetLeft - startX.current) }
  const onMouseUp   = () => { isDragging.current = false }
  return (
    <div ref={scrollRef} className="category-scroll" style={{ overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', marginBottom: 0, cursor: 'grab', userSelect: 'none' }}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
        {products.map((p, i) => <GptProductCard key={i} {...p} />)}
      </div>
    </div>
  )
}

/* ── 추천 질문 칩 (세로 스택) ── */
function SuggestionChips({ items, onChipClick }) {
  const CORAL_ITEM = '코랄빛이 살짝 도는 로즈베이지색의 틴트 제품 추천해줘'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
      {items.map((item, i) => (
        <button key={i}
          onClick={() => onChipClick(item)}
          style={{
            padding: '12px 20px', borderRadius: 99,
            backgroundColor: '#F6F2FF', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 500, color: '#6633CC',
            textAlign: 'left', lineHeight: 1.5, letterSpacing: '-0.01em',
          }}
        >
          {item === CORAL_ITEM
            ? <>코랄빛이 살짝 도는 로즈베이지색의 틴트 제품<br />추천해줘</>
            : item}
        </button>
      ))}
    </div>
  )
}

/* ── 사용자 사진 말풍선 ── */
function UserPhotoBubble({ dataUrl }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
      <img
        src={dataUrl}
        alt="촬영한 사진"
        style={{ maxWidth: '68%', maxHeight: 200, borderRadius: '16px 0 16px 16px', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

/* ── 피부 진단 결과 카드 (카메라 촬영 후 채팅 내 표시) ── */
function SkinResultCard({ skinData }) {
  const SCORE      = skinData?.score      ?? 72
  const SKIN_TYPE  = skinData?.skin_type  ?? '수분 부족형 복합성 민감 피부'
  const TAGS       = skinData?.tags       ?? ['유수분 불균형', '속건조', '민감 반응']
  const COMMENT    = skinData?.comment    ?? "현재 T존의 과다 유분과 U존의 건조함이 동시에\n관찰되며, 자가 진단 대로 '수부지' 성향이 강합니다."
  const ANALYSIS   = skinData?.analysis   ?? [
    '구르님의 경우, 낮은 음수량과 부족한 수면 습관이 피부 장벽 기능 약화와 속건조를 심화시켜 민감도를 높이는 핵심 원인으로 분석됩니다.',
    '하루 8잔 이상의 물 섭취와 7시간 이상의 충분한 수면으로 피부 재생력을 높이고, T존과 U존을 분리한 맞춤 케어를 실천하세요.',
  ]
  const metrics    = [
    { label: '수분량', value: skinData?.moisture   ?? 45 },
    { label: '유분량', value: skinData?.sebum       ?? 56 },
    { label: '탄력',   value: skinData?.elasticity  ?? 72 },
  ]

  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const size = 56, sw = 4, r = size / 2 - sw / 2, C = 2 * Math.PI * r
  const dash = ready ? (SCORE / 100) * C : 0

  return (
    <div style={{ ...botCardStyle, marginBottom: 0 }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#242227' }}>피부 진단 결과</span>
      </div>

      {/* 피부 타입 + 원형 게이지 */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: '#242227', margin: 0, lineHeight: 1.5 }}>{SKIN_TYPE}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {TAGS.map(tag => (
              <span key={tag} style={skinChipStyle}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', flexShrink: 0, width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="donutGauge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7733FF" />
                <stop offset="100%" stopColor="#BB99FF" />
              </linearGradient>
            </defs>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F0EFF3" strokeWidth={sw} />
            <circle
              cx={size/2} cy={size/2} r={r}
              fill="none"
              stroke="url(#donutGauge)"
              strokeWidth={sw}
              strokeDasharray={`${dash} ${C}`}
              transform={`rotate(-90 ${size/2} ${size/2})`}
              style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#6633CC', lineHeight: 1 }}>{SCORE}</span>
              <span style={{ fontSize: 12, fontWeight: 400, color: '#242227' }}>점</span>
            </div>
          </div>
        </div>
      </div>

      {/* 지표 바 — 홈 화면 MetricsCard 컴포넌트 재사용 */}
      <MetricsCard
        metrics={metrics.map(({ label, value }) => ({ label, score: value }))}
        trackColor="#F0EFF3"
        barColor="linear-gradient(90deg, #BB99FF, #7733FF)"
        labelSize={12}
        scoreSize={12}
        barHeight={4}
        rowGap={4}
        containerStyle={{
          width: '100%', height: 'auto', flexShrink: 'unset',
          background: '#FFFFFF', backdropFilter: 'none', WebkitBackdropFilter: 'none',
          border: 'none', boxShadow: 'none',
          borderRadius: 12, padding: 12, gap: 12, marginBottom: 10,
        }}
      />

      {/* 코멘트 — Primary 18 박스 */}
      <div style={{ backgroundColor: '#F0E9FF', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{COMMENT}</p>
      </div>

      {/* 분석 텍스트 */}
      {ANALYSIS.map((text, i) => (
        <p key={i} style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, marginBottom: i < ANALYSIS.length - 1 ? 12 : 0, lineHeight: 1.6 }}>{text}</p>
      ))}
    </div>
  )
}

/* ── 메인 페이지 ── */
export default function MiyubotPage() {
  const navigate  = useNavigate()
  const [messages,     setMessages]   = useState([])
  const [inputValue,   setInputValue] = useState('')
  const [isTyping,     setIsTyping]   = useState(false)
  const isComposing = useRef(false)   // IME 한글 조합 중 여부
  const [showCamera, setShowCamera] = useState(false)
  const [gptHistory,   setGptHistory] = useState([])  // GPT 대화 컨텍스트
  const [gptTurnCount, setGptTurnCount] = useState(0) // GPT 응답 횟수 (1턴=첫 응답)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const resetChat = () => {
    setMessages([])
    setGptHistory([])
    setInputValue('')
    setIsTyping(false)
    setGptTurnCount(0)
  }

  // 점 세개 표시 후 봇 메시지 추가 (프리메이드 응답용)
  const showTypingThen = (botMsgs, delay = 900) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, ...botMsgs])
      setIsTyping(false)
    }, delay)
  }

  const handleDiagnosisAction = (label) => {
    if (label === '피부 상태 재진단 방법') {
      setMessages(prev => [...prev, { type: 'user', text: label }])
      showTypingThen([{ type: 'bot-diagnosis-method' }])
    } else {
      // TODO: 피부 진단 기록보기 연동 예정
      console.log('피부 진단 기록보기')
    }
  }

  const handleRoutineSelect = (label) => {
    if (isTyping) return
    const timeSlot = label === '아침 외출 전' ? 'morning' : 'evening'
    setGptHistory(prev => [...prev,
      { role: 'user', content: label },
      { role: 'assistant', content: `${label} 루틴 5단계를 추천드렸습니다.` },
    ])
    setMessages(prev => [...prev, { type: 'user', text: label }])
    showTypingThen([{ type: 'bot-routine', timeSlot }])
  }

  const handleCategory = (key) => {
    if (isTyping) return
    if (key === 'skincare') {
      setMessages(prev => [...prev, { type: 'user', text: '기초케어' }])
      showTypingThen([{ type: 'bot-skincare' }])
    } else if (key === 'makeup') {
      setMessages(prev => [...prev, { type: 'user', text: '메이크업' }])
      showTypingThen([
        { type: 'bot-makeup' },
        { type: 'chips', items: SUGGESTION_CHIPS },
      ])
    } else if (key === 'innerbeauty' || key === 'device') {
      // 이너뷰티·디바이스 → GPT API 자연어 연결
      const labelMap = { innerbeauty: '이너뷰티', device: '디바이스' }
      const label = labelMap[key]
      const userMsg = { role: 'user', content: label }
      const nextHistory = [...gptHistory, userMsg]
      setGptHistory(nextHistory)
      setMessages(prev => [...prev, { type: 'user', text: label }])
      setIsTyping(true)
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      })
        .then(r => r.json())
        .then(data => {
          const raw = data.response
          setGptHistory(p => [...p, { role: 'assistant', content: raw }])
          const strip = t => (t ?? '').replace(/\*\*/g, '').replace(/\\n/g, '\n').trim()
          let msgText = strip(raw), products = [], showOptions = false, showRoutineChips = false
          try {
            const j = JSON.parse(raw)
            msgText = strip(j.message ?? raw)
            products = j.recommended_products ?? []
            showOptions = j.show_options === true
            const newTurn = gptTurnCount + 1
            setGptTurnCount(newTurn)
            showRoutineChips = newTurn >= 2 ? j.show_routine_chips === true : false
          } catch {}
          setMessages(p => [...p, { type: 'bot-gpt', text: msgText, products, showOptions, showRoutineChips }])
        })
        .catch(() => setMessages(p => [...p, { type: 'bot-error' }]))
        .finally(() => setIsTyping(false))
    } else if (key === 'diagnosis') {
      setMessages(prev => [...prev, { type: 'user', text: '피부진단' }])
      showTypingThen([{ type: 'bot-skin-diagnosis' }])
    }
  }

  const handleSuggestion = (text) => {
    if (isTyping) return
    if (text === '무화과 메이크업에 어울리는 블러셔를 찾고 있어') {
      setMessages(prev => [...prev, { type: 'user', text: '무화과 메이크업에 어울리는\n블러셔를 찾고 있어' }])
      showTypingThen([
        { type: 'bot-blusher-text' },
        { type: 'bot-blusher-products' },
      ])
    } else {
      // 나머지 칩 → GPT API 자연어 연결
      const userMsg = { role: 'user', content: text }
      const nextHistory = [...gptHistory, userMsg]
      setGptHistory(nextHistory)
      setMessages(prev => [...prev, { type: 'user', text }])
      setIsTyping(true)
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      })
        .then(r => r.json())
        .then(data => {
          const raw = data.response
          setGptHistory(p => [...p, { role: 'assistant', content: raw }])
          const strip = t => (t ?? '').replace(/\*\*/g, '').replace(/\\n/g, '\n').trim()
          let msgText = strip(raw), products = [], showOptions = false, showRoutineChips = false
          try {
            const j = JSON.parse(raw)
            msgText = strip(j.message ?? raw)
            products = j.recommended_products ?? []
            showOptions = j.show_options === true
            const newTurn = gptTurnCount + 1
            setGptTurnCount(newTurn)
            showRoutineChips = newTurn >= 2 ? j.show_routine_chips === true : false
          } catch {}
          setMessages(p => [...p, { type: 'bot-gpt', text: msgText, products, showOptions, showRoutineChips }])
        })
        .catch(() => setMessages(p => [...p, { type: 'bot-error' }]))
        .finally(() => setIsTyping(false))
    }
  }

  /* 카메라 촬영 완료 → 사진 말풍선 + AI 피부 진단 결과 카드 */
  const handleCapture = async (dataUrl) => {
    setShowCamera(false)
    setMessages(prev => [...prev, { type: 'user-photo', dataUrl }])
    setIsTyping(true)

    let skinData = null
    try {
      const res = await fetch('/api/skin-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageDataUrl: dataUrl }),
      })
      skinData = await res.json()
    } catch {
      // 실패 시 null → SkinResultCard 기본값 사용
    }

    // GPT 컨텍스트에 진단 결과 주입 (이후 제품 추천에 반영)
    const diagnosisText = skinData
      ? `[AI 피부 진단 결과]\n피부 타입: ${skinData.skin_type}\n특징: ${(skinData.tags ?? []).join(', ')}\n종합 점수: ${skinData.score}점\n수분량: ${skinData.moisture}점, 유분량: ${skinData.sebum}점, 탄력: ${skinData.elasticity}점`
      : '[피부 진단 완료]'

    setGptHistory(prev => [
      ...prev,
      { role: 'user', content: '[피부 진단 사진 촬영 완료]' },
      { role: 'assistant', content: diagnosisText + '\n이 진단 결과를 기반으로 맞춤 스킨케어 제품을 추천해드리겠습니다.' },
    ])

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { type: 'bot-skin-result', skinData }])
    }, 5000)
  }

  /* 입력창 직접 타이핑 → GPT API 호출 */
  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || isTyping) return

    setInputValue('')
    const userMsg = { role: 'user', content: text }
    const nextHistory = [...gptHistory, userMsg]
    setGptHistory(nextHistory)
    setMessages(prev => [...prev, { type: 'user', text }])
    setIsTyping(true)

    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      const raw = data.response
      setGptHistory(prev => [...prev, { role: 'assistant', content: raw }])

      // JSON 파싱 → message + recommended_products 분리
      const strip = (t) => (t ?? '').replace(/\*\*/g, '').replace(/\\n/g, '\n').trim()

      let msgText          = strip(raw)
      let products         = []
      let showOptions      = false
      let showRoutineChips = false
      try {
        const parsed = JSON.parse(raw)
        msgText          = strip(parsed.message ?? raw)
        products         = Array.isArray(parsed.recommended_products) ? parsed.recommended_products : []
        showOptions      = parsed.show_options === true
        showRoutineChips = parsed.show_routine_chips === true
      } catch {
        const match = raw.match(/\{[\s\S]*\}/)
        if (match) {
          try {
            const parsed = JSON.parse(match[0])
            msgText          = strip(parsed.message ?? raw)
            products         = Array.isArray(parsed.recommended_products) ? parsed.recommended_products : []
            showOptions      = parsed.show_options === true
            showRoutineChips = parsed.show_routine_chips === true
          } catch { /* 파싱 실패 시 원문 그대로 */ }
        }
      }
      // 1턴째(첫 GPT 응답)에서는 showRoutineChips를 강제 차단
      const newTurn = gptTurnCount + 1
      setGptTurnCount(newTurn)
      const guardedRoutineChips = newTurn >= 2 ? showRoutineChips : false

      setMessages(prev => [...prev, { type: 'bot-gpt', text: msgText, products, showOptions, showRoutineChips: guardedRoutineChips }])
    } catch {
      setMessages(prev => [...prev, { type: 'bot-error' }])
    } finally {
      setIsTyping(false)
    }
  }

  const renderMessage = (msg, idx) => {
    switch (msg.type) {
      case 'user':               return <UserBubble key={idx} text={msg.text} />
      case 'user-photo':         return <UserPhotoBubble key={idx} dataUrl={msg.dataUrl} />
      case 'bot-skin-result':    return <div key={idx} style={{ marginBottom: 20 }}><SkinResultCard skinData={msg.skinData} /></div>
      case 'bot-skincare':        return <SkincareInitCard key={idx} />
      case 'bot-skin-diagnosis':  return <SkinDiagnosisCard key={idx} onAction={handleDiagnosisAction} />
      case 'bot-diagnosis-method': return <DiagnosisMethodCard key={idx} />
      case 'bot-routine':        return <RoutineResponse key={idx} timeSlot={msg.timeSlot} />
      case 'bot-makeup':         return <MakeupBotCard key={idx} />
      case 'chips':              return <SuggestionChips key={idx} items={msg.items} onChipClick={handleSuggestion} />
      case 'bot-blusher-text':   return <BlusherTextCard key={idx} />
      case 'bot-blusher-products': return <BlusherProductScroll key={idx} />
      case 'bot-gpt':
        return (
          <div key={idx} className="msg-bot" style={{ marginBottom: 20 }}>
            <div style={{ ...botCardStyle, marginBottom: msg.products?.length ? 12 : 0 }}>
              <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </p>
            </div>
            {msg.products?.length > 0 && <GptProductScroll products={msg.products} />}
            {msg.showRoutineChips && (
              <RoutineChips onSelect={(label) => {
                handleRoutineSelect(label)
              }} />
            )}
            {msg.showOptions && !msg.products?.length && (
              <div style={{ display: 'flex', gap: 12, marginTop: 12, marginBottom: 0 }}>
                {['제품 추천', '루틴 추천'].map(label => (
                  <button
                    key={label}
                    onClick={() => {
                      setInputValue(label)
                      setTimeout(() => {
                        setInputValue('')
                        setMessages(prev => [...prev, { type: 'user', text: label }])
                        const next = [...gptHistory, { role: 'user', content: label }]
                        setGptHistory(next)
                        setIsTyping(true)
                        fetch('/api/chat', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ messages: next }),
                        })
                          .then(r => r.json())
                          .then(data => {
                            const raw2 = data.response
                            setGptHistory(p => [...p, { role: 'assistant', content: raw2 }])
                            const strip2 = (t) => (t ?? '').replace(/\*\*/g, '').replace(/\\n/g, '\n').trim()
                            let t2 = strip2(raw2), p2 = [], s2 = false
                            try { const j = JSON.parse(raw2); t2 = strip2(j.message ?? raw2); p2 = j.recommended_products ?? []; s2 = j.show_options === true } catch {}
                            setMessages(p => [...p, { type: 'bot-gpt', text: t2, products: p2, showOptions: s2 }])
                          })
                          .catch(() => setMessages(p => [...p, { type: 'bot-error' }]))
                          .finally(() => setIsTyping(false))
                      }, 0)
                    }}
                    style={{
                      padding: '12px 20px',
                      borderRadius: 99,
                      backgroundColor: '#F6F2FF',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#6633CC',
                      lineHeight: 1.5,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      case 'bot-error':
        return (
          <div key={idx} className="msg-bot" style={{ ...botCardStyle, marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 400, color: '#9D9AA3', margin: 0, lineHeight: 1.5 }}>
              죄송해요, 지금은 답변을 드리기 어려워요. 잠시 후 다시 시도해주세요.
            </p>
          </div>
        )
      default:                   return null
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF', position: 'relative' }}>

      {/* ── 헤더 ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#FFFFFF' }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>
          <button onClick={() => navigate('/')} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <img src={logoSvg} alt="miyu" style={{ width: 84, height: 29, display: 'block' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* 새 대화 초기화 버튼 */}
            <button onClick={resetChat} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <img src={newChatIcon} alt="새 대화" style={{ width: 28, height: 28, display: 'block' }} />
            </button>
            <button onClick={() => navigate('/')} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <img src={homeIcon} alt="홈" style={{ width: 28, height: 28, display: 'block' }} />
            </button>
            <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <img src={menuIcon} alt="메뉴" style={{ width: 28, height: 28, display: 'block' }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 채팅 콘텐츠 ── */}
      <div style={{ flex: 1, paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 24, overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'none', WebkitOverflowScrolling: 'touch' }}>

        {/* 인사 그라디언트 텍스트 */}
        <p className="stagger stagger-1" style={{
          fontSize: 24, fontWeight: 500, lineHeight: 1.4, marginBottom: 16,
          background: 'linear-gradient(135deg, #B38BFF 0%, #A1B0FF 50%, #D4B8FF 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: 'transparent',
        }}>
          구르님의 전담 뷰티 전문가<br />미유입니다
        </p>

        {/* 피부 기록 카드 */}
        <div className="stagger stagger-2" style={{ borderRadius: '0 20px 20px 20px', backgroundColor: '#F7F6F9', padding: 16, marginBottom: 16, width: '100%', maxWidth: 320 }}>
          <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: '0 0 12px', lineHeight: 1.5 }}>
            현재 구르님의 피부 데이터를 모두 파악하고<br />있습니다.
          </p>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
              <img src={logoIcon} alt="miyu" style={{ width: 20, height: 20, borderRadius: 6, display: 'block', flexShrink: 0 }} />
              <p style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#242227', margin: 0, lineHeight: 1.5 }}>구르님의 피부 기록</p>
              <span style={{ fontSize: 12, fontWeight: 400, color: '#9D9AA3' }}>11/29</span>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {SKIN_CHIPS.map(c => <span key={c} style={skinChipStyle}>{c}</span>)}
            </div>
          </div>
          <p style={{ fontSize: 15, fontWeight: 400, color: '#242227', margin: 0, lineHeight: 1.5 }}>
            오늘은 어떤 고민이 있으신가요?<br />
            정확한 솔루션을 제시해드리겠습니다.
          </p>
        </div>

        {/* 카테고리 버튼 */}
        <div className="stagger stagger-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: messages.length > 0 ? 12 : 0 }}>
          {CATEGORIES.map(({ label, key }) => (
            <button key={key} onClick={() => handleCategory(key)}
              style={{ padding: '12px 20px', borderRadius: 99, backgroundColor: '#F6F2FF', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#6633CC', lineHeight: 1.5, letterSpacing: '-0.01em' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 동적 메시지 */}
        {messages.map((msg, idx) => renderMessage(msg, idx))}

        {/* GPT 응답 로딩 인디케이터 */}
        {isTyping && (
          <div className="msg-bot" style={{ borderRadius: '0 20px 20px 20px', backgroundColor: '#F7F6F9', padding: '16px 20px', marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="dot-1" />
            <span className="dot-2" />
            <span className="dot-3" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>


      {/* ── 카메라 오버레이 ── */}
      {showCamera && <CameraOverlay onCapture={handleCapture} onClose={() => setShowCamera(false)} />}

      {/* ── 입력창 ── */}
      <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 20, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#F7F6F9', borderRadius: 99, width: 350, height: 60, padding: '16px 20px', boxSizing: 'border-box' }}>
          <button
            onClick={() => setShowCamera(true)}
            style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex' }}
          >
            <img src={cameraIcon} alt="카메라" style={{ width: 28, height: 28, display: 'block' }} />
          </button>
          <input
            className="miyubot-input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onCompositionStart={() => { isComposing.current = true }}
            onCompositionEnd={() => { isComposing.current = false }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey && !isComposing.current) {
                e.preventDefault()
                handleSend()
              }
            }}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, fontWeight: 400, color: '#242227', lineHeight: 1.4, backgroundColor: 'transparent', letterSpacing: '-0.01em' }}
            placeholder="원하는 고민을 입력해주세요"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !inputValue.trim()}
            style={{ background: 'none', border: 'none', cursor: isTyping || !inputValue.trim() ? 'default' : 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, opacity: 1 }}
          >
            <img src={sendIcon} alt="전송" style={{ width: 28, height: 28, display: 'block' }} />
          </button>
        </div>
      </div>

    </div>
  )
}
