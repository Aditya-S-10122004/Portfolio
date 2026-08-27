import { useEffect, useRef } from 'react'
import './Cursor.css'

// Detect touch-primary devices (phones, tablets)
const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  navigator.maxTouchPoints > 0

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  // Don't render anything on touch devices
  if (isTouchDevice()) return null

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`

      // Cursor-reactive background
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      raf.current = requestAnimationFrame(animateRing)
    }

    // Grow ring on clickable elements
    const onEnter = () => ring.classList.add('ring-hover')
    const onLeave = () => ring.classList.remove('ring-hover')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .card, .btn, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
