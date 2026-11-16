import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Certificates.css'

function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className="cert-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cert-modal-dialog architectural-card" role="dialog" aria-modal="true">
        <button className="cert-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="cert-modal-body-scroll">
          {cert.image_url && (
            <div className="cert-modal-img-wrap">
              <img src={cert.image_url} alt={cert.title} className="cert-modal-img" />
            </div>
          )}

          <div className="cert-modal-body">
            <div className="cert-modal-badge">
              <span className="cert-modal-dot" />
              <span>Verified Certification</span>
            </div>

            <h2 className="cert-modal-title">{cert.title}</h2>
            
            <div className="cert-meta-row">
              <div className="cert-meta-item">
                <span className="meta-lbl">Issued By</span>
                <span className="meta-val">{cert.issuer}</span>
              </div>
              {cert.issue_date && (
                <div className="cert-meta-item">
                  <span className="meta-lbl">Date of Issue</span>
                  <span className="meta-val">
                    {new Date(cert.issue_date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              )}
            </div>

            {cert.credential_url && (
              <div className="cert-modal-footer">
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-green btn-pill"
                >
                  <span>Verify Online Credential</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function CertCard({ cert, index, onOpen }) {
  return (
    <div
      className={`cert-architectural-card architectural-card reveal delay-${(index % 3) + 1}`}
      onClick={() => onOpen(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(cert)}
    >
      <div className="cert-card-stamp">
        <span>🎓</span>
      </div>

      <div className="cert-media-preview">
        {cert.image_url ? (
          <img
            src={cert.image_url}
            alt={cert.title}
            className="cert-img"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="cert-img-fallback"
          style={{ display: cert.image_url ? 'none' : 'flex' }}
        >
          <span className="fallback-cert-icon">📜</span>
        </div>
      </div>

      <div className="cert-content-block">
        <p className="cert-issuer-tag">{cert.issuer}</p>
        <h3 className="cert-heading">{cert.title}</h3>

        {cert.issue_date && (
          <p className="cert-date-text">
            {new Date(cert.issue_date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
            })}
          </p>
        )}

        <div className="cert-card-actions">
          <span className="cert-inspect-link">View Certificate ↗</span>
          {cert.credential_url && (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noreferrer"
              className="cert-direct-verify"
              onClick={(e) => e.stopPropagation()}
            >
              Verify
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Certificates({ certificates = [] }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="section cert-section" id="certificates">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header reveal">
          <div className="editorial-tag">
            <span className="editorial-tag-dot" />
            <span>04 / Verified Credentials</span>
          </div>
          <h2 className="editorial-title">
            Certifications & <span className="highlight-yellow">Continuous</span> Mastery
          </h2>
          <p className="editorial-desc">
            Documented achievements, verified technical accreditations, and specialized coursework.
          </p>
        </div>

        {certificates.length > 0 ? (
          <div className="cert-editorial-grid">
            {certificates.map((c, i) => (
              <CertCard key={c.id} cert={c} index={i} onOpen={setSelected} />
            ))}
          </div>
        ) : (
          <div className="cert-empty-state architectural-card reveal">
            <div className="empty-state-icon">🎓</div>
            <h3 className="empty-state-title">Certificates Record In Sync</h3>
            <p className="empty-state-desc">
              Loading credential ledger from the database. Please refresh if certificates take a moment.
            </p>
          </div>
        )}
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
