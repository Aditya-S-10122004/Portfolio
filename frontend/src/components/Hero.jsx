import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const ROLES = [
  'Web Developer',
  'App Developer',
  'Problem Solver',
  'Tech Enthusiast',
]

export default function Hero() {
  const canvasRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  // ── Typewriter effect ───────────────────────────────────
  useEffect(() => {
    const role = ROLES[roleIndex]
    let timeout

    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  // ── Particle canvas ─────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    // Create particles
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.5 ? '108,99,255' : '0,212,255',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Cursor-reactive glow
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350)
      grd.addColorStop(0, 'rgba(108,99,255,0.12)')
      grd.addColorStop(1, 'rgba(4,4,15,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Particles
      particles.forEach((p) => {
        // Subtle attraction to mouse
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += (dx / dist) * 0.008
          p.vy += (dy / dist) * 0.008
        }

        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`
        ctx.fill()
      })

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>Available for opportunities</span>
        </div>

        <h1 className="hero-name">
          Hi, I'm <span className="gradient-text">Aditya</span>
          <span className="hero-wave">👋</span>
        </h1>

        <div className="hero-role">
          <span className="role-prefix">I'm a </span>
          <span className="role-typed">{displayed}</span>
          <span className="type-cursor">|</span>
        </div>

        <p className="hero-bio">
          Studying Information Science & Engineering at{' '}
          <span className="gradient-text-pink">SDM College of Engineering & Technology</span>,
          Dharwad
        </p>

        <div className="hero-cta">
          <button className="btn btn-primary magnetic" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="btn btn-outline magnetic" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get In Touch
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num gradient-text">7th</span>
            <span className="stat-label">Semester</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num gradient-text">ISE</span>
            <span className="stat-label">Branch</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num gradient-text">SDM</span>
            <span className="stat-label">College</span>
          </div>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToAbout} aria-label="Scroll down">
        <div className="scroll-wheel" />
      </button>
    </section>
  )
}
