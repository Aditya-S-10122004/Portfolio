import { useState } from 'react'
import './Certificates.css'

function CertModal({ cert, onClose }) {
  return (
    <div className="cert-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cert-modal">
        <button className="cert-modal-close" onClick={onClose}>×</button>
        {cert.image_url && (
          <div className="cert-modal-img-wrap">
            <img src={cert.image_url} alt={cert.title} className="cert-modal-img" />
          </div>
        )}
        <div className="cert-modal-body">
          <h2 className="cert-modal-title">{cert.title}</h2>
          <p className="cert-modal-issuer">
            <span className="cert-issuer-label">Issued by</span> {cert.issuer}
          </p>
          {cert.issue_date && (
            <p className="cert-modal-date">
              📅 {new Date(cert.issue_date).toLocaleDateString('en-IN', {
                year: 'numeric', month: 'long'
              })}
            </p>
          )}
          {cert.credential_url && (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noreferrer"
              className="cert-modal-link"
            >
              View Credential ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function CertCard({ cert, index, onOpen }) {
  return (
    <div
      className={`cert-card card reveal reveal-delay-${(index % 3) + 1}`}
      onClick={() => onOpen(cert)}
      role="button"
      tabIndex={0}
    >
      {/* Badge ribbon */}
      <div className="cert-badge">🏅</div>

      {/* Image or placeholder */}
      <div className="cert-img-wrap">
        {cert.image_url ? (
          <img src={cert.image_url} alt={cert.title} className="cert-img"
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
        ) : null}
        <div className="cert-img-fallback" style={{ display: cert.image_url ? 'none' : 'flex' }}>
          <span>🎓</span>
        </div>
      </div>

      {/* Info */}
      <div className="cert-info">
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        {cert.issue_date && (
          <p className="cert-date">
            {new Date(cert.issue_date).toLocaleDateString('en-IN', {
              year: 'numeric', month: 'short'
            })}
          </p>
        )}
      </div>

      {/* View link */}
      {cert.credential_url && (
        <a
          href={cert.credential_url}
          target="_blank"
          rel="noreferrer"
          className="cert-verify-link"
          onClick={e => e.stopPropagation()}
        >
          Verify ↗
        </a>
      )}
    </div>
  )
}

export default function Certificates({ certificates }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="section cert-section" id="certificates">
      <div className="container">
        <p className="section-subtitle reveal">
          <span className="tag">// certificates</span>
        </p>
        <h2 className="section-title reveal reveal-delay-1">
          My <span className="gradient-text">Certificates</span>
        </h2>

        {certificates.length > 0 ? (
          <div className="cert-grid">
            {certificates.map((c, i) => (
              <CertCard key={c.id} cert={c} index={i} onOpen={setSelected} />
            ))}
          </div>
        ) : (
          <div className="cert-empty reveal">
            <div className="empty-icon">🎓</div>
            <h3>Certificates Coming Soon</h3>
            <p>It might take a while to load the certificates. Please refresh the page once.</p>
          </div>
        )}
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
