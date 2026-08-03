import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = 'http://localhost:5000/api'
const EMPTY = { name: '', category: 'Frontend' }
const CATS = ['Frontend', 'Backend', 'Database', 'Languages', 'Tools', 'Other']

export default function Skills() {
  const { token } = useAuth()
  const [skills, setSkills] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [msg, setMsg] = useState(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const load = () => fetch(`${API}/skills`).then(r => r.json()).then(setSkills)
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (s) => { setEditing(s.id); setForm({ name: s.name, category: s.category }); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editing ? `${API}/skills/${editing}` : `${API}/skills`
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers, body: JSON.stringify(form) })
    if (res.ok) { setMsg({ type: 'success', text: editing ? 'Skill updated!' : 'Skill added!' }); setModal(false); load() }
    else setMsg({ type: 'error', text: 'Failed to save' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    await fetch(`${API}/skills/${id}`, { method: 'DELETE', headers })
    setMsg({ type: 'success', text: 'Skill deleted' }); load()
  }

  // Group by category
  const grouped = skills.reduce((acc, s) => {
    const c = s.category || 'Other'
    if (!acc[c]) acc[c] = []
    acc[c].push(s)
    return acc
  }, {})

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Skills</h1>
          <p className="page-sub">Manage your technical skills</p>
        </div>
        <button className="btn-a btn-primary-a" onClick={openAdd}>+ Add Skill</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {skills.length === 0 ? (
        <div className="a-card"><div className="empty-state"><div className="ei">⚡</div><h3>No skills yet</h3></div></div>
      ) : (
        Object.entries(grouped).map(([cat, items]) => (
          <div className="a-card" key={cat} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 16, color: 'var(--accent)' }}>{cat}</h3>
            <div className="a-table-wrap">
              <table className="a-table">
                <thead><tr><th>Skill</th><th>Category</th><th>Actions</th></tr></thead>
                <tbody>
                  {items.map(s => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 600 }}>{s.name}</td>
                      <td>
                        <span className="tech-tag">{s.category}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn-a btn-edit-a btn-sm" onClick={() => openEdit(s)}>Edit</button>
                          <button className="btn-a btn-danger-a btn-sm" onClick={() => handleDelete(s.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h2 className="modal-title">{editing ? 'Edit Skill' : 'Add Skill'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-group-a">
                  <label className="form-label">Skill Name *</label>
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="React.js"
                  />
                </div>
                <div className="form-group-a">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-a"
                  style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-sec)' }}
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-a btn-primary-a">
                  {editing ? 'Update' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
