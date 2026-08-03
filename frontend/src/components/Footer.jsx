import './Footer.css'

export default function Footer({ links }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <div className="footer-logo">
          <span className="logo-text">AS</span><span className="logo-dot">.</span>
        </div>

        <p className="footer-tagline">
          Built with <span className="heart">❤️</span> using React, Node.js & PostgreSQL
        </p>

        {links.length > 0 && (
          <div className="footer-links">
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <p className="footer-copy">
          © {year} Aditya Sadalagi · SDM College of Engineering & Technology
        </p>
      </div>
    </footer>
  )
}
