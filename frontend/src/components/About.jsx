import './About.css'

const PILLARS = [
  {
    icon: '⚡',
    title: 'Full-Stack Execution',
    desc: 'Crafting performant web backends in Node.js/Express with relational PostgreSQL databases and reactive, accessible React frontends.',
  },
  {
    icon: '📱',
    title: 'Flutter & Mobile',
    desc: 'Engineering cross-platform mobile experiences with fluid animations, native system bridges, and robust state architectures.',
  },
  {
    icon: '🧩',
    title: 'Algorithmic DSA & C++',
    desc: 'Deep foundation in Object-Oriented Programming, C, C++, and daily LeetCode practice sharpening analytical problem-solving.',
  },
  {
    icon: '🧠',
    title: 'Generative AI',
    desc: 'Pioneering intelligent workflows, prompt orchestration, vector retrieval, and practical AI tooling integrated into modern software.',
  },
]

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header reveal">
          <div className="editorial-tag">
            <span className="editorial-tag-dot" />
            <span>01 / Profile & Narrative</span>
          </div>
          <h2 className="editorial-title">
            Engineering with <span className="highlight-green">rigor</span>,<br />
            designing with <span className="highlight-yellow">intent</span>.
          </h2>
          <p className="editorial-desc">
            A software engineer grounded in computer science fundamentals and driven by shipping clean, resilient, and human-centered products.
          </p>
        </div>

        {/* Main Split Layout */}
        <div className="about-editorial-grid">
          {/* Left: Monogram Portrait & Credential Badge */}
          <div className="about-portrait-card architectural-card reveal delay-1">
            <div className="portrait-inner">
              <div className="portrait-stamp">
                <span className="stamp-monogram">AS</span>
                <span className="stamp-sub">DHARWAD · IN</span>
              </div>

              <div className="portrait-bio-summary">
                <h3 className="portrait-name">Aditya Sadalagi</h3>
                {/* <p className="portrait-role">Information Science Engineer</p> */}
                {/* <div className="portrait-institution">
                  <span className="inst-icon">🏛️</span>
                  <span>SDM College of Engineering & Technology, Dharwad</span>
                </div> */}
              </div>

              {/* Verified academic facts */}
              <div className="portrait-facts-grid">
                <div className="fact-tile">
                  <span className="fact-label">Cumulative GPA</span>
                  <span className="fact-value highlight-green">8.85 / 10.0</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">Academic Term</span>
                  <span className="fact-value">7th Semester</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">Specialization</span>
                  <span className="fact-value">ISE (Info Science)</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">Core Paradigm</span>
                  <span className="fact-value">C++ · OOP · DSA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Biography & Four Technical Pillars */}
          <div className="about-narrative-column">
            <div className="about-narrative-card architectural-card reveal delay-2">
              <h3 className="narrative-heading">Background & Philosophy</h3>
              {/* <p className="narrative-p">
                I am an Information Science and Engineering student at{' '}
                <strong>SDM College of Engineering & Technology</strong> with an{' '}
                <strong>8.85 CGPA</strong>. My journey bridges low-level algorithmic problem solving
                with modern high-level product engineering.
              </p> */}
              <p className="narrative-p">
                Skilled in <strong>C, C++, and Object-Oriented Programming</strong>, I have completed comprehensive
                work across Web and App Development (utilizing Flutter and modern JavaScript ecosystems). Currently,
                I am deeply focused on <strong>Generative AI integrations</strong> and actively practice Data Structures
                and Algorithms on <strong>LeetCode</strong> to consistently expand my computational reasoning.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="pillars-grid">
              {PILLARS.map((p, index) => (
                <div
                  key={p.title}
                  className={`pillar-card architectural-card reveal delay-${index + 1}`}
                >
                  <div className="pillar-header">
                    <span className="pillar-icon">{p.icon}</span>
                    <h4 className="pillar-title">{p.title}</h4>
                  </div>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
