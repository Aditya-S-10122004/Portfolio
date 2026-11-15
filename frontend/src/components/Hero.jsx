import { useState, useEffect } from 'react'
import './Hero.css'

const ROLES = [
  'Full-Stack Developer',
  // 'Flutter & Mobile Engineer',
  'Flutter Developer',
  'DSA & Problem Solver',
  // 'GenAI & Systems Builder',
  'GenAI Enthusiast',
]

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
        setIsFading(false)
      }, 350)
    }, 3200)

    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section" id="home">
      {/* Ambient Architectural Aura */}
      <div className="ambient-glow ambient-yellow hero-aura-1" />
      <div className="ambient-glow ambient-green hero-aura-2" />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Editorial Headline & Content */}
          <div className="hero-narrative">
            <div className="hero-status-pill reveal visible">
              <span className="editorial-tag-dot" />
              <span className="hero-status-text">Available for Opportunities · 2026</span>
            </div>

            <h1 className="hero-headline reveal visible delay-1">
              Building <span className="highlight-yellow">impactful</span> software &{' '}
              <span className="highlight-green">intelligent</span> systems.
            </h1>

            <div className="hero-role-ticker reveal visible delay-2">
              <span className="ticker-label">Specializing in</span>
              <div className="ticker-box">
                <span className={`ticker-text ${isFading ? 'is-fading' : ''}`}>
                  {ROLES[currentRoleIndex]}
                </span>
              </div>
            </div>

            <p className="hero-lead-text reveal visible delay-3">
              I'm <strong>Aditya Sadalagi</strong>, an Information Science & Engineering student at{' '}
              <span className="hero-accent-text">SDM College of Engineering & Technology, Dharwad</span>.
              Combining algorithmic rigor with full-stack execution across Web, Flutter, and GenAI.
            </p>

            <div className="hero-actions-row reveal visible delay-4">
              <button
                type="button"
                className="btn btn-green btn-hero"
                onClick={() => scrollTo('#projects')}
              >
                <span>Explore Projects</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                className="btn btn-outline btn-hero"
                onClick={() => scrollTo('#contact')}
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Quick Micro Credentials Bar */}
            {/* <div className="hero-micro-bar reveal visible delay-5">
              <div className="micro-item">
                <span className="micro-val">8.85</span>
                <span className="micro-lbl">CGPA</span>
              </div>
              <div className="micro-divider" />
              <div className="micro-item">
                <span className="micro-val">ISE</span>
                <span className="micro-lbl">Branch</span>
              </div>
              <div className="micro-divider" />
              <div className="micro-item">
                <span className="micro-val">7th Sem</span>
                <span className="micro-lbl">Semester</span>
              </div>
              <div className="micro-divider" />
              <div className="micro-item">
                <span className="micro-val">SDMCET</span>
                <span className="micro-lbl">Dharwad</span>
              </div>
            </div> */}
          </div>

          {/* Right Column: Layered Architectural Showcase */}
          <div className="hero-visual-column reveal visible delay-2">
            <div className="hero-card-stack">
              {/* Main Architectural Card */}
              <div className="architectural-card hero-main-card">
                <div className="hero-card-header">
                  <div className="monogram-badge">
                    <span>AS</span>
                  </div>
                  <div className="hero-geo-tag">
                    <span className="geo-dot" />
                    <span>15.4589° N, 75.0078° E</span>
                  </div>
                </div>

                <div className="hero-card-body">
                  <p className="card-kicker">ENGINEERING PROFILE</p>
                  <h3 className="card-name-title">Aditya Sadalagi</h3>
                  <p className="card-desc">
                    Software engineer specializing in responsive web applications, mobile architectures with Flutter, and Generative AI workflows.
                  </p>

                  <div className="hero-focus-tags">
                    <span className="focus-tag">React</span>
                    <span className="focus-tag">Node.js</span>
                    <span className="focus-tag">Flutter</span>
                    <span className="focus-tag">PostgreSQL</span>
                    <span className="focus-tag">C++ / DSA</span>
                    <span className="focus-tag">GenAI</span>
                  </div>
                </div>

                <div className="hero-card-footer">
                  <div className="status-indicator">
                    <span className="pulse-dot" />
                    <span>Actively coding & solving DSA problems</span>
                  </div>
                </div>
              </div>

              {/* Floating Asymmetric Highlight Bento */}
              <div className="floating-bento bento-1">
                <div className="bento-icon">⚡</div>
                <div className="bento-text">
                  <span className="bento-title">High Performance</span>
                  <span className="bento-sub">Clean Architecture & Scalable Systems</span>
                </div>
              </div>

              <div className="floating-bento bento-2">
                <div className="bento-icon">🎯</div>
                <div className="bento-text">
                  <span className="bento-title">Problem Solving</span>
                  <span className="bento-sub">Data Structures & LeetCode Practice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="hero-scroll-cue" onClick={() => scrollTo('#about')}>
        <span className="cue-text">SCROLL TO DISCOVER</span>
        <div className="cue-line">
          <div className="cue-dot" />
        </div>
      </div>
    </section>
  )
}
