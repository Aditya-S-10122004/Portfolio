import { useState, useRef, useEffect } from 'react'
import './Projects.css'

/* ── Full-detail Modal ─────────────────────────────── */
function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="proj-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="proj-modal">
        {/* Close */}
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">×</button>

        {/* Image */}
        {project.image_url && (
          <div className="proj-modal-image-wrap">
            <img src={project.image_url} alt={project.title} className="proj-modal-image" />
            <div className="proj-modal-image-gradient" />
          </div>
        )}

        <div className="proj-modal-body">
          {/* Title + badges */}
          <div className="proj-modal-header">
            <h2 className="proj-modal-title">{project.title}</h2>
            {project.featured && <span className="featured-badge">⭐ Featured</span>}
          </div>

          {/* Full description */}
          <p className="proj-modal-desc">{project.description}</p>

          {/* Tech stack */}
          {project.tech_stack?.length > 0 && (
            <div className="proj-modal-stack">
              <p className="proj-modal-label">Tech Stack</p>
              <div className="project-stack">
                {project.tech_stack.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="proj-modal-links">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="proj-modal-btn proj-modal-btn-outline">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
                View on GitHub
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer" className="proj-modal-btn proj-modal-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Project Card ──────────────────────────────────── */
function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotY = ((x - cx) / cx) * 8
    const rotX = -((y - cy) / cy) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <div
      ref={cardRef}
      className={`project-card card reveal reveal-delay-${(index % 3) + 1}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-card-glow" />

      {/* Image Banner */}
      <div className="project-image-wrap">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="project-image"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="project-image-fallback"
          style={{ display: project.image_url ? 'none' : 'flex' }}
        >
          <span>{project.title?.[0]?.toUpperCase()}</span>
        </div>
      </div>

      {/* Header — links */}
      <div className="project-header">
        <div className="project-icon">
          {project.featured && <span className="featured-badge">⭐ Featured</span>}
        </div>
        <div className="project-links">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="icon-link" title="GitHub"
               onClick={e => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="icon-link" title="Live Demo"
               onClick={e => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      {/* Tech Stack */}
      {project.tech_stack?.length > 0 && (
        <div className="project-stack">
          {project.tech_stack.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      )}

      {/* Read More */}
      <button className="read-more-btn" onClick={() => onOpen(project)}>
        Read more ↗
      </button>
    </div>
  )
}

/* ── Section ───────────────────────────────────────── */
export default function Projects({ projects }) {
  const [filter, setFilter]     = useState('All')
  const [selected, setSelected] = useState(null)

  const displayed = filter === 'Featured'
    ? projects.filter(p => p.featured)
    : projects

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <p className="section-subtitle reveal">
          <span className="tag">// projects</span>
        </p>
        <h2 className="section-title reveal reveal-delay-1">
          Things I've <span className="gradient-text">Built</span>
        </h2>

        {projects.length > 0 && (
          <div className="project-filters reveal reveal-delay-2">
            {['All', 'Featured'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {displayed.length > 0 ? (
          <div className="projects-grid">
            {displayed.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
            ))}
          </div>
        ) : (
          <div className="projects-empty reveal">
            <div className="empty-icon">🚧</div>
            <h3>Projects Coming Soon</h3>
            <p>It might take a while to load the projects. Please refresh the page once.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
