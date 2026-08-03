import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Messages() {
  const { token } = useAuth()
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [msg, setMsg] = useState(null)

  const headers = { Authorization: `Bearer ${token}` }

  const load = () =>
    fetch(`${API}/messages`, { headers }).then(r => r.json()).then(d => {
      if (Array.isArray(d)) setMessages(d)
    })

  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    await fetch(`${API}/messages/${id}/read`, { method: 'PUT', headers })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    if (selected?.id === id) setSelected(s => ({ ...s, read: true }))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await fetch(`${API}/messages/${id}`, { method: 'DELETE', headers })
    setSelected(null)
    setMsg({ type: 'success', text: 'Message deleted' })
    load()
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div>
      <h1 className="page-title">Messages</h1>
      <p className="page-sub">Contact form submissions · {unread} unread</p>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {messages.length === 0 ? (
        <div className="a-card"><div className="empty-state"><div className="ei">✉️</div><h3>No messages yet</h3><p>Visitors will send messages through the contact form.</p></div></div>
      ) : (
        <div className="messages-layout">
          {/* List */}
          <div className="msg-list a-card" style={{ padding: 0 }}>
            {messages.map(m => (
              <button
                key={m.id}
                className={`msg-item ${selected?.id === m.id ? 'active' : ''} ${!m.read ? 'unread' : ''}`}
                onClick={() => { setSelected(m); if (!m.read) markRead(m.id) }}
              >
                <div className="msg-item-header">
                  <span className="msg-name">{m.name}</span>
                  {!m.read && <span className="badge badge-unread" style={{ fontSize: '0.65rem' }}>NEW</span>}
                </div>
                <div className="msg-email">{m.email}</div>
                <div className="msg-preview">{m.message?.slice(0, 60)}...</div>
                <div className="msg-date">
                  {new Date(m.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="msg-detail a-card">
            {selected ? (
              <>
                <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{selected.name}</h3>
                      <a href={`mailto:${selected.email}`} style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem' }}>{selected.email}</a>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={`mailto:${selected.email}?subject=Re: Your message`} className="btn-a btn-edit-a btn-sm">Reply</a>
                      <button className="btn-a btn-danger-a btn-sm" onClick={() => handleDelete(selected.id)}>Delete</button>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 8, fontFamily: 'var(--mono)' }}>
                    {new Date(selected.created_at).toLocaleString('en-IN')}
                  </p>
                </div>
                <p style={{ lineHeight: 1.8, color: 'var(--text-sec)', fontSize: '0.92rem', whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </>
            ) : (
              <div className="empty-state" style={{ padding: '60px 0' }}>
                <div className="ei">💌</div>
                <h3>Select a message</h3>
                <p>Click any message from the list to read it</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
