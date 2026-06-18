import { useState, useRef, useEffect } from 'react'

export default function AiDemoPage() {
  const [input, setInput]       = useState('')
  const [history, setHistory]   = useState([]) // { role: 'user'|'assistant', content: string }
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const nextHistory = [...history, userMsg]
    setHistory(nextHistory)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '알 수 없는 오류가 발생했습니다.')
      setHistory(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>

      {/* 헤더 */}
      <div style={{ padding: '40px 24px 20px', borderBottom: '1px solid #F0EFF3' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
          AI 데모
        </p>
        <h1 style={{
          fontSize: 22, fontWeight: 600, margin: 0, lineHeight: 1.4,
          background: 'linear-gradient(135deg, #B38BFF 0%, #A1B0FF 50%, #D4B8FF 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: 'transparent',
        }}>
          미유 AI 피부 컨설턴트
        </h1>
        <p style={{ fontSize: 13, color: '#78757D', margin: '6px 0 0', lineHeight: 1.5 }}>
          피부 고민을 입력하면 단계별 맞춤 케어 조언을 드려요.
        </p>
      </div>

      {/* 대화 영역 */}
      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>

        {history.length === 0 && !loading && (
          <p style={{ fontSize: 14, color: '#C1BEC6', textAlign: 'center', marginTop: 40, lineHeight: 1.6 }}>
            아직 대화가 없어요.<br />아래 입력창에 피부 고민을 적어보세요.
          </p>
        )}

        {history.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: 'linear-gradient(135deg, #B38BFF, #D4B8FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginRight: 8, marginTop: 2,
              }}>M</div>
            )}
            <div style={{
              maxWidth: '78%',
              padding: msg.role === 'user' ? '12px 14px' : '14px 16px',
              borderRadius: msg.role === 'user' ? '16px 0 16px 16px' : '0 16px 16px 16px',
              backgroundColor: msg.role === 'user' ? '#6633CC' : '#F7F6F9',
              fontSize: 14,
              fontWeight: 400,
              color: msg.role === 'user' ? '#FFFFFF' : '#242227',
              lineHeight: 1.65,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #B38BFF, #D4B8FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#FFFFFF',
            }}>M</div>
            <div style={{
              padding: '12px 16px', borderRadius: '0 16px 16px 16px',
              backgroundColor: '#F7F6F9', fontSize: 14, color: '#9D9AA3',
              letterSpacing: '-0.01em',
            }}>
              분석 중...
            </div>
          </div>
        )}

        {error && (
          <div style={{ padding: '12px 14px', borderRadius: 10, backgroundColor: '#FFF0F0', border: '1px solid #FFCCCC' }}>
            <p style={{ fontSize: 13, color: '#CC3333', margin: 0 }}>⚠️ {error}</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div style={{ padding: '12px 24px 32px', borderTop: '1px solid #F0EFF3', backgroundColor: '#FFFFFF' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="피부 고민을 자유롭게 적어주세요"
            style={{
              flex: 1, padding: '13px 16px', borderRadius: 99,
              border: '1px solid #DAD8DE', fontSize: 14, fontWeight: 400,
              color: '#242227', outline: 'none', backgroundColor: '#F7F6F9',
              letterSpacing: '-0.01em', fontFamily: 'inherit',
            }}
            onFocus={e => { e.target.style.border = '1px solid #6633CC' }}
            onBlur={e  => { e.target.style.border = '1px solid #DAD8DE' }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              flexShrink: 0, width: 48, height: 48, borderRadius: 99,
              border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              backgroundColor: loading || !input.trim() ? '#E3D4FD' : '#6633CC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.15s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>

    </div>
  )
}
