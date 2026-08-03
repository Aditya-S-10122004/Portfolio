import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Dashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState({ projects: 0, skills: 0, placements: 0, messages: 0, unread: 0 })

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      fetch(`${API}/projects`).then(r => r.json()).catch(() => []),
      fetch(`${API}/skills`).then(r => r.json()).catch(() => []),
      fetch(`${API}/placements`).then(r => r.json()).catch(() => []),
      fetch(`${API}/messages`, { headers }).then(r => r.json()).catch(() => []),
    ]).then(([proj, sk, place, msgs]) => {
      setStats({
        projects: proj.length || 0,
        skills: sk.length || 0,
        placements: place.length || 0,
        messages: msgs.length || 0,
        unread: Array.isArray(msgs) ? msgs.filter(m => !m.read).length : 0,
      })
    })
  }, [token])

  const cards = [
    { icon: '📁', label: 'Projects', num: stats.projects, color: 'var(--accent)' },
    { icon: '⚡', label: 'Skills', num: stats.skills, color: 'var(--accent-cyan)' },
    { icon: '🏢', label: 'Placements', num: stats.placements, color: 'var(--accent-yellow)' },
    { icon: '✉️', label: 'Messages', num: stats.messages, color: 'var(--accent-green)', sub: `${stats.unread} unread` },
  ]

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Welcome back, Admin! Here's an overview of your portfolio.</p>

      <div className="stat-grid">
        {cards.map(c => (
          <div className="stat-card" key={c.label}>
            <span className="stat-icon">{c.icon}</span>
            <div className="stat-info">
              <p className="stat-num" style={{ color: c.color, WebkitTextFillColor: c.color, background: 'none' }}>
                {c.num}
              </p>
              <p className="stat-label">{c.label}</p>
              {c.sub && <p style={{ fontSize: '0.7rem', color: 'var(--accent-green)', marginTop: 2 }}>{c.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="a-card">
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>Quick Guide</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['📁 Projects', 'Add your projects with title, description, GitHub link, live URL, and tech stack'],
            ['⚡ Skills', 'Add your skills grouped by category (Frontend, Backend, Database, Tools)'],
            ['🏢 Placements', 'Track your placement journey — company, role, status, and reason'],
            ['🔗 Links', 'Add social links (GitHub, LinkedIn, etc.) that appear in your portfolio footer'],
            ['✉️ Messages', 'Read messages sent by visitors through the contact form'],
          ].map(([title, desc]) => (
            <li key={title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 700, color: 'var(--accent)', minWidth: 120, fontSize: '0.85rem' }}>{title}</span>
              <span style={{ color: 'var(--text-sec)', fontSize: '0.85rem' }}>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
