import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

export default function Dashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    placements: 0,
    messages: 0,
    certificates: 0,
    unread: 0,
  })

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      fetch(`${API}/projects`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/skills`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/placements`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/certificates`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/messages`, { headers }).then((r) => r.json()).catch(() => []),
    ]).then(([proj, sk, place, certs, msgs]) => {
      setStats({
        projects: Array.isArray(proj) ? proj.length : 0,
        skills: Array.isArray(sk) ? sk.length : 0,
        placements: Array.isArray(place) ? place.length : 0,
        certificates: Array.isArray(certs) ? certs.length : 0,
        messages: Array.isArray(msgs) ? msgs.length : 0,
        unread: Array.isArray(msgs) ? msgs.filter((m) => !m.read).length : 0,
      })
    })
  }, [token])

  const cards = [
    { icon: '📁', label: 'Projects', num: stats.projects, colorClass: 'highlight-green' },
    { icon: '⚡', label: 'Technical Skills', num: stats.skills, colorClass: 'highlight-yellow' },
    { icon: '🎓', label: 'Certificates', num: stats.certificates, colorClass: 'highlight-green' },
    { icon: '🏢', label: 'Placement Records', num: stats.placements, colorClass: 'highlight-yellow' },
    {
      icon: '✉️',
      label: 'Visitor Messages',
      num: stats.messages,
      colorClass: 'highlight-green',
      sub: stats.unread > 0 ? `${stats.unread} unread inquiries` : 'All read',
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 className="page-title">Executive Dashboard</h1>
        <p className="page-sub">
          Portfolio CMS control center · Manage records, achievements & visitor interactions
        </p>
      </div>

      <div className="stat-grid">
        {cards.map((c) => (
          <div className="stat-card" key={c.label}>
            <span className="stat-icon">{c.icon}</span>
            <div className="stat-info">
              <p className={`stat-num ${c.colorClass}`}>{c.num}</p>
              <p className="stat-label">{c.label}</p>
              {c.sub && (
                <p style={{ fontSize: '0.72rem', color: 'var(--brand-green)', marginTop: 4, fontFamily: 'var(--mono)', fontWeight: 600 }}>
                  {c.sub}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="a-card">
        <h2 style={{ fontFamily: 'var(--font)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>
          Portfolio Management Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            ['📁 Projects Ledger', 'Publish projects with GitHub repositories, live demo links, featured badges, and tech stack tags.'],
            ['⚡ Skills Matrix', 'Maintain proficiency levels and categorize technologies across Frontend, Backend, Database, Core and AI.'],
            ['🎓 Certificates', 'Upload and verify industry certificates, credentials, issuing authorities, and verification links.'],
            ['🏢 Placements Tracker', 'Document interview stages, offers received, package information, and outcome learnings.'],
            ['🔗 Social Links', 'Update profile destinations like GitHub, LinkedIn, and LeetCode displayed in the signature footer.'],
            ['✉️ Inquiries & Mailbox', 'Review and respond directly to messages dispatched through your portfolio contact portal.'],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sec)', lineHeight: 1.5 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
