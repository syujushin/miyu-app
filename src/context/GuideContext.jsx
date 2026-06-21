import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const GuideContext = createContext(null)

export const GUIDE_STEPS = [
  { id: 'skin',    message: '피부 점수를 눌러 상세 분석을 확인해보세요',           highlight: 'skin-report'  },
  { id: 'vinote',  message: '비노트 제품을 선택해보세요',                        highlight: 'vinote-card'  },
  { id: 'weather', message: '현재 날씨를 기반으로 아이템을 추천해줘요',               highlight: 'weather-cards' },
  { id: 'miyubot', message: '미유봇에게 자유롭게 질문해보세요. 진짜 AI가 답해요', highlight: 'miyubot-nav'  },
  { id: 'explore', message: '홈 화면을 자유롭게 둘러보세요',                    highlight: null           },
]

export function GuideProvider({ children }) {
  const [step, setStep] = useState(0)
  const location = useLocation()
  const timerRef = useRef(null)
  const prevPathRef = useRef(location.pathname)

  const nextStep = useCallback(() => {
    setStep(s => (s + 1) % GUIDE_STEPS.length)
  }, [])

  // Auto-advance after 5s
  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(nextStep, 5000)
    return () => clearTimeout(timerRef.current)
  }, [step, nextStep])

  // 홈에서 다른 화면으로 이동할 때 즉시 다음 단계
  useEffect(() => {
    const from = prevPathRef.current
    prevPathRef.current = location.pathname
    if (from === '/' && location.pathname !== '/') {
      clearTimeout(timerRef.current)
      nextStep()
    }
  }, [location.pathname, nextStep])

  const currentHighlight = GUIDE_STEPS[step]?.highlight ?? null
  const guideVisible = location.pathname === '/'

  return (
    <GuideContext.Provider value={{ step, currentHighlight, guideVisible }}>
      {children}
    </GuideContext.Provider>
  )
}

export function useGuide() {
  return useContext(GuideContext)
}
