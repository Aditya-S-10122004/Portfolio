import { useState } from 'react'
import './Placements.css'

const STATUS_CONFIG = {
  selected: {
    label: 'Offers & Selected',
    badge: 'SELECTED',
    emoji: '🏆',
    colorKey: 'selected',
    desc: 'Confirmed placement selections & technical offers',
  },
  pending: {
    label: 'In Review & Active',
    badge: 'PENDING',
    emoji: '⏳',
    colorKey: 'pending',
    desc: 'Interviews in progress & evaluation stages',
  },
  'on-hold': {
    label: 'Decision On Hold',
    badge: 'ON HOLD',
    emoji: '🔄',
    colorKey: 'hold',
    desc: 'Submissions under pipeline or scheduling hold',
  },
  rejected: {
    label: 'Learning Milestones',
    badge: 'CLOSED',
    emoji: '🎯',
    colorKey: 'rejected',
    desc: 'Rounds completed and analytical takeaways',
  },
}

const STATUS_KEYS = ['selected', 'pending', 'on-hold', 'rejected']

function DossierWrap({ activeCategory, activeCfg, activeItems, onClose, isMobile = false }) {
  if (!activeCategory || !activeItems?.length) return null

  return (
    <div
      className={`placement-dossier-wrap architectural-card reveal ${
        isMobile ? 'dossier-mobile-inline' : 'dossier-desktop-only'
      }`}
      id={`dossier-${isMobile ? 'mobile-' : ''}${activeCategory}`}
    >
      <div className="dossier-header">
        <div className="dossier-title-group">
          <span className="dossier-emoji">{activeCfg.emoji}</span>
          <h3 className="dossier-heading">
            {activeCfg.label}
            <span className="dossier-count-pill">{activeItems.length} Companies</span>
          </h3>
        </div>
        <button
          type="button"
          className="dossier-close-btn"
          onClick={onClose}
          aria-label="Close dossier"
        >
          ✕
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="dossier-table-container">
        <table className="dossier-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Organization</th>
              <th>Position / Role</th>
              <th>Timeline</th>
              {activeCategory === 'selected' && <th>Compensation</th>}
              {activeCategory === 'rejected' && <th>Outcome Takeaway</th>}
              {(activeCategory === 'pending' || activeCategory === 'on-hold') && <th>Status Notes</th>}
            </tr>
          </thead>
          <tbody>
            {activeItems.map((p, index) => (
              <tr key={p.id || index}>
                <td className="td-index">0{index + 1}</td>
                <td className="td-company">
                  <span className="company-name">{p.company}</span>
                </td>
                <td className="td-role">{p.role || 'Software Engineer'}</td>
                <td className="td-date">
                  {p.date
                    ? new Date(p.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                      })
                    : '—'}
                </td>
                {activeCategory === 'selected' && (
                  <td className="td-highlight td-package">{p.package || 'Confidential'}</td>
                )}
                {activeCategory === 'rejected' && (
                  <td className="td-reason">{p.reason || 'Round completed'}</td>
                )}
                {(activeCategory === 'pending' || activeCategory === 'on-hold') && (
                  <td className="td-notes">{p.notes || 'In progress'}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="dossier-mobile-list">
        {activeItems.map((p, index) => (
          <div className="dossier-mobile-card" key={p.id || index}>
            <div className="mobile-card-top">
              <span className="mobile-card-idx">0{index + 1}</span>
              <h4 className="mobile-company">{p.company}</h4>
            </div>
            <p className="mobile-role">{p.role || 'Software Engineer'}</p>
            <div className="mobile-meta-grid">
              {p.date && (
                <div className="mobile-meta-item">
                  <span className="m-lbl">Date</span>
                  <span className="m-val">
                    {new Date(p.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              )}
              {activeCategory === 'selected' && p.package && (
                <div className="mobile-meta-item">
                  <span className="m-lbl">Package</span>
                  <span className="m-val highlight-green">{p.package}</span>
                </div>
              )}
              {activeCategory === 'rejected' && p.reason && (
                <div className="mobile-meta-item full-span">
                  <span className="m-lbl">Note</span>
                  <span className="m-val">{p.reason}</span>
                </div>
              )}
              {(activeCategory === 'pending' || activeCategory === 'on-hold') && p.notes && (
                <div className="mobile-meta-item full-span">
                  <span className="m-lbl">Notes</span>
                  <span className="m-val">{p.notes}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Placements({ placements = [] }) {
  const [activeCategory, setActiveCategory] = useState(null)

  // Group placements by status
  const grouped = STATUS_KEYS.reduce((acc, key) => {
    acc[key] = placements.filter((p) => p.status === key)
    return acc
  }, {})

  const handleToggle = (key) => {
    if (!grouped[key]?.length) return
    setActiveCategory((prev) => {
      const next = prev === key ? null : key
      if (next && typeof window !== 'undefined' && window.innerWidth < 640) {
        setTimeout(() => {
          const el = document.getElementById(`dossier-mobile-${key}`)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        }, 80)
      }
      return next
    })
  }

  const activeItems = activeCategory ? grouped[activeCategory] : []
  const activeCfg = activeCategory ? STATUS_CONFIG[activeCategory] : null

  return (
    <section className="section placements-section" id="placements">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header reveal">
          <div className="editorial-tag">
            <span className="editorial-tag-dot" />
            <span>05 / Placement & Industry Track</span>
          </div>
          <h2 className="editorial-title">
            The <span className="highlight-yellow">Placement</span> & Industry Journey
          </h2>
          <p className="editorial-desc">
            A transparent record of engineering recruitment rounds, technical interviews, and industry evaluation stages.
          </p>
        </div>

        {placements.length > 0 ? (
          <>
            {/* Architectural Status Bento */}
            <div className="placement-status-bento reveal delay-1">
              {STATUS_KEYS.map((key) => {
                const cfg = STATUS_CONFIG[key]
                const count = grouped[key].length
                const isActive = activeCategory === key

                return (
                  <div key={key} className="placement-bento-tile-group">
                    <button
                      type="button"
                      className={`placement-bento-tile architectural-card status-${cfg.colorKey} ${
                        isActive ? 'is-active' : ''
                      } ${!count ? 'is-disabled' : ''}`}
                      onClick={() => handleToggle(key)}
                      disabled={!count}
                    >
                      <div className="tile-top-row">
                        <span className="tile-emoji">{cfg.emoji}</span>
                        <span className="tile-count-badge">{count}</span>
                      </div>

                      <div className="tile-body">
                        <h3 className="tile-label">{cfg.label}</h3>
                        <p className="tile-sub">{cfg.desc}</p>
                      </div>

                      <div className="tile-action-row">
                        <span className="tile-action-text">
                          {isActive ? 'Hide Details ▲' : 'View Records ▼'}
                        </span>
                      </div>
                    </button>

                    {/* Mobile inline dossier: appears directly below THIS card on mobile! */}
                    {isActive && (
                      <DossierWrap
                        activeCategory={activeCategory}
                        activeCfg={activeCfg}
                        activeItems={activeItems}
                        onClose={() => setActiveCategory(null)}
                        isMobile={true}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Desktop / tablet dossier under the entire bento grid */}
            {activeCategory && activeItems.length > 0 && (
              <DossierWrap
                activeCategory={activeCategory}
                activeCfg={activeCfg}
                activeItems={activeItems}
                onClose={() => setActiveCategory(null)}
                isMobile={false}
              />
            )}
          </>
        ) : (
          <div className="placements-empty-state architectural-card reveal">
            <div className="empty-state-icon">🏢</div>
            <h3 className="empty-state-title">Placement Records Loading</h3>
            <p className="empty-state-desc">
              Synchronizing interview records from the database.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
