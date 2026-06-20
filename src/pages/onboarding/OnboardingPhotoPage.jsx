import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CameraOverlay } from '../../components/camera/FaceScanCamera'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import logoIcon from '../../assets/logo/logo-icon-square.svg'
import iconFaceScan from '../../assets/Icon/ui/icon-face-scan.svg'
import faceScanOverlay from '../../assets/images/face-scan-overlay.png'
import tipNoMakeup from '../../assets/Icon/tips/tip-no-makeup.svg'
import tipNoGlasses from '../../assets/Icon/tips/tip-no-glasses.svg'
import tipBrightLight from '../../assets/Icon/tips/tip-bright-light.svg'
import tipNoFilter from '../../assets/Icon/tips/tip-no-filter.svg'

const TIPS = [
  { icon: tipNoMakeup,    text: '화장은 지우고 촬영해 주세요.' },
  { icon: tipNoGlasses,   text: '안경과 마스크는 벗고 촬영해 주세요.' },
  { icon: tipBrightLight, text: '밝은 곳에서 촬영해 주세요.' },
  { icon: tipNoFilter,    text: '보정된 이미지는 정확한 진단이 어려울 수 있습니다.' },
]

export default function OnboardingPhotoPage() {
  const navigate = useNavigate()
  const [showCamera, setShowCamera] = useState(false)

  const handleCapture = () => {
    setShowCamera(false)
    navigate('/onboarding/skin-check')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        fontFamily: "'SUIT', sans-serif",
        letterSpacing: '-0.01em',
        position: 'relative',
      }}
    >
      {/* Status bar: 47px */}
      <img src={statusBarSvg} alt="" style={{ width: '100%', flexShrink: 0 }} />

      {/* Scrollable content */}
      {/* paddingTop 45 = 92 - 47(status bar) → title starts at 92px from top */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '45px 20px 120px' }}>

        {/* Title: 24 SemiBold 140% GrayScale20 */}
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#242227',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          촬영 또는 이미지를<br />선택해주세요
        </h1>

        {/* AI Analysis Card: 46px below title, 350×76 */}
        <div
          style={{
            marginTop: 46,
            height: 76,
            backgroundColor: '#EBE0FF',
            borderRadius: 16,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          {/* Left group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src={logoIcon} alt="miyu" style={{ width: 20, height: 20, flexShrink: 0 }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: '#242227', lineHeight: 1.4 }}>
                AI 분석 항목
              </span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 400, color: '#78757D', lineHeight: 1.4 }}>
              퍼스널 컬러 · 피부 타입 · 유수분 · 탄력
            </span>
          </div>

          {/* Right: face scan icon → open camera */}
          <button
            onClick={() => setShowCamera(true)}
            style={{
              width: 44, height: 44, flexShrink: 0,
              padding: 0, border: 'none', background: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <img src={iconFaceScan} alt="카메라로 스캔" style={{ width: 44, height: 44 }} />
          </button>
        </div>

        {/* Sample Image: 12px below card, 350×230 */}
        <div
          style={{
            marginTop: 12,
            height: 230,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#F0EFF3',
          }}
        >
          <img
            src={faceScanOverlay}
            alt="face scan sample"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Tips section */}
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#242227',
            lineHeight: 1.5,
            margin: 0,
            marginTop: 24,
            marginBottom: 12,
          }}
        >
          정확한 분석 팁
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TIPS.map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={icon} alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 400, color: '#78757D', lineHeight: 1 }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 6, marginBottom: 39 }}>
          <button
            onClick={() => navigate('/onboarding/skin-check')}
            style={{
              width: 176, height: 50, borderRadius: 12,
              border: '1px solid #6633CC', backgroundColor: 'transparent',
              color: '#6633CC', fontSize: 17, fontWeight: 600, lineHeight: 1.4,
              cursor: 'pointer', fontFamily: "'SUIT', sans-serif", letterSpacing: '-0.01em',
              boxSizing: 'border-box',
            }}
          >
            건너뛰기
          </button>
          <button
            onClick={() => navigate('/onboarding/skin-check')}
            style={{
              width: 176, height: 50, borderRadius: 12,
              border: 'none', backgroundColor: '#6633CC',
              color: '#FFFFFF', fontSize: 17, fontWeight: 600, lineHeight: 1.4,
              cursor: 'pointer', fontFamily: "'SUIT', sans-serif", letterSpacing: '-0.01em',
            }}
          >
            다음
          </button>
        </div>
        <div style={{ width: 140, height: 5, borderRadius: 99, backgroundColor: '#000000', marginBottom: 8 }} />
      </div>

      {/* Camera overlay (same as Miyubot) */}
      {showCamera && (
        <CameraOverlay
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  )
}
