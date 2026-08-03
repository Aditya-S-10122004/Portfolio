import { useState } from 'react'
import './Contact.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
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
      const data = await res.json()
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

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <p className="section-subtitle reveal">
          <span className="tag">// contact</span>
        </p>
        <h2 className="section-title reveal reveal-delay-1">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="contact-sub reveal reveal-delay-2">
          Have a project idea, an opportunity, or just want to say hi? I'd love to hear from you!
        </p>

        <div className="contact-grid">
          {/* Info side */}
          <div className="contact-info reveal reveal-delay-2">
            <div className="contact-info-item">
              <span className="ci-icon">📧</span>
              <div>
                <p className="ci-label">Email</p>
                <p className="ci-value">adityasadalagi@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="ci-icon">📍</span>
              <div>
                <p className="ci-label">Location</p>
                <p className="ci-value">Dharwad, Karnataka, India</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="ci-icon">🎓</span>
              <div>
                <p className="ci-label">College</p>
                <p className="ci-value">SDM CET, Dharwad</p>
              </div>
            </div>
            <div className="contact-availability">
              <div className="avail-dot" />
              <span>Open to internships & opportunities</span>
            </div>
          </div>

          {/* Form side */}
          <form className="contact-form card reveal reveal-delay-3" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary send-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <><span className="spinner" /> Sending...</>
              ) : (
                <>Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="form-feedback success">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-feedback error">
                ❌ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
