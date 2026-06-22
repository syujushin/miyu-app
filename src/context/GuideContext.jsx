import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GuideContext = createContext(null)

export const GUIDE_STEPS = [
  {
    id: 'skin',
    title: '마이 루틴 확인하기',
    message: '오늘 루틴을 확인하고 하나씩 체크해보세요.\n꾸준히 관리할수록 피부가 달라집니다.',
    highlight: 'skin-report',
  },
  {
    id: 'vinote',
    title: '맞춤 제품 선택하기',
    message: '제품을 선택하면 상세 페이지에서\n내 피부와의 적합도를 확인할 수 있어요.',
    highlight: 'vinote-card',
  },
  {
    id: 'weather',
    title: '날씨 기반 제품 추천',
    message: '오늘 날씨와 피부 상태를 함께 분석해\n적절한 아이템을 추천해드려요.',
    highlight: 'weather-section',
  },
  {
    id: 'miyubot',
    title: '미유봇 AI 상담',
    message: '자유롭게 질문해보세요. 진짜 AI가 내 피부에\n딱 맞는 제품과 루틴을 찾아줘요.',
    highlight: 'miyubot-nav',
  },
]

export const MYPAGE_GUIDE_STEPS = [
  {
    id: 'mp-profile',
    title: '나의 활동을 한눈에 봐요',
    message: '닉네임을 누르면 현재 등급과\n구매 수, 리뷰 평가를 확인할 수 있어요.',
    highlight: 'mypage-profile',
    rx: 12, padX: 4, padY: 4,
  },
  {
    id: 'mp-routine',
    title: '나만의 루틴을 관리해요',
    message: '마이 루틴을 누르면 현재 관리 중인\n루틴을 확인할 수 있어요.',
    highlight: 'mypage-my-routine',
    rx: 8, padX: 8, padY: 8,
  },
  {
    id: 'mp-skin-data',
    title: '내 피부 타입을 확인해요',
    message: '현재 피부 상태와 퍼스널 컬러를\n자세히 확인할 수 있어요.',
    highlight: 'mypage-skin-data',
    rx: 8, padX: 8, padY: 8,
  },
]

export const MIYUBOT_GUIDE_STEPS = [
  {
    id: 'mb-skin-record',
    title: '전담 뷰티 전문가예요',
    message: '피부 기록을 모두 기억하고\n데이터 기반으로 솔루션을 제안해드려요.',
    highlight: 'miyubot-skin-record',
    rx: 12, padX: 0, padY: 0,
  },
  {
    id: 'mb-categories',
    title: '버튼으로 쉽게 질문해요',
    message: '카테고리를 선택하면 질문 버튼이\n순서대로 이어져 상담을 도와드려요.',
    highlights: ['miyubot-cat-skincare', 'miyubot-cat-makeup', 'miyubot-cat-innerbeauty', 'miyubot-cat-device', 'miyubot-cat-diagnosis'],
    rx: 99, fixedW: 89, fixedH: 45, placement: 'above',
  },
  {
    id: 'mb-camera',
    title: '실제 화면을 촬영해보세요',
    message: 'AI가 즉시 피부를 분석하고\n진단 결과를 보여줘요.',
    highlight: 'miyubot-camera-btn',
    rx: 24, fixedW: 48, fixedH: 48,
  },
  {
    id: 'mb-input',
    title: '고민을 자세히 적어보세요',
    message: '구체적으로 작성할수록\n더 정확한 맞춤 상담을 받을 수 있어요.',
    highlight: 'miyubot-input-area',
    rx: 30, padX: 0, padY: 0,
  },
]

export function GuideProvider({ children }) {
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)
  const [fabIntroSeen, setFabIntroSeen] = useState(false)

  const [mbStep, setMbStep] = useState(0)
  const [mbStarted, setMbStarted] = useState(false)
  const [mbFinished, setMbFinished] = useState(false)
  const [mbIntroSeen, setMbIntroSeen] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)

  const [mpStep, setMpStep] = useState(0)
  const [mpStarted, setMpStarted] = useState(false)
  const [mpFinished, setMpFinished] = useState(false)
  const [mpIntroSeen, setMpIntroSeen] = useState(false)

  const location = useLocation()

  const startGuide = useCallback(() => {
    setStep(0)
    setFinished(false)
    setStarted(true)
    setFabIntroSeen(true)
  }, [])

  const dismissFabIntro = useCallback(() => setFabIntroSeen(true), [])

  const next = useCallback(() => {
    if (step >= GUIDE_STEPS.length - 1) setFinished(true)
    else setStep(s => s + 1)
  }, [step])

  const skip = useCallback(() => setFinished(true), [])

  const startMiyubotGuide = useCallback(() => {
    setMbStep(0)
    setMbStarted(true)
    setMbFinished(false)
    setMbIntroSeen(true)
  }, [])

  const nextMiyubot = useCallback(() => {
    if (mbStep >= MIYUBOT_GUIDE_STEPS.length - 1) setMbFinished(true)
    else setMbStep(s => s + 1)
  }, [mbStep])

  const skipMiyubot = useCallback(() => setMbFinished(true), [])

  const startMypageGuide = useCallback(() => { setMpStep(0); setMpStarted(true); setMpFinished(false); setMpIntroSeen(true) }, [])
  const nextMypage = useCallback(() => {
    if (mpStep >= MYPAGE_GUIDE_STEPS.length - 1) setMpFinished(true)
    else setMpStep(s => s + 1)
  }, [mpStep])
  const skipMypage = useCallback(() => setMpFinished(true), [])

  useEffect(() => {
    if (location.pathname !== '/miyubot') setCameraOpen(false)
  }, [location.pathname])

  const guideVisible = started && !finished && location.pathname === '/'
  const guideDone = started && finished
  const fabIntroVisible = !fabIntroSeen && !started && location.pathname === '/'
  const currentHighlight = GUIDE_STEPS[step]?.highlight ?? null
  const miyubotGuideVisible = mbStarted && !mbFinished && location.pathname === '/miyubot'
  const mypageGuideVisible = mpStarted && !mpFinished && location.pathname === '/mypage'

  return (
    <GuideContext.Provider value={{
      step, currentHighlight, guideVisible, guideDone, fabIntroVisible,
      startGuide, dismissFabIntro, next, skip,
      mbStep, miyubotGuideVisible, startMiyubotGuide, nextMiyubot, skipMiyubot, mbIntroSeen,
      cameraOpen, setCameraOpen,
      mpStep, mypageGuideVisible, startMypageGuide, nextMypage, skipMypage, mpIntroSeen,
    }}>
      {children}
    </GuideContext.Provider>
  )
}

export function useGuide() {
  return useContext(GuideContext)
}
