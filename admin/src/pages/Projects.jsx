import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = 'http://localhost:5000/api'

const EMPTY = { title: '', description: '', tech_stack: '', live_url: '', github_url: '', image_url: '', featured: false }

export default function Projects() {
  const { token } = useAuth()
  const [projects, setProjects] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [msg, setMsg] = useState(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const load = () => fetch(`${API}/projects`).then(r => r.json()).then(setProjects)
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (p) => {
    setEditing(p.id)
    setForm({ ...p, tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : '' })
    setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      ...form,
      tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
      featured: Boolean(form.featured),
    }
    const url = editing ? `${API}/projects/${editing}` : `${API}/projects`
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers, body: JSON.stringify(body) })
    if (res.ok) {
      setMsg({ type: 'success', text: editing ? 'Project updated!' : 'Project added!' })
      setModal(false); load()
    } else {
      setMsg({ type: 'error', text: 'Failed to save project' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers })
    setMsg({ type: 'success', text: 'Project deleted' }); load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">Manage your portfolio projects</p>
        </div>
        <button className="btn-a btn-primary-a" onClick={openAdd}>+ Add Project</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="a-card">
        {projects.length === 0 ? (
          <div className="empty-state"><div className="ei">📁</div><h3>No projects yet</h3><p>Click "Add Project" to get started</p></div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Title</th><th>Tech Stack</th><th>Featured</th><th>Links</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-sec)', marginTop: 2 }}>
                        {p.description?.slice(0, 60)}{p.description?.length > 60 ? '...' : ''}
                      </div>
                    </td>
                    <td>
                      {(p.tech_stack || []).slice(0, 3).map(t => <span className="tech-tag" key={t}>{t}</span>)}
                      {p.tech_stack?.length > 3 && <span className="tech-tag">+{p.tech_stack.length - 3}</span>}
                    </td>
                    <td>{p.featured ? '⭐' : '—'}</td>
                    <td style={{ fontSize: '0.78rem' }}>
                      {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', marginRight: 8 }}>GitHub</a>}
                      {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>Live</a>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-a btn-edit-a btn-sm" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn-a btn-danger-a btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
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
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{editing ? 'Edit Project' : 'Add Project'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group-a full">
                  <label className="form-label">Title *</label>
                  <input className="form-input" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} required placeholder="My Awesome Project" />
                </div>
                <div className="form-group-a full">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} placeholder="What does this project do?" />
                </div>
                <div className="form-group-a full">
                  <label className="form-label">Tech Stack (comma separated)</label>
                  <input className="form-input" value={form.tech_stack} onChange={e => setForm(f=>({...f,tech_stack:e.target.value}))} placeholder="React, Node.js, PostgreSQL" />
                </div>
                <div className="form-group-a">
                  <label className="form-label">GitHub URL</label>
                  <input className="form-input" type="url" value={form.github_url} onChange={e => setForm(f=>({...f,github_url:e.target.value}))} placeholder="https://github.com/..." />
                </div>
                <div className="form-group-a">
                  <label className="form-label">Live URL</label>
                  <input className="form-input" type="url" value={form.live_url} onChange={e => setForm(f=>({...f,live_url:e.target.value}))} placeholder="https://..." />
                </div>
                <div className="form-group-a full">
                  <label className="form-label">Image URL</label>
                  <input className="form-input" type="url" value={form.image_url} onChange={e => setForm(f=>({...f,image_url:e.target.value}))} placeholder="https://..." />
                </div>
                <div className="form-group-a" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" id="featured" checked={!!form.featured} onChange={e => setForm(f=>({...f,featured:e.target.checked}))} style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
                  <label htmlFor="featured" className="form-label" style={{ textTransform: 'none', cursor: 'pointer' }}>Mark as Featured</label>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-a" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-sec)' }} onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-a btn-primary-a">{editing ? 'Update' : 'Add Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
