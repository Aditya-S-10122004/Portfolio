import './Footer.css'

export default function Footer({ links = [] }) {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Fallback social links if API has no links yet
  const defaultLinks = [
    { id: 'l-gh', label: 'GitHub', url: 'https://github.com' },
    { id: 'l-li', label: 'LinkedIn', url: 'https://linkedin.com' },
    { id: 'l-lc', label: 'LeetCode', url: 'https://leetcode.com' },
    { id: 'l-em', label: 'Email', url: 'mailto:adityasadalagi10@gmail.com' },
  ]

  const displayLinks = links.length > 0 ? links : defaultLinks

  return (
    <footer className="editorial-footer">
      {/* Top navigation row */}
      <div className="container footer-top-container">
        <div className="footer-top-row">
          <div className="footer-identity-col">
            <div className="footer-brand-monogram">
              <span className="ft-mono">AS</span>
              <span className="ft-dot" />
            </div>
            <p className="footer-bio-note">
              Information Science Engineer · SDM College of Engineering & Technology, Dharwad.
            </p>
          </div>

          <div className="footer-links-col">
            <span className="footer-links-heading">Index & Connect</span>
            <div className="footer-social-links">
              {displayLinks.map((link) => (
                <a
                  key={link.id || link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-pill"
                >
                  <span>{link.label}</span>
                  <span className="footer-pill-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-action-col">
            <button
              type="button"
              className="footer-scroll-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <span className="top-arrow">↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MONUMENTAL SIGNATURE: ADITYA SADALAGI ── */}
      <div className="footer-signature-container">
        <div className="footer-signature-wrapper" aria-label="Aditya Sadalagi">
          <h2 className="footer-oversized-name">
            <span className="name-first">ADITYA</span>
            <span className="name-spacer"> </span>
            <span className="name-last">SADALAGI</span>
          </h2>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="container footer-bottom-container">
        <div className="footer-bottom-row">
          <p className="footer-copy-text">
            © {currentYear} Aditya Sadalagi. All rights reserved.
          </p>
          <p className="footer-tech-stack">
            Crafted with React, Node.js & PostgreSQL · Dharwad, India
          </p>
        </div>
      </div>
    </footer>
  )
}
