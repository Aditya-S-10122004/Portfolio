import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Projects.css'

/* ── Full Architectural Detail Modal ───────────────────────── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className="proj-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="proj-modal-dialog architectural-card" role="dialog" aria-modal="true">
        <button className="proj-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="proj-modal-body-scroll">
          {project.image_url && (
            <div className="proj-modal-banner">
              <img src={project.image_url} alt={project.title} className="proj-modal-img" />
              <div className="proj-modal-gradient" />
            </div>
          )}

          <div className="proj-modal-content">
            <div className="proj-modal-top">
              <div className="proj-modal-titles">
                {project.featured && (
                  <span className="featured-pill">★ Featured Architecture</span>
                )}
                <h2 className="proj-modal-heading">{project.title}</h2>
              </div>

              <div className="proj-modal-actions">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-pill"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                    Repository
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-green btn-pill"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Deployment
                  </a>
                )}
              </div>
            </div>

            <div className="proj-modal-body">
              <h4 className="proj-modal-subhead">System Overview</h4>
              <p className="proj-modal-desc">{project.description}</p>

              {project.tech_stack?.length > 0 && (
                <div className="proj-modal-stack-wrap">
                  <h4 className="proj-modal-subhead">Core Technologies</h4>
                  <div className="tech-badge-list">
                    {project.tech_stack.map((t) => (
                      <span className="tech-badge" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ── Project Card Component ────────────────────────────────── */
function ProjectCard({ project, index, onOpen }) {
  return (
    <article className={`project-architectural-card architectural-card reveal delay-${(index % 3) + 1}`}>
      {/* Card Header & Media Preview */}
      <div className="proj-media-container" onClick={() => onOpen(project)}>
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="proj-img"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="proj-fallback-media"
          style={{ display: project.image_url ? 'none' : 'flex' }}
        >
          <span className="fallback-monogram">{project.title?.[0]?.toUpperCase() || 'P'}</span>
        </div>

        {project.featured && (
          <span className="featured-pill card-featured-badge">★ Featured</span>
        )}
      </div>

      {/* Card Body */}
      <div className="proj-info-block">
        <div className="proj-headline-row">
          <h3 className="proj-card-title" onClick={() => onOpen(project)}>
            {project.title}
          </h3>
          <div className="proj-quick-links">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="icon-action-btn"
                title="View GitHub Repository"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="icon-action-btn"
                title="Open Live Preview"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <p className="proj-card-desc">{project.description}</p>

        {project.tech_stack?.length > 0 && (
          <div className="tech-badge-list">
            {project.tech_stack.slice(0, 4).map((t) => (
              <span className="tech-badge" key={t}>
                {t}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="tech-badge tech-badge-more">
                +{project.tech_stack.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="proj-card-footer">
          <button
            type="button"
            className="explore-detail-btn"
            onClick={() => onOpen(project)}
          >
            <span>Read Details & Architecture</span>
            <span className="btn-arrow">↗</span>
          </button>
        </div>
      </div>
    </article>
  )
}

/* ── Section Component ─────────────────────────────────────── */
export default function Projects({ projects = [] }) {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const displayed = filter === 'Featured'
    ? projects.filter((p) => p.featured)
    : projects

  const INITIAL_COUNT = 4
  const visible = showAll ? displayed : displayed.slice(0, INITIAL_COUNT)
  const hasMore = displayed.length > INITIAL_COUNT

  const handleFilter = (f) => {
    setFilter(f)
    setShowAll(false)
  }

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header reveal">
          <div className="editorial-tag">
            <span className="editorial-tag-dot" />
            <span>03 / Selected Works</span>
          </div>
          <div className="editorial-title-flex">
            <h2 className="editorial-title">
              Crafted with <span className="highlight-green">precision</span> &{' '}
              <span className="highlight-yellow">purpose</span>.
            </h2>

            {projects.length > 0 && (
              <div className="projects-filter-pills">
                {['All', 'Featured'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`proj-filter-pill ${filter === f ? 'is-active' : ''}`}
                    onClick={() => handleFilter(f)}
                  >
                    {f} Projects
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="editorial-desc">
            A curated index of engineered web applications, mobile tools, and problem-solving systems.
          </p>
        </div>

        {displayed.length > 0 ? (
          <>
            <div className="projects-editorial-grid">
              {visible.map((p, index) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={index}
                  onOpen={setSelected}
                />
              ))}
            </div>

            {hasMore && (
              <div className="projects-view-toggle reveal delay-2">
                <p className="view-toggle-count">
                  Viewing {visible.length} of {displayed.length} indexed projects
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-pill"
                  onClick={() => setShowAll((s) => !s)}
                >
                  <span>{showAll ? 'View Less' : 'View More Projects'}</span>
                  <span>{showAll ? '↑' : '↓'}</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="projects-empty-state architectural-card reveal">
            <div className="empty-state-icon">📁</div>
            <h3 className="empty-state-title">Projects Loading or Coming Soon</h3>
            <p className="empty-state-desc">
              Synchronizing projects archive with the database. Please check back shortly.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
