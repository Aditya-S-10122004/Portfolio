import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const EMPTY = { company: '', role: '', date: '', status: 'pending', reason: '', package: '', notes: '' }

const BADGE = {
  selected: 'badge badge-selected',
  rejected: 'badge badge-rejected',
  pending: 'badge badge-pending',
  'on-hold': 'badge badge-on-hold',
}

export default function Placements() {
  const { token } = useAuth()
  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [msg, setMsg] = useState(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const load = () => fetch(`${API}/placements`).then(r => r.json()).then(setData)
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (p) => {
    setEditing(p.id)
    setForm({ company: p.company, role: p.role || '', date: p.date?.split('T')[0] || '', status: p.status, reason: p.reason || '', package: p.package || '', notes: p.notes || '' })
    setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editing ? `${API}/placements/${editing}` : `${API}/placements`
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers, body: JSON.stringify(form) })
    if (res.ok) { setMsg({ type: 'success', text: editing ? 'Updated!' : 'Added!' }); setModal(false); load() }
    else setMsg({ type: 'error', text: 'Failed to save' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this record?')) return
    await fetch(`${API}/placements/${id}`, { method: 'DELETE', headers })
    setMsg({ type: 'success', text: 'Deleted' }); load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Placements</h1>
          <p className="page-sub">Track your placement journey</p>
        </div>
        <button className="btn-a btn-primary-a" onClick={openAdd}>+ Add Record</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="a-card">
        {data.length === 0 ? (
          <div className="empty-state"><div className="ei">🏢</div><h3>No placement records yet</h3></div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Company</th><th>Role</th><th>Date</th><th>Status</th><th>Package / Reason</th><th>Actions</th></tr></thead>
              <tbody>
                {data.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.company}</td>
                    <td style={{ color: 'var(--text-sec)' }}>{p.role || '—'}</td>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text-sec)' }}>
                      {p.date ? new Date(p.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : '—'}
                    </td>
                    <td><span className={BADGE[p.status] || 'badge'}>{p.status}</span></td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-sec)', maxWidth: 180 }}>
                      {p.status === 'selected' && p.package ? <span style={{ color: 'var(--accent-green)' }}>💰 {p.package}</span> : ''}
                      {p.status === 'rejected' && p.reason ? <span style={{ color: 'var(--accent-red)' }} title={p.reason}>{p.reason.slice(0, 40)}{p.reason.length > 40 ? '...' : ''}</span> : ''}
                      {!p.package && !p.reason ? '—' : ''}
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
              <h2 className="modal-title">{editing ? 'Edit Record' : 'Add Placement'}</h2>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group-a">
                  <label className="form-label">Company *</label>
                  <input className="form-input" value={form.company} onChange={e => setForm(f=>({...f,company:e.target.value}))} required placeholder="Company Name" />
                </div>
                <div className="form-group-a">
                  <label className="form-label">Role</label>
                  <input className="form-input" value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))} placeholder="Software Engineer" />
                </div>
                <div className="form-group-a">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} />
                </div>
                <div className="form-group-a">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))}>
                    <option value="pending">Pending</option>
                    <option value="selected">Selected ✅</option>
                    <option value="rejected">Rejected ❌</option>
                    <option value="on-hold">On Hold 🔄</option>
                  </select>
                </div>
                {form.status === 'selected' && (
                  <div className="form-group-a full">
                    <label className="form-label">Package (CTC)</label>
                    <input className="form-input" value={form.package} onChange={e => setForm(f=>({...f,package:e.target.value}))} placeholder="e.g. 8 LPA" />
                  </div>
                )}
                {form.status === 'rejected' && (
                  <div className="form-group-a full">
                    <label className="form-label">Reason for Rejection</label>
                    <textarea className="form-textarea" value={form.reason} onChange={e => setForm(f=>({...f,reason:e.target.value}))} placeholder="What went wrong?" />
                  </div>
                )}
                <div className="form-group-a full">
                  <label className="form-label">Additional Notes</label>
                  <textarea className="form-textarea" value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} placeholder="Any other details..." />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-a" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-sec)' }} onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-a btn-primary-a">{editing ? 'Update' : 'Add Record'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
