import { useState } from 'react'
import './Placements.css'

const STATUS_CONFIG = {
  selected:  { label: 'Selected',  emoji: '✅', color: 'var(--accent-green)',    bg: 'rgba(0,255,135,0.08)',   border: 'rgba(0,255,135,0.3)',   glow: 'rgba(0,255,135,0.15)' },
  rejected:  { label: 'Rejected',  emoji: '❌', color: '#ff6b9d',               bg: 'rgba(255,107,157,0.08)', border: 'rgba(255,107,157,0.3)', glow: 'rgba(255,107,157,0.15)' },
  pending:   { label: 'Pending',   emoji: '⏳', color: '#f59e0b',               bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.3)',  glow: 'rgba(245,158,11,0.15)' },
  'on-hold': { label: 'On Hold',   emoji: '🔄', color: 'var(--accent-secondary)',bg: 'rgba(0,212,255,0.08)',  border: 'rgba(0,212,255,0.3)',   glow: 'rgba(0,212,255,0.15)' },
}

const STATUS_ORDER = ['selected', 'rejected', 'pending', 'on-hold']

export default function Placements({ placements }) {
  const [active, setActive] = useState(null) // which category is expanded

  // Group placements by status
  const grouped = STATUS_ORDER.reduce((acc, key) => {
    acc[key] = placements.filter(p => p.status === key)
    return acc
  }, {})

  const handleStatClick = (key) => {
    // If no entries, do nothing
    if (!grouped[key].length) return
    // Toggle: click same → collapse, click different → switch
    setActive(prev => prev === key ? null : key)
  }

  const activeItems  = active ? grouped[active] : []
  const activeCfg    = active ? STATUS_CONFIG[active] : null

  return (
    <section className="section placements-section" id="placements">
      <div className="container">
        <p className="section-subtitle reveal">
          <span className="tag">// placement journey</span>
        </p>
        <h2 className="section-title reveal reveal-delay-1">
          My <span className="gradient-text">Placement</span> Journey
        </h2>

        {placements.length > 0 ? (
          <>
            {/* ── Stat pills ── */}
            <div className="pl-stats-row reveal reveal-delay-2">
              {STATUS_ORDER.map(key => {
                const cfg     = STATUS_CONFIG[key]
                const count   = grouped[key].length
                const isActive = active === key
                return (
                  <button
                    key={key}
                    className={`pl-stat-pill ${isActive ? 'active' : ''} ${!count ? 'empty' : ''}`}
                    style={{
                      '--stat-color':  cfg.color,
                      '--stat-bg':     cfg.bg,
                      '--stat-border': cfg.border,
                    }}
                    onClick={() => handleStatClick(key)}
                    disabled={!count}
                  >
                    <span className="pl-pill-icon">{cfg.emoji}</span>
                    <span className="pl-pill-label">{cfg.label}</span>
                    <span className="pl-pill-count">{count}</span>
                    {!!count && (
                      <span className="pl-pill-arrow">{isActive ? '▲' : '▼'}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* ── Expanded details table ── */}
            {active && activeItems.length > 0 && (
              <div
                className="pl-details-wrap"
                style={{ '--det-color': activeCfg.color, '--det-border': activeCfg.border, '--det-bg': activeCfg.bg }}
              >
                {/* Section header */}
                <div className="pl-details-header">
                  <span className="pl-details-title">
                    {activeCfg.emoji} {activeCfg.label} Companies
                    <span className="pl-details-badge">{activeItems.length}</span>
                  </span>
                  <button className="pl-details-close" onClick={() => setActive(null)}>✕</button>
                </div>

                {/* Table — desktop */}
                <div className="pl-table-wrap">
                  <table className="pl-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Date</th>
                        {active === 'selected'                          && <th>Package</th>}
                        {active === 'rejected'                          && <th>Reason</th>}
                        {(active === 'pending' || active === 'on-hold') && <th>Notes</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {activeItems.map((p, i) => (
                        <tr key={p.id}>
                          <td className="pl-td-num">{i + 1}</td>
                          <td className="pl-td-company">{p.company}</td>
                          <td className="pl-td-role">{p.role || '—'}</td>
                          <td className="pl-td-date">
                            {p.date
                              ? new Date(p.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })
                              : '—'}
                          </td>
                          {active === 'selected'                          && <td className="pl-td-package">{p.package || '—'}</td>}
                          {active === 'rejected'                          && <td className="pl-td-reason">{p.reason  || '—'}</td>}
                          {(active === 'pending' || active === 'on-hold') && <td className="pl-td-notes">{p.notes   || '—'}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards — mobile */}
                <div className="pl-mobile-cards">
                  {activeItems.map((p, i) => (
                    <div className="pl-mobile-card" key={p.id}>
                      <div className="pl-mc-num">{i + 1}</div>
                      <div className="pl-mc-body">
                        <p className="pl-mc-company">{p.company}</p>
                        {p.role && <p className="pl-mc-role">{p.role}</p>}
                        <div className="pl-mc-meta">
                          {p.date && (
                            <span className="pl-mc-date">
                              📅 {new Date(p.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                            </span>
                          )}
                          {active === 'selected'  && p.package && <span className="pl-mc-package">💰 {p.package}</span>}
                          {active === 'rejected'  && p.reason  && <span className="pl-mc-reason">Reason: {p.reason}</span>}
                          {(active === 'pending' || active === 'on-hold') && p.notes && <span className="pl-mc-notes">{p.notes}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="placements-empty reveal">
            <div className="empty-icon">🏢</div>
            <h3>Placement Records Coming Soon</h3>
            <p>It might take a while to load. Please refresh the page once.</p>
          </div>
        )}
      </div>
    </section>
  )
}
