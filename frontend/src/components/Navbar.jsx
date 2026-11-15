import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Journey', href: '#placements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'certificates', 'placements', 'contact']
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        threshold: 0.25,
        rootMargin: '-80px 0px -50% 0px',
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLogoClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand signature */}
        <a href="#home" className="nav-brand" onClick={handleLogoClick}>
          <span className="brand-monogram">AS</span>
          <span className="brand-dot" />
          <span className="brand-name-sub">ADITYA SADALAGI</span>
        </a>

        {/* Center Navigation Pill */}
        <nav className="nav-desktop-pill" aria-label="Main Navigation">
          <ul className="nav-items-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`nav-item-link ${isActive ? 'is-active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                    {isActive && <span className="nav-active-indicator" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right Actions: Theme Toggle + Contact CTA */}
        <div className="nav-actions">
          {/* Theme Switcher Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <div className={`theme-icon-wrap ${theme === 'dark' ? 'is-dark' : 'is-light'}`}>
              {/* Sun icon */}
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              {/* Moon icon */}
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </button>

          {/* Quick CTA */}
          <a
            href="#contact"
            className="btn btn-yellow btn-pill nav-cta-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Talk
          </a>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-inner">
          <ul className="mobile-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`mobile-nav-link ${activeSection === item.href ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className="mobile-link-num">
                    0{NAV_ITEMS.indexOf(item) + 1}
                  </span>
                  <span className="mobile-link-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-footer">
            <div className="mobile-status-badge">
              <span className="editorial-tag-dot" />
              <span>Available for opportunities</span>
            </div>
            <a
              href="#contact"
              className="btn btn-yellow"
              style={{ width: '100%' }}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Get in Touch ↗
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
