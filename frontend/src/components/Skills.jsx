import { useState } from 'react'
import './Skills.css'

const DEFAULT_SKILLS = [
  // Frontend
  { id: 'f1', name: 'React.js', category: 'Frontend', level: 85 },
  { id: 'f2', name: 'JavaScript (ES6+)', category: 'Frontend', level: 88 },
  { id: 'f3', name: 'HTML5 / Modern CSS', category: 'Frontend', level: 92 },
  { id: 'f4', name: 'Responsive UI Design', category: 'Frontend', level: 88 },

  // Backend
  { id: 'b1', name: 'Node.js', category: 'Backend', level: 82 },
  { id: 'b2', name: 'Express.js', category: 'Backend', level: 80 },
  { id: 'b3', name: 'RESTful API Architecture', category: 'Backend', level: 85 },

  // Database
  { id: 'd1', name: 'PostgreSQL', category: 'Database', level: 78 },
  { id: 'd2', name: 'MySQL', category: 'Database', level: 75 },
  { id: 'd3', name: 'Database Normalization & SQL', category: 'Database', level: 82 },

  // Core & Languages
  { id: 'l1', name: 'C & C++', category: 'Languages', level: 85 },
  { id: 'l2', name: 'Data Structures & Algorithms', category: 'Languages', level: 82 },
  { id: 'l3', name: 'Object-Oriented Programming (OOP)', category: 'Languages', level: 90 },

  // Mobile & AI
  { id: 'm1', name: 'Flutter & Dart', category: 'Mobile & AI', level: 80 },
  { id: 'm2', name: 'Generative AI & LLM Workflows', category: 'Mobile & AI', level: 75 },

  // Tools
  { id: 't1', name: 'Git & GitHub Version Control', category: 'Tools', level: 88 },
  { id: 't2', name: 'VS Code & Linux CLI Tools', category: 'Tools', level: 90 },
]

export default function Skills({ skills }) {
  const [activeTab, setActiveTab] = useState('All')

  // Merge API skills or fallback
  const allSkills = skills && skills.length > 0 ? skills : DEFAULT_SKILLS

  // Extract distinct categories
  const categories = ['All', ...new Set(allSkills.map(s => s.category || 'General'))]

  const filteredSkills = activeTab === 'All'
    ? allSkills
    : allSkills.filter(s => (s.category || 'General') === activeTab)

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header text-center reveal">
          <div className="editorial-tag">
            <span className="editorial-tag-dot" />
            <span>02 / Technical Competence</span>
          </div>
          <h2 className="editorial-title">
            The <span className="highlight-yellow">Technology</span> & Tooling Stack
          </h2>
          <p className="editorial-desc">
            A battle-tested set of languages, frameworks, and foundational tools used to architect modern web systems and native apps.
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-row reveal delay-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`skills-filter-btn ${activeTab === cat ? 'is-active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modern Skills Grid */}
        <div className="skills-matrix-grid">
          {filteredSkills.map((sk, index) => {
            return (
              <div
                key={sk.id || sk.name}
                className={`skill-matrix-card architectural-card reveal delay-${(index % 4) + 1}`}
              >
                <div className="skill-card-top">
                  <div className="skill-meta">
                    <span className="skill-category-pill">{sk.category || 'Skill'}</span>
                    <h3 className="skill-title">{sk.name}</h3>
                  </div>
                  {/* <div className="skill-percent-badge">
                    {level}%
                  </div> */}
                </div>

                {/* <div className="skill-meter-track">
                  <div
                    className="skill-meter-fill"
                    style={{ width: `${level}%` }}
                  />
                </div> */}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
