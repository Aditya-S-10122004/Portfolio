import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const EMPTY = { label: '', url: '', icon: '' }

export default function Links() {
  const { token } = useAuth()
  const [links, setLinks] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [msg, setMsg] = useState(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const load = () => fetch(`${API}/links`).then(r => r.json()).then(setLinks)
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (l) => { setEditing(l.id); setForm({ label: l.label, url: l.url, icon: l.icon || '' }); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editing ? `${API}/links/${editing}` : `${API}/links`
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers, body: JSON.stringify(form) })
    if (res.ok) { setMsg({ type: 'success', text: editing ? 'Link updated!' : 'Link added!' }); setModal(false); load() }
    else setMsg({ type: 'error', text: 'Failed to save' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this link?')) return
    await fetch(`${API}/links/${id}`, { method: 'DELETE', headers })
    setMsg({ type: 'success', text: 'Link deleted' }); load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Social Links</h1>
          <p className="page-sub">Links shown in your portfolio footer</p>
        </div>
        <button className="btn-a btn-primary-a" onClick={openAdd}>+ Add Link</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="a-card">
        {links.length === 0 ? (
          <div className="empty-state"><div className="ei">🔗</div><h3>No links yet</h3><p>Add your GitHub, LinkedIn, etc.</p></div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Label</th><th>URL</th><th>Icon</th><th>Actions</th></tr></thead>
              <tbody>
                {links.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600 }}>{l.label}</td>
                    <td><a href={l.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>{l.url.slice(0, 50)}{l.url.length > 50 ? '...' : ''}</a></td>
                    <td>{l.icon || '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-a btn-edit-a btn-sm" onClick={() => openEdit(l)}>Edit</button>
                        <button className="btn-a btn-danger-a btn-sm" onClick={() => handleDelete(l.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal" style={{ maxWidth: 440 }}>
            <div className="modal-header">
              <h2 className="modal-title">{editing ? 'Edit Link' : 'Add Link'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-group-a">
                  <label className="form-label">Label *</label>
                  <input className="form-input" value={form.label} onChange={e => setForm(f=>({...f,label:e.target.value}))} required placeholder="GitHub" />
                </div>
                <div className="form-group-a">
                  <label className="form-label">URL *</label>
                  <input className="form-input" type="url" value={form.url} onChange={e => setForm(f=>({...f,url:e.target.value}))} required placeholder="https://github.com/yourusername" />
                </div>
                <div className="form-group-a">
                  <label className="form-label">Icon (emoji or name)</label>
                  <input className="form-input" value={form.icon} onChange={e => setForm(f=>({...f,icon:e.target.value}))} placeholder="🐙 or github" />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-a" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-sec)' }} onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-a btn-primary-a">{editing ? 'Update' : 'Add Link'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
