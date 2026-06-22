import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function fitFrame() {
  const wrapper = document.getElementById('mockup-wrapper')
  if (!wrapper) return
  const scale = Math.min(window.innerWidth / 420, window.innerHeight / 869, 1)
  wrapper.style.transform = scale < 1 ? `scale(${scale})` : ''
  wrapper.style.transformOrigin = 'center center'
  document.documentElement.style.setProperty('--frame-scale', String(scale))
}
fitFrame()
window.addEventListener('resize', fitFrame)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
