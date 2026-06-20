import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import backIcon from '../../assets/Icon/ui/icon-arrow-back.svg'

/* ── DEMO/SCENARIO DATA ──────────────────────────────────────────────────────
 * 아래 수치는 실제 AI 피부 분석 결과가 아닌 시나리오(데모) 예시 데이터입니다.
 * 실제 서비스에서는 서버 측 AI 분석 API 응답값으로 대체됩니다.
 * ─────────────────────────────────────────────────────────────────────────── */
const DEMO = {
  score: 68,
  moisture: 72,     // 수분도 (%)
  sebum: 58,        // 유분도 (%)
  sensitivity: 34,  // 민감도 (%)
  skinAge: 24,      // 피부 나이 (세)
  skinType: '복합성 피부',
  concerns: ['건조함', '모공', '칙칙함'],
}

/* ── SVG 오버레이 치수 ───────────────────────────────────────────────────────
 * viewBox: 390×584 (= 844 root − 44 statusbar − 52 header − 164 controls)
 * 타원: cx=195 cy=264 rx=118 ry=164
 * ─────────────────────────────────────────────────────────────────────────── */
const VB_W = 390, VB_H = 584
const OV_CX = 195, OV_CY = 264, OV_RX = 118, OV_RY = 164

/* ── 얼굴 메쉬 SVG 오버레이 ── */
function FaceMesh({ scanProgress }) {
  const scanning = scanProgress !== null
  // evenodd 경로: 전체 사각형 − 타원 = 타원 바깥에만 어두운 오버레이
  const ovalD = `M${OV_CX - OV_RX},${OV_CY} a${OV_RX},${OV_RY} 0 1,0 ${OV_RX * 2},0 a${OV_RX},${OV_RY} 0 1,0 -${OV_RX * 2},0`
  const darkD = `M0 0 H${VB_W} V${VB_H} H0 Z ${ovalD}`

  const hLines = []
  for (let y = OV_CY - OV_RY + 18; y < OV_CY + OV_RY; y += 20) hLines.push(y)
  const vLines = []
  for (let x = OV_CX - OV_RX + 12; x < OV_CX + OV_RX; x += 20) vLines.push(x)

  const scanY = scanning
    ? OV_CY - OV_RY + (scanProgress / 100) * (OV_RY * 2)
    : null

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <defs>
        <clipPath id="cam-oval-clip">
          <ellipse cx={OV_CX} cy={OV_CY} rx={OV_RX} ry={OV_RY} />
        </clipPath>
        <linearGradient id="cam-scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#A17CF0" stopOpacity="0" />
          <stop offset="50%"  stopColor="#7733FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A17CF0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cam-oval-glow" cx="50%" cy="50%" r="50%">
          <stop offset="60%"  stopColor="#6633CC" stopOpacity="0" />
          <stop offset="100%" stopColor="#6633CC" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      {/* 타원 바깥 어두운 오버레이 (evenodd) */}
      <path d={darkD} fill="rgba(0,0,0,0.48)" fillRule="evenodd" />

      {/* 타원 내 글로우 */}
      <ellipse cx={OV_CX} cy={OV_CY} rx={OV_RX} ry={OV_RY} fill="url(#cam-oval-glow)" />

      {/* 그리드 메쉬 (타원에 클립) */}
      <g clipPath="url(#cam-oval-clip)" opacity={scanning ? 0.55 : 0.38}>
        {hLines.map((y, i) => (
          <line key={`h${i}`} x1={OV_CX - OV_RX} y1={y} x2={OV_CX + OV_RX} y2={y}
            stroke="#C0A3F7" strokeWidth="0.65" />
        ))}
        {vLines.map((x, i) => (
          <line key={`v${i}`} x1={x} y1={OV_CY - OV_RY} x2={x} y2={OV_CY + OV_RY}
            stroke="#C0A3F7" strokeWidth="0.65" />
        ))}
      </g>

      {/* 타원 테두리 */}
      <ellipse cx={OV_CX} cy={OV_CY} rx={OV_RX} ry={OV_RY}
        fill="none" stroke="#9169EB" strokeWidth="1.5" opacity="0.9" />

      {/* 코너 브라켓 */}
      <g stroke="#A17CF0" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M24 24 L24 54 M24 24 L54 24" />
        <path d="M366 24 L366 54 M366 24 L336 24" />
        <path d="M24 560 L24 530 M24 560 L54 560" />
        <path d="M366 560 L366 530 M366 560 L336 560" />
      </g>

      {/* 얼굴 랜드마크 점 */}
      <g fill="#C0A3F7" opacity="0.78">
        {/* 눈 */}
        <circle cx={OV_CX - 38} cy={OV_CY - 28} r="2.5" />
        <circle cx={OV_CX + 38} cy={OV_CY - 28} r="2.5" />
        {/* 눈꼬리 */}
        <circle cx={OV_CX - 56} cy={OV_CY - 22} r="1.5" />
        <circle cx={OV_CX + 56} cy={OV_CY - 22} r="1.5" />
        {/* 코 */}
        <circle cx={OV_CX} cy={OV_CY + 16} r="2.5" />
        <circle cx={OV_CX - 14} cy={OV_CY + 26} r="1.5" />
        <circle cx={OV_CX + 14} cy={OV_CY + 26} r="1.5" />
        {/* 입 */}
        <circle cx={OV_CX - 28} cy={OV_CY + 58} r="2" />
        <circle cx={OV_CX + 28} cy={OV_CY + 58} r="2" />
        <circle cx={OV_CX}      cy={OV_CY + 62} r="2" />
        {/* 이마 / 턱 */}
        <circle cx={OV_CX} cy={OV_CY - OV_RY + 18} r="1.8" />
        <circle cx={OV_CX} cy={OV_CY + OV_RY - 14} r="1.8" />
        {/* 광대 */}
        <circle cx={OV_CX - OV_RX + 16} cy={OV_CY + 10} r="1.5" />
        <circle cx={OV_CX + OV_RX - 16} cy={OV_CY + 10} r="1.5" />
      </g>

      {/* 스캔 라인 (scanning 중에만) */}
      {scanY !== null && (
        <>
          {/* 스캔 완료 영역 보라 틴트 */}
          <rect
            x={OV_CX - OV_RX} y={OV_CY - OV_RY}
            width={OV_RX * 2}
            height={Math.max(0, scanY - (OV_CY - OV_RY))}
            fill="rgba(119,51,255,0.12)"
            clipPath="url(#cam-oval-clip)"
          />
          {/* 스캔 라인 글로우 */}
          <rect x="0" y={scanY - 10} width={VB_W} height={20} fill="url(#cam-scan-grad)" />
          {/* 스캔 라인 */}
          <line x1="0" y1={scanY} x2={VB_W} y2={scanY}
            stroke="#B08FF4" strokeWidth="1.5" opacity="0.9" />
        </>
      )}
    </svg>
  )
}

/* ── 애니메이팅 메트릭 바 ── */
function MetricBar({ label, value, delay = 0 }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>{value}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>%</span>
        </div>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.14)', overflow: 'hidden' }}>
        <div style={{
          width: `${w}%`, height: '100%', borderRadius: 99,
          background: 'linear-gradient(90deg, #7733FF, #B08FF4)',
          transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)',
        }} />
      </div>
    </div>
  )
}

/* ── 메인 페이지 ── */
export default function CameraPage() {
  const navigate   = useNavigate()
  const videoRef   = useRef(null)
  const canvasRef  = useRef(null)
  const streamRef  = useRef(null)
  const rafRef     = useRef(null)

  // 'init' | 'camera' | 'scanning' | 'result' | 'error'
  const [phase,        setPhase]       = useState('init')
  const [scanProgress, setScanProgress] = useState(null) // null | 0–100
  const [capturedImg,  setCapturedImg]  = useState(null)

  /* 카메라 시작 */
  useEffect(() => {
    let mounted = true
    if (!navigator.mediaDevices?.getUserMedia) {
      setPhase('error')
      return
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user', width: { ideal: 390 } } })
      .then(stream => {
        if (!mounted) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setPhase('camera')
      })
      .catch(() => { if (mounted) setPhase('error') })
    return () => {
      mounted = false
      streamRef.current?.getTracks().forEach(t => t.stop())
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* 셔터 → 스캔 애니메이션(2.5초) → 캡처 */
  const handleShutter = () => {
    if (phase !== 'camera') return
    setPhase('scanning')
    setScanProgress(0)
    const DURATION = 2500
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(((now - start) / DURATION) * 100, 100)
      setScanProgress(p)
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        captureAndFinish()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const captureAndFinish = () => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      canvas.width  = video.videoWidth  || 390
      canvas.height = video.videoHeight || 584
      const ctx = canvas.getContext('2d')
      // 전면 카메라 미러링 보정 → 자연스러운 방향으로 저장
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0)
      setCapturedImg(canvas.toDataURL('image/jpeg', 0.88))
    }
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanProgress(null)
    setPhase('result')
  }

  /* ── 에러 화면 (카메라 권한 거부 / 웹캠 없음) ── */
  if (phase === 'error') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        background: 'linear-gradient(160deg, #20004D 0%, #3A0090 50%, #6633CC 100%)',
      }}>
        <img src={statusBarSvg} alt="" draggable={false}
          style={{ width: '100%', display: 'block', flexShrink: 0, filter: 'invert(1)' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, flexShrink: 0 }}>
          <button onClick={() => navigate(-1)}
            style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={backIcon} alt="뒤로"
              style={{ width: 28, height: 28, display: 'block', filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 32px', gap: 16,
        }}>
          {/* 카메라 차단 아이콘 */}
          <div style={{
            width: 88, height: 88, borderRadius: 28,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 8,
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M23 19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V8C1 6.9 1.9 6 3 6H7L9 4H15L17 6H21C22.1 6 23 6.9 23 8V19Z"
                stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
              <line x1="3" y1="3" x2="21" y2="21" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ fontSize: 20, fontWeight: 600, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.4 }}>
            카메라 접근이 필요해요
          </p>
          <p style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.7 }}>
            AI 피부 분석을 위해 카메라 권한이<br />필요해요. 브라우저 설정에서<br />카메라 접근을 허용해주세요.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 16 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                height: 54, borderRadius: 16,
                background: 'linear-gradient(135deg, #7733FF, #B08FF4)',
                border: 'none', cursor: 'pointer',
                color: '#FFFFFF', fontSize: 16, fontWeight: 600,
                letterSpacing: '-0.01em',
                boxShadow: '0 8px 24px rgba(119,51,255,0.38)',
              }}
            >
              건너뛰기
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                height: 54, borderRadius: 16,
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)',
                cursor: 'pointer',
                color: '#FFFFFF', fontSize: 16, fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── 분석 결과 화면 ── */
  if (phase === 'result') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        background: 'linear-gradient(160deg, #20004D 0%, #3A0090 40%, #6633CC 100%)',
        overflowY: 'auto',
      }}>
        <img src={statusBarSvg} alt="" draggable={false}
          style={{ width: '100%', display: 'block', flexShrink: 0, filter: 'invert(1)' }} />
        <div style={{
          height: 52, display: 'flex', alignItems: 'center',
          paddingLeft: 16, paddingRight: 16, flexShrink: 0,
        }}>
          <button onClick={() => navigate(-1)}
            style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={backIcon} alt="뒤로"
              style={{ width: 28, height: 28, display: 'block', filter: 'brightness(0) invert(1)' }} />
          </button>
          <p style={{
            flex: 1, textAlign: 'center',
            fontSize: 17, fontWeight: 600, color: '#FFFFFF',
            marginRight: 28,
          }}>
            피부 분석 결과
          </p>
        </div>

        {/* 스크롤 가능한 결과 콘텐츠 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 44px' }}>

          {/* 캡처 썸네일 + 타이틀 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            {capturedImg && (
              <div style={{
                width: 80, height: 80, borderRadius: 40, overflow: 'hidden',
                border: '2.5px solid rgba(255,255,255,0.3)',
                marginBottom: 16, flexShrink: 0,
              }}>
                <img src={capturedImg} alt="스캔 사진"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <p style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 6, letterSpacing: '-0.02em' }}>
              피부 분석 완료
            </p>
            <p style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.62)', letterSpacing: '-0.01em' }}>
              구르님의 오늘 피부 상태예요
            </p>
          </div>

          {/* 결과 카드 (glassmorphism) */}
          <div style={{
            background: 'rgba(255,255,255,0.09)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.16)',
            padding: '24px 22px',
            marginBottom: 14,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
          }}>
            {/* 종합 점수 + 피부 타입 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
                  종합 피부 점수
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                    {DEMO.score}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>점</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 5 }}>
                  피부 타입
                </p>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#D4B8FF' }}>{DEMO.skinType}</p>
                <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
                  피부 나이 {DEMO.skinAge}세
                </p>
              </div>
            </div>

            {/* 메트릭 바 */}
            <MetricBar label="수분도" value={DEMO.moisture}    delay={150} />
            <MetricBar label="유분도" value={DEMO.sebum}       delay={350} />
            <MetricBar label="민감도" value={DEMO.sensitivity} delay={550} />

            {/* 주요 피부 고민 */}
            <div style={{
              marginTop: 18, paddingTop: 18,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>
                주요 피부 고민
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {DEMO.concerns.map(c => (
                  <span key={c} style={{
                    fontSize: 13, fontWeight: 500, color: '#D4B8FF',
                    background: 'rgba(176,143,244,0.18)',
                    borderRadius: 99, padding: '5px 13px',
                    border: '1px solid rgba(176,143,244,0.25)',
                  }}>
                    #{c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 시나리오 안내 문구 */}
          <p style={{
            fontSize: 11, color: 'rgba(255,255,255,0.35)',
            textAlign: 'center', lineHeight: 1.6, marginBottom: 28,
          }}>
            ※ 본 분석 결과는 AI 시나리오 기반 예시 데이터입니다.
          </p>

          {/* CTA 버튼 */}
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%', height: 56, borderRadius: 16,
              background: 'linear-gradient(135deg, #7733FF 0%, #B08FF4 100%)',
              border: 'none', cursor: 'pointer',
              color: '#FFFFFF', fontSize: 16, fontWeight: 600,
              letterSpacing: '-0.01em',
              boxShadow: '0 10px 28px rgba(119,51,255,0.42)',
            }}
          >
            맞춤 제품 보기 →
          </button>
        </div>
      </div>
    )
  }

  /* ── 카메라 / 스캔 화면 (init | camera | scanning) ── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000000' }}>

      {/* Status Bar */}
      <img src={statusBarSvg} alt="" draggable={false}
        style={{ width: '100%', display: 'block', flexShrink: 0, filter: 'invert(1)' }} />

      {/* 헤더 */}
      <div style={{
        height: 52, display: 'flex', alignItems: 'center',
        paddingLeft: 16, paddingRight: 16, flexShrink: 0,
      }}>
        <button onClick={() => navigate(-1)}
          style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={backIcon} alt="뒤로"
            style={{ width: 28, height: 28, display: 'block', filter: 'brightness(0) invert(1)' }} />
        </button>
        <p style={{
          flex: 1, textAlign: 'center',
          fontSize: 17, fontWeight: 600, color: '#FFFFFF',
          marginRight: 28, letterSpacing: '-0.01em',
        }}>
          {phase === 'scanning' ? 'AI 분석 중' : '피부 스캔'}
        </p>
      </div>

      {/* 카메라 뷰포트 */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#111' }}>
        {/* 실시간 영상 (전면 카메라 미러링) */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)', // 전면 카메라 좌우 반전 보정
            display: 'block',
          }}
        />

        {/* 초기화 중 오버레이 */}
        {phase === 'init' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#000',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="dot-1" style={{ background: '#9169EB' }} />
                <span className="dot-2" style={{ background: '#9169EB' }} />
                <span className="dot-3" style={{ background: '#9169EB' }} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>카메라 준비 중...</p>
            </div>
          </div>
        )}

        {/* 얼굴 메쉬 + 스캔 라인 오버레이 */}
        {(phase === 'camera' || phase === 'scanning') && (
          <FaceMesh scanProgress={scanProgress} />
        )}

        {/* 스캔 진행률 뱃지 */}
        {phase === 'scanning' && (
          <div style={{
            position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: 99, padding: '7px 18px',
            border: '1px solid rgba(161,124,240,0.4)',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#B08FF4', fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>
              스캔 중... {Math.round(scanProgress ?? 0)}%
            </span>
          </div>
        )}
      </div>

      {/* 하단 컨트롤 */}
      <div style={{
        height: 164, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 18, flexShrink: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        {phase === 'scanning' ? (
          /* 스캔 중 진행 표시 */
          <div style={{ width: '100%', paddingLeft: 36, paddingRight: 36 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center', marginBottom: 14 }}>
              얼굴을 움직이지 말고 기다려주세요
            </p>
            <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
              <div style={{
                width: `${scanProgress ?? 0}%`, height: '100%', borderRadius: 99,
                background: 'linear-gradient(90deg, #7733FF, #A17CF0)',
                transition: 'width 0.05s linear',
              }} />
            </div>
          </div>
        ) : (
          /* 셔터 버튼 */
          <>
            <p style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.62)', letterSpacing: '-0.01em' }}>
              얼굴을 타원 안에 맞춰주세요
            </p>
            <button
              onClick={handleShutter}
              disabled={phase !== 'camera'}
              aria-label="피부 스캔 시작"
              style={{
                width: 74, height: 74, borderRadius: 37,
                background: phase === 'camera'
                  ? 'linear-gradient(135deg, #7733FF, #B08FF4)'
                  : 'rgba(255,255,255,0.15)',
                border: '3.5px solid rgba(255,255,255,0.45)',
                cursor: phase === 'camera' ? 'pointer' : 'default',
                boxShadow: phase === 'camera'
                  ? '0 0 0 6px rgba(119,51,255,0.2), 0 0 28px rgba(119,51,255,0.5)'
                  : 'none',
                transition: 'box-shadow 0.3s, background 0.3s',
                flexShrink: 0,
              }}
            />
          </>
        )}
      </div>

      {/* 숨겨진 캔버스 (프레임 캡처용) */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
