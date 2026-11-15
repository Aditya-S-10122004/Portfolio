import { useEffect, useState } from 'react'
import './Loader.css'

export default function Loader({ onFinished }) {
  const [percent, setPercent] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const startTime = performance.now()
    const duration = 850 // fast, fluid, not sluggish

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setPercent(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setIsExiting(true)
        setTimeout(() => {
          onFinished()
        }, 550)
      }
    }

    const rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [onFinished])

  return (
    <div className={`editorial-loader ${isExiting ? 'loader-exit' : ''}`} aria-hidden="true">
      <div className="loader-curtain loader-curtain-top" />
      <div className="loader-curtain loader-curtain-bottom" />
      
      <div className="loader-content">
        <div className="loader-brand">
          <span className="loader-monogram">AS</span>
          <span className="loader-dot" />
        </div>
        <p className="loader-name">ADITYA SADALAGI</p>
        <p className="loader-sub">PORTFOLIO & ARCHIVE</p>

        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${percent}%` }} />
        </div>
        <div className="loader-num">{percent}%</div>
      </div>
    </div>
  )
}
