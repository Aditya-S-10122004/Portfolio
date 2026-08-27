import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')
const EMPTY = { title: '', issuer: '', issue_date: '', credential_url: '' }

export default function Certificates() {
  const { token } = useAuth()
  const [certs,     setCerts]     = useState([])
  const [modal,     setModal]     = useState(false)
  const [editing,   setEditing]   = useState(null)
  const [form,      setForm]      = useState(EMPTY)
  const [imageFile, setImageFile] = useState(null)       // selected File object
  const [preview,   setPreview]   = useState(null)       // blob preview URL
  const [currentImg, setCurrentImg] = useState(null)     // existing image URL when editing
  const [uploading, setUploading] = useState(false)
  const [msg,       setMsg]       = useState(null)
  const fileRef = useRef(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const load = () =>
    fetch(`${API}/certificates`)
      .then(r => r.json())
      .then(d => setCerts(Array.isArray(d) ? d : []))

  useEffect(() => { load() }, [])

  // Clean up blob URL when modal closes or image changes
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview) }
  }, [preview])

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY)
    setImageFile(null)
    setPreview(null)
    setCurrentImg(null)
    setModal(true)
  }

  const openEdit = (c) => {
    setEditing(c.id)
    setForm({
      title:          c.title,
      issuer:         c.issuer,
      issue_date:     c.issue_date?.split('T')[0] || '',
      credential_url: c.credential_url || '',
    })
    setImageFile(null)
    setPreview(null)
    setCurrentImg(c.image_url || null)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setImageFile(null)
    if (preview) { URL.revokeObjectURL(preview); setPreview(null) }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
    setCurrentImg(null) // clear old URL preview
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setMsg(null)

    let image_url = currentImg || null // keep existing if no new file chosen

    // Upload new image if one was selected
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)
      const uploadRes = await fetch(`${API}/upload`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
        body:    formData,
      })
      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({}))
        setMsg({ type: 'error', text: `Image upload failed: ${err.error || uploadRes.status}` })
        setUploading(false)
        return
      }
      const data = await uploadRes.json()
      image_url = data.url
    }

    // Save certificate
    const url    = editing ? `${API}/certificates/${editing}` : `${API}/certificates`
    const method = editing ? 'PUT' : 'POST'
    const saveRes = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ ...form, image_url }),
    })

    if (saveRes.ok) {
      setMsg({ type: 'success', text: editing ? 'Certificate updated!' : 'Certificate added!' })
      closeModal()
      load()
    } else {
      const err = await saveRes.json().catch(() => ({}))
      setMsg({ type: 'error', text: `Save failed (${saveRes.status}): ${err.error || 'Unknown error'}` })
    }
    setUploading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this certificate?')) return
    await fetch(`${API}/certificates/${id}`, { method: 'DELETE', headers })
    setMsg({ type: 'success', text: 'Certificate deleted' })
    load()
  }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Certificates</h1>
          <p className="page-sub">Manage your certifications</p>
        </div>
        <button className="btn-a btn-primary-a" onClick={openAdd}>+ Add Certificate</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {certs.length === 0 ? (
        <div className="a-card">
          <div className="empty-state">
            <div className="ei">🎓</div>
            <h3>No certificates yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6 }}>
              Click "+ Add Certificate" to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="a-card">
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Issuer</th>
                  <th>Date</th>
                  <th>Credential</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certs.map(c => (
                  <tr key={c.id}>
                    <td>
                      {c.image_url
                        ? <img src={c.image_url} alt={c.title} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }} />
                        : <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>🎓</span>
                      }
                    </td>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td style={{ color: 'var(--accent-cyan)' }}>{c.issuer}</td>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: 'var(--text-sec)' }}>
                      {c.issue_date
                        ? new Date(c.issue_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })
                        : '—'}
                    </td>
                    <td>
                      {c.credential_url
                        ? <a href={c.credential_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: '0.82rem' }}>View ↗</a>
                        : <span style={{ color: 'var(--text-muted)' }}>—</span>
                      }
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-a btn-edit-a btn-sm" onClick={() => openEdit(c)}>Edit</button>
                        <button className="btn-a btn-danger-a btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal" style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h2 className="modal-title">{editing ? 'Edit Certificate' : 'Add Certificate'}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Certificate Title */}
                <div className="form-group-a">
                  <label className="form-label">Certificate Title *</label>
                  <input
                    className="form-input"
                    value={form.title}
                    onChange={set('title')}
                    required
                    placeholder="e.g. React Developer Certification"
                  />
                </div>

                {/* Issuer */}
                <div className="form-group-a">
                  <label className="form-label">Issuing Organisation *</label>
                  <input
                    className="form-input"
                    value={form.issuer}
                    onChange={set('issuer')}
                    required
                    placeholder="e.g. Coursera, NPTEL, Udemy"
                  />
                </div>

                {/* Date */}
                <div className="form-group-a">
                  <label className="form-label">Issue Date</label>
                  <input
                    className="form-input"
                    type="date"
                    value={form.issue_date}
                    onChange={set('issue_date')}
                  />
                </div>

                {/* Credential URL */}
                <div className="form-group-a">
                  <label className="form-label">Credential URL (optional)</label>
                  <input
                    className="form-input"
                    value={form.credential_url}
                    onChange={set('credential_url')}
                    placeholder="https://..."
                  />
                </div>

                {/* Image Upload */}
                <div className="form-group-a">
                  <label className="form-label">Certificate Image</label>

                  {/* Preview */}
                  {(preview || currentImg) && (
                    <div style={{ marginBottom: 10 }}>
                      <img
                        src={preview || currentImg}
                        alt="Preview"
                        style={{
                          width: '100%',
                          maxHeight: 180,
                          objectFit: 'cover',
                          borderRadius: 10,
                          border: '1px solid var(--border)',
                        }}
                      />
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        {preview ? 'New image selected' : 'Current image'}
                      </p>
                    </div>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />

                  {/* Upload trigger button */}
                  <button
                    type="button"
                    className="btn-a"
                    style={{
                      border: '2px dashed var(--border)',
                      background: 'transparent',
                      color: 'var(--text-sec)',
                      width: '100%',
                      justifyContent: 'center',
                      padding: '14px',
                      borderRadius: 10,
                      fontSize: '0.85rem',
                      gap: 8,
                    }}
                    onClick={() => fileRef.current?.click()}
                  >
                    📁 {imageFile ? imageFile.name : (currentImg ? 'Change image' : 'Choose image from your device')}
                  </button>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    PNG, JPG, WEBP — max 10 MB
                  </p>
                </div>

              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-a"
                  style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-sec)' }}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-a btn-primary-a" disabled={uploading}>
                  {uploading ? 'Uploading…' : (editing ? 'Update' : 'Add Certificate')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
