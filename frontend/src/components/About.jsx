import './About.css'

const highlights = [
  { icon: '🎓', label: 'College', value: 'SDM College of Engineering & Technology' },
  { icon: '📚', label: 'Branch', value: 'Information Science & Engineering' },
  { icon: '🗓️', label: 'Semester', value: '7th Semester' },
  { icon: '📍', label: 'Location', value: 'Dharwad, Karnataka' },
]

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left: Avatar + floating badges */}
          <div className="about-visual reveal">
            <div className="avatar-wrapper">
              <div className="avatar-ring" />
              <div className="avatar-inner">
                <span className="avatar-initials">AS</span>
              </div>
              <div className="floating-badge fb-1">💻 React</div>
              <div className="floating-badge fb-2">🛢️ PostgreSQL</div>
              <div className="floating-badge fb-3">🚀 Node.js</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content">
            <p className="about-tag reveal">
              <span className="tag">// about me</span>
            </p>
            <h2 className="section-title about-title reveal reveal-delay-1">
              Passionate About <span className="gradient-text">Technology</span>
            </h2>

            <p className="about-bio reveal reveal-delay-2">
              I'm <strong>Aditya Sadalagi</strong>, a driven Computer Science student currently
              in my 7th semester at SDM College of Engineering and Technology, Dharwad.
              I thrive on building real-world projects that solve actual problems.
            </p>

            <p className="about-bio reveal reveal-delay-3">
              My passion lies in full-stack development — from crafting pixel-perfect UIs
              to designing robust backends. I believe in writing clean, scalable code and
              constantly pushing the boundaries of what I can build.
            </p>

            <div className="about-highlights reveal reveal-delay-4">
              {highlights.map((h) => (
                <div className="highlight-item" key={h.label}>
                  <span className="highlight-icon">{h.icon}</span>
                  <div>
                    <span className="highlight-label">{h.label}</span>
                    <span className="highlight-value">{h.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
