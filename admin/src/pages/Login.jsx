import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        login(data.token, data.username)
      } else {
        setError(data.error || 'Login verification failed')
      }
    } catch {
      setError('Backend unreachable. Please verify server status on port 5000.')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-ambient login-ambient-yellow" />
      <div className="login-ambient login-ambient-green" />

      <div className="login-card architectural-card">
        <div className="login-logo-lockup">
          <span className="l-logo-monogram">AS</span>
          <span className="l-logo-dot" />
        </div>

        <h1 className="login-title">Admin Console</h1>
        <p className="login-sub">Authenticate to access portfolio controls & databases</p>

        {error && (
          <div className="alert alert-error" role="alert">
            <span>✕</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-a">
            <label className="form-label" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              className="form-input"
              type="text"
              placeholder="AdityaSadalagi"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              required
              autoFocus
            />
          </div>

          <div className="form-group-a">
            <label className="form-label" htmlFor="login-password">
              Security Key / Password
            </label>
            <div className="pw-wrap">
              <input
                id="login-password"
                className="form-input"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-a btn-primary-a login-btn"
            disabled={loading}
          >
            {loading ? 'Validating Token...' : 'Enter Studio →'}
          </button>
        </form>

        <div className="login-footer-meta">
          <span>Aditya Sadalagi Portfolio · Protected Route</span>
        </div>
      </div>
    </div>
  )
}
