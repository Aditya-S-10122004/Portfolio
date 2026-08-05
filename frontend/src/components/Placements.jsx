import './Placements.css'

const STATUS_CONFIG = {
  selected:  { label: 'Selected ✅', color: 'var(--accent-green)',   bg: 'rgba(0,255,135,0.1)',  border: 'rgba(0,255,135,0.3)' },
  rejected:  { label: 'Rejected ❌', color: 'var(--accent-pink)',    bg: 'rgba(255,107,157,0.1)', border: 'rgba(255,107,157,0.3)' },
  pending:   { label: 'Pending ⏳',  color: '#f59e0b',               bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  'on-hold': { label: 'On Hold 🔄', color: 'var(--accent-secondary)',bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.3)' },
}

function PlacementCard({ placement, index }) {
  const cfg = STATUS_CONFIG[placement.status] || STATUS_CONFIG.pending

  return (
    <div className={`placement-card reveal reveal-delay-${(index % 3) + 1}`}>
      {/* Timeline dot */}
      <div className="timeline-connector">
        <div className="timeline-dot" style={{ background: cfg.color, boxShadow: `0 0 12px ${cfg.color}` }} />
        <div className="timeline-line" />
      </div>

      <div className="placement-content card">
        <div className="placement-header">
          <div>
            <h3 className="placement-company">{placement.company}</h3>
            {placement.role && <p className="placement-role">{placement.role}</p>}
          </div>
          <span
            className="placement-status"
            style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            {cfg.label}
          </span>
        </div>

        {placement.date && (
          <p className="placement-date">
            📅 {new Date(placement.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
          </p>
        )}

        {placement.status === 'selected' && placement.package && (
          <div className="placement-package">
            💰 Package: <strong>{placement.package}</strong>
          </div>
        )}

        {placement.status === 'rejected' && placement.reason && (
          <div className="placement-reason">
            <span className="reason-label">Reason:</span> {placement.reason}
          </div>
        )}

        {placement.notes && (
          <p className="placement-notes">{placement.notes}</p>
        )}
      </div>
    </div>
  )
}

export default function Placements({ placements }) {
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
          <div className="placement-timeline">
            {placements.map((p, i) => (
              <PlacementCard key={p.id} placement={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="placements-empty reveal">
            <div className="empty-icon">🏢</div>
            <h3>Placement Records Coming Soon</h3>
            <p>It might take a while to load the placement activities. Please refresh the page once.</p>
          </div>
        )}
      </div>
    </section>
  )
}
