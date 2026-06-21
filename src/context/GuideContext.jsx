import { createContext, useContext, useState, useCallback } from 'react'
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

export function GuideProvider({ children }) {
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)
  const [fabIntroSeen, setFabIntroSeen] = useState(false)
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

  const guideVisible = started && !finished && location.pathname === '/'
  const guideDone = started && finished
  const fabIntroVisible = !fabIntroSeen && !started && location.pathname === '/'
  const currentHighlight = GUIDE_STEPS[step]?.highlight ?? null

  return (
    <GuideContext.Provider value={{ step, currentHighlight, guideVisible, guideDone, fabIntroVisible, startGuide, dismissFabIntro, next, skip }}>
      {children}
    </GuideContext.Provider>
  )
}

export function useGuide() {
  return useContext(GuideContext)
}
