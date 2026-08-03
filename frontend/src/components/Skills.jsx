import { useEffect, useRef } from 'react'
import './Skills.css'

const CATEGORY_COLORS = {
  'Frontend': 'var(--accent-primary)',
  'Backend': 'var(--accent-secondary)',
  'Database': 'var(--accent-pink)',
  'Tools': 'var(--accent-green)',
  'Languages': '#f59e0b',
}

export default function Skills({ skills }) {
  const barsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const level = bar.getAttribute('data-level')
          bar.style.width = `${level}%`
        }
      })
    }, { threshold: 0.3 })

    barsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [skills])

  // Group skills by category
  const grouped = skills.reduce((acc, sk) => {
    const cat = sk.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(sk)
    return acc
  }, {})

  const defaultSkills = {
    'Frontend': [
      { name: 'React.js', level: 80 },
      { name: 'HTML / CSS', level: 90 },
      { name: 'JavaScript', level: 82 },
    ],
    'Backend': [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 75 },
    ],
    'Database': [
      { name: 'PostgreSQL', level: 72 },
      { name: 'MySQL', level: 70 },
    ],
    'Tools': [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
    ],
  }

  const displaySkills = skills.length > 0 ? grouped : defaultSkills

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <p className="section-subtitle reveal">
          <span className="tag">// skills</span>
        </p>
        <h2 className="section-title reveal reveal-delay-1">
          My <span className="gradient-text">Tech Stack</span>
        </h2>

        <div className="skills-grid">
          {Object.entries(displaySkills).map(([category, items], ci) => (
            <div
              className={`skill-category card reveal reveal-delay-${(ci % 4) + 1}`}
              key={category}
            >
              <div className="skill-cat-header">
                <span
                  className="skill-cat-dot"
                  style={{ background: CATEGORY_COLORS[category] || 'var(--accent-primary)' }}
                />
                <h3 className="skill-cat-title">{category}</h3>
              </div>

              <div className="skill-list">
                {items.map((sk) => (
                  <div className="skill-item" key={sk.name || sk.id}>
                    <span className="skill-name">{sk.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
