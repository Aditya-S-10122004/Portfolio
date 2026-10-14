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

            {/* <p className="about-bio reveal reveal-delay-2">
              I'm <strong>Aditya Sadalagi</strong>, a driven Computer Science student currently
              in my 7th semester at SDM College of Engineering and Technology, Dharwad.
              I thrive on building real-world projects that solve actual problems.
            </p> */}

            <p className="about-bio reveal reveal-delay-3">
              I'm <strong>Aditya Sadalagi</strong>, an Information Science and Engineering student with a CGPA of 8.85, passionate about software development, flutter development and problem-solving. Skilled in C, C++, and OOP, I’ve completed Web and App Development and currently focusing on GenAI.I actively practice DSA on LeetCode to enhance my coding and logical thinking skills.
            </p>

            {/* <div className="about-highlights reveal reveal-delay-4">
              {highlights.map((h) => (
                <div className="highlight-item" key={h.label}>
                  <span className="highlight-icon">{h.icon}</span>
                  <div>
                    <span className="highlight-label">{h.label}</span>
                    <span className="highlight-value">{h.value}</span>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
