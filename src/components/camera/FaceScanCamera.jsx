import { useState, useEffect, useRef } from 'react'
import statusBarSvg    from '../../assets/Top/Status Bar.svg'
import closeIcon       from '../../assets/Icon/ui/icon-close.svg'
import camPhotoIcon    from '../../assets/Icon/camera-photo.svg'
import camCenterIcon   from '../../assets/Icon/camera-center.svg'
import camArrowSyncIcon from '../../assets/Icon/camera-arrow-sync.svg'
import camCloseIcon    from '../../assets/Icon/camera-close.svg'

const CAM_VB_W = 390, CAM_VB_H = 844
const BOX_L = 45, BOX_R = 345, BOX_T = 140, BOX_B = 540

export function CamFaceMesh({ scanProgress }) {
  const scanning = scanProgress !== null
  const scanY = scanning ? BOX_T + (scanProgress / 100) * (BOX_B - BOX_T) : null

  const rows = [
    [[168,178],[195,172],[222,178]],
    [[140,197],[168,188],[195,185],[222,188],[250,197]],
    [[108,223],[138,212],[167,206],[195,204],[223,206],[252,212],[282,223]],
    [[102,247],[134,237],[164,232],[195,230],[226,232],[256,237],[288,247]],
    [[97,279],[128,271],[157,267],[177,263],[195,262],[213,263],[233,267],[262,271],[293,279]],
    [[97,314],[127,307],[156,303],[176,299],[195,302],[214,299],[234,303],[263,307],[293,314]],
    [[102,349],[131,343],[158,339],[178,337],[195,339],[212,337],[232,339],[259,343],[288,349]],
    [[114,384],[141,381],[165,377],[195,376],[225,377],[249,381],[276,384]],
    [[132,412],[161,410],[195,411],[229,410],[258,412]],
    [[158,435],[195,442],[232,435]],
  ]

  const segs = []
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r]
    for (let i = 0; i < row.length - 1; i++) segs.push([row[i], row[i + 1]])
    if (r < rows.length - 1) {
      const nxt = rows[r + 1]
      for (let i = 0; i < row.length; i++) {
        const ni = Math.round((i * (nxt.length - 1)) / Math.max(1, row.length - 1))
        segs.push([row[i], nxt[ni]])
        if (ni + 1 < nxt.length) segs.push([row[i], nxt[ni + 1]])
      }
    }
  }
  const pts = rows.flat()

  const faceOutlinePts = [
    [195,172],
    [222,178],[250,197],[282,223],[288,247],[293,279],[293,314],[288,349],[276,384],[258,412],[232,435],[195,442],
    [158,435],[132,412],[114,384],[102,349],[97,314],[97,279],[102,247],[108,223],[140,197],[168,178],
    [195,172],
  ].map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <svg
      viewBox={`0 0 ${CAM_VB_W} ${CAM_VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="cam-scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F0E9FF" stopOpacity="0" />
          <stop offset="50%"  stopColor="#F0E9FF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F0E9FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="mesh-inner-glow" cx="50%" cy="42%" r="55%">
          <stop offset="0%"   stopColor="#C0A3F7" stopOpacity="0.22" />
          <stop offset="60%"  stopColor="#8257E0" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#6633CC" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform="translate(195,370) scale(1.26) translate(-195,-307)" opacity={scanning ? 1 : 0.8}>
        <polygon points={faceOutlinePts} fill="url(#mesh-inner-glow)" />
        <polyline points={faceOutlinePts} fill="none" stroke="#ECE0FE" strokeWidth="0.71" strokeLinejoin="round" strokeLinecap="round" />
        {segs.map(([a, b], i) => (
          <line key={'l' + i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#ECE0FE" strokeWidth="0.32" strokeOpacity="0.8" />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={'p' + i} cx={x} cy={y} r="0.87" fill="#ECE0FE" fillOpacity="0.9" />
        ))}
      </g>

      <g stroke="#ECE0FE" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d={`M ${BOX_L + 30} ${BOX_T} L ${BOX_L} ${BOX_T} L ${BOX_L} ${BOX_T + 30}`} />
        <path d={`M ${BOX_R - 30} ${BOX_T} L ${BOX_R} ${BOX_T} L ${BOX_R} ${BOX_T + 30}`} />
        <path d={`M ${BOX_L + 30} ${BOX_B} L ${BOX_L} ${BOX_B} L ${BOX_L} ${BOX_B - 30}`} />
        <path d={`M ${BOX_R - 30} ${BOX_B} L ${BOX_R} ${BOX_B} L ${BOX_R} ${BOX_B - 30}`} />
      </g>

      {scanY !== null && (
        <>
          <rect x="0" y={scanY - 5} width={CAM_VB_W} height={10} fill="url(#cam-scan-grad)" />
          <line x1="0" y1={scanY} x2={CAM_VB_W} y2={scanY} stroke="#F0E9FF" strokeWidth="0.6" opacity="0.5" />
        </>
      )}
    </svg>
  )
}

export function CameraOverlay({ onCapture, onClose }) {
  const videoRef       = useRef(null)
  const canvasRef      = useRef(null)
  const streamRef      = useRef(null)
  const rafRef         = useRef(null)
  const capturedRef    = useRef(null)
  const [phase,        setPhase]        = useState('init')
  const [scanProgress, setScanProgress] = useState(null)

  useEffect(() => {
    let mounted = true
    if (!navigator.mediaDevices?.getUserMedia) { setPhase('error'); return }
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

  const handleShutter = () => {
    if (phase !== 'camera') return
    setPhase('scanning')
    setScanProgress(0)
    const DURATION = 3500
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(((now - start) / DURATION) * 100, 100)
      setScanProgress(p)
      if (p < 100) { rafRef.current = requestAnimationFrame(tick) }
      else { captureAndClose() }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const captureAndClose = () => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    let dataUrl = null
    if (video && canvas) {
      canvas.width  = video.videoWidth  || 390
      canvas.height = video.videoHeight || 584
      const ctx = canvas.getContext('2d')
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0)
      dataUrl = canvas.toDataURL('image/jpeg', 0.88)
    }
    setScanProgress(null)
    capturedRef.current = dataUrl
    setPhase('analyzing')
    // 스트림은 navigate 직전에 끊어야 카메라 화면 유지됨
    setTimeout(() => {
      streamRef.current?.getTracks().forEach(t => t.stop())
      onCapture(capturedRef.current)
    }, 1600)
  }

  if (phase === 'error') {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #20004D 0%, #3A0090 50%, #6633CC 100%)' }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block', flexShrink: 0, filter: 'invert(1)' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={closeIcon} alt="닫기" style={{ width: 28, height: 28, display: 'block', filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 16 }}>
          <div style={{ width: 88, height: 88, borderRadius: 28, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M23 19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V8C1 6.9 1.9 6 3 6H7L9 4H15L17 6H21C22.1 6 23 6.9 23 8V19Z" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
              <line x1="3" y1="3" x2="21" y2="21" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ fontSize: 20, fontWeight: 600, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.4 }}>카메라 접근이 필요해요</p>
          <p style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.7 }}>
            AI 피부 분석을 위해 카메라 권한이<br />필요해요. 브라우저 설정에서<br />카메라 접근을 허용해주세요.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 16 }}>
            <button onClick={onClose} style={{ height: 54, borderRadius: 16, background: 'linear-gradient(135deg, #7733FF, #B08FF4)', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', boxShadow: '0 8px 24px rgba(119,51,255,0.38)' }}>
              닫기
            </button>
            <button onClick={() => window.location.reload()} style={{ height: 54, borderRadius: 16, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer', color: '#FFFFFF', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, background: '#000000', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
      />

      {phase === 'init' && (
        <div style={{ position: 'absolute', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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


      {(phase === 'camera' || phase === 'scanning' || phase === 'analyzing') && <CamFaceMesh scanProgress={scanProgress} />}

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)',
        paddingBottom: 36,
      }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block', filter: 'invert(1)' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            {phase === 'scanning' || phase === 'analyzing' ? 'AI 분석 중' : '피부 스캔'}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 67, left: 16, padding: 0, background: 'none', border: 'none', cursor: 'pointer', zIndex: 20 }}
      >
        <img src={camCloseIcon} alt="닫기" style={{ width: 32, height: 32, display: 'block', filter: 'brightness(0) invert(1)' }} />
      </button>

      {phase === 'scanning' && (
        <div style={{ position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 99, padding: '7px 18px', border: '1px solid rgba(206,183,250,0.5)', whiteSpace: 'nowrap', zIndex: 10 }}>
          <span style={{ color: '#8257E0', fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>
            스캔 중... {Math.round(scanProgress ?? 0)}%
          </span>
        </div>
      )}

      {(phase === 'camera' || phase === 'scanning' || phase === 'analyzing') && <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        paddingBottom: 52, paddingTop: 36,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
      }}>
        {phase === 'analyzing' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              <span className="dot-1" style={{ background: '#CEB7FA' }} />
              <span className="dot-2" style={{ background: '#CEB7FA' }} />
              <span className="dot-3" style={{ background: '#CEB7FA' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
              분석 중...
            </p>
          </div>
        ) : phase === 'scanning' ? (
          <p style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'center', margin: 0, marginBottom: 28 }}>
            얼굴을 움직이지 말고 기다려주세요
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.62)', letterSpacing: '-0.01em' }}>얼굴을 타원 안에 맞춰주세요</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 50 }}>
              <button style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={camPhotoIcon} alt="갤러리" style={{ width: 24, height: 24, display: 'block' }} />
              </button>
              <button
                onClick={handleShutter}
                disabled={phase !== 'camera'}
                aria-label="피부 스캔 시작"
                style={{ width: 72, height: 72, padding: 0, background: 'none', border: 'none', cursor: phase === 'camera' ? 'pointer' : 'default', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: phase === 'camera' ? 1 : 0.5 }}
              >
                <img src={camCenterIcon} alt="촬영" style={{ width: 72, height: 72, display: 'block' }} />
              </button>
              <button style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={camArrowSyncIcon} alt="카메라 전환" style={{ width: 24, height: 24, display: 'block' }} />
              </button>
            </div>
          </div>
        )}
      </div>}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
