import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const API = 'http://localhost:5000/api'

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
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Server error. Make sure the backend is running.')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-bg" />

      <div className="login-card">
        <div className="login-logo">
          <span className="l-logo-text">AS</span>
          <span className="l-logo-dot">.</span>
        </div>
        <h1 className="login-title">Admin Dashboard</h1>
        <p className="login-sub">Sign in to manage your portfolio</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-a">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              placeholder="AdityaSadalagi"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required
            />
          </div>

          <div className="form-group-a">
            <label className="form-label">Password</label>
            <div className="pw-wrap">
              <input
                className="form-input"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-a btn-primary-a login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}
