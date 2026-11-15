import { useState } from 'react'
import './Contact.css'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('adityasadalagi10@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header reveal">
          <div className="editorial-tag">
            <span className="editorial-tag-dot" />
            <span>06 / Direct Connection</span>
          </div>
          <h2 className="editorial-title">
            Let's build something <span className="highlight-yellow">remarkable</span> together.
          </h2>
          <p className="editorial-desc">
            Whether you have an engineering opportunity, a software project, or want to discuss full-stack & mobile development, my inbox is open.
          </p>
        </div>

        <div className="contact-editorial-layout">
          {/* Left: Contact Info & Communication Channels */}
          <div className="contact-channels-column">
            <div className="contact-info-card architectural-card reveal delay-1">
              <h3 className="channels-title">Direct Channels</h3>
              <p className="channels-desc">
                Available for internships, full-time engineering roles, and technical collaborations.
              </p>

              <div className="channels-list">
                {/* Email item with copy action */}
                <div className="channel-item">
                  <div className="channel-icon-box">📧</div>
                  <div className="channel-content">
                    <span className="channel-label">Email Address</span>
                    <a href="mailto:adityasadalagi10@gmail.com" className="channel-value email-link">
                      adityasadalagi10@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    className="copy-email-btn"
                    onClick={copyEmail}
                    title="Copy email to clipboard"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-box">📍</div>
                  <div className="channel-content">
                    <span className="channel-label">Base Location</span>
                    <span className="channel-value">Dharwad, Karnataka, India</span>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-box">🎓</div>
                  <div className="channel-content">
                    <span className="channel-label">Academic Campus</span>
                    <span className="channel-value">SDMCET, Dharwad</span>
                  </div>
                </div>
              </div>

              <div className="channel-status-pill">
                <span className="channel-live-dot" />
                <span>Currently responding within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Tactile Contact Form */}
          <div className="contact-form-column">
            <form
              className="architectural-contact-form architectural-card reveal delay-2"
              onSubmit={handleSubmit}
            >
              <h3 className="form-card-title">Send a Direct Message</h3>

              <div className="form-grid-fields">
                <div className="form-field-group">
                  <label htmlFor="contact-name" className="field-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="field-input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-email" className="field-label">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="field-input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@organization.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-message" className="field-label">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="field-textarea"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your team, project, or opportunity..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-green btn-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className="btn-spinner" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="form-alert alert-success" role="alert">
                  <span className="alert-icon">✓</span>
                  <div className="alert-text">
                    <strong>Message Delivered!</strong> Thank you for reaching out. I'll get back to you shortly.
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="form-alert alert-error" role="alert">
                  <span className="alert-icon">✕</span>
                  <div className="alert-text">
                    <strong>Transmission Error.</strong> Could not deliver message. Please reach out directly to adityasadalagi10@gmail.com.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
