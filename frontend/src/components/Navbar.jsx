import { useState, useEffect } from 'react'
import './Navbar.css'

const navItems = [
  { label: 'About',        href: '#about'        },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Placements',   href: '#placements'   },
  { label: 'Contact',      href: '#contact'      },
]

export default function Navbar({ links }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('')

  // ── Scrolled state ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Scroll-spy: highlight active section automatically ──
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      {
        threshold: 0.25,
        rootMargin: '-64px 0px -55% 0px', // account for navbar height
      }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // ── Logo click → scroll to very top ────────────────────
  const handleLogoClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    setActive('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Nav link click ──────────────────────────────────────
  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Fix 1: Logo scrolls to top properly */}
        <a href="/" className="navbar-logo" onClick={handleLogoClick}>
          <span className="logo-text">AS</span>
          <span className="logo-dot">.</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                /* Fix 2: active driven by scroll-spy, not click */
                className={`nav-link ${active === item.href ? 'nav-active' : ''}`}
                onClick={e => handleNav(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
