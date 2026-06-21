import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function fitFrame() {
  const frame = document.getElementById('phone-frame')
  if (!frame) return
  const scale = Math.min(window.innerWidth / 390, window.innerHeight / 844, 1)
  frame.style.transform = scale < 1 ? `scale(${scale})` : ''
  frame.style.transformOrigin = 'center center'
  document.documentElement.style.setProperty('--frame-scale', String(scale))
}
fitFrame()
window.addEventListener('resize', fitFrame)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
