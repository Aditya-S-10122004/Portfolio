import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)
  const isMouseDown = useRef(false)
  const isVisible = useRef(false)

  useEffect(() => {
    // Only run on fine pointers (mouse), not touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rafId

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible.current) {
        isVisible.current = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`
    }

    const onMouseDown = () => {
      isMouseDown.current = true
      ring.classList.add('cursor-pressed')
    }

    const onMouseUp = () => {
      isMouseDown.current = false
      ring.classList.remove('cursor-pressed')
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .interactive-card')
      if (target) {
        isHovered.current = true
        ring.classList.add('cursor-hovered')
      } else {
        isHovered.current = false
        ring.classList.remove('cursor-hovered')
      }
    }

    const onMouseLeaveDoc = () => {
      isVisible.current = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const render = () => {
      // Smooth interpolation for follower ring
      const ease = 0.16
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease

      const sizeOffset = isHovered.current ? 28 : 18
      ring.style.transform = `translate3d(${ringPos.current.x - sizeOffset}px, ${ringPos.current.y - sizeOffset}px, 0)`

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveDoc)

    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeaveDoc)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  )
}
