import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Placements from './components/Placements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [placements, setPlacements] = useState([])
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useReveal()

  useEffect(() => {
    Promise.all([
      fetch(`${API}/projects`).then(r => r.json()).catch(() => []),
      fetch(`${API}/skills`).then(r => r.json()).catch(() => []),
      fetch(`${API}/placements`).then(r => r.json()).catch(() => []),
      fetch(`${API}/links`).then(r => r.json()).catch(() => []),
    ]).then(([proj, sk, place, lnk]) => {
      setProjects(proj)
      setSkills(sk)
      setPlacements(place)
      setLinks(lnk)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Cursor />
      <Navbar links={links} />
      <main>
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Placements placements={placements} />
        <Contact />
      </main>
      <Footer links={links} />
    </>
  )
}

export default App
