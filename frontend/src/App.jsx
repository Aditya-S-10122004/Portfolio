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

// Strip trailing slash so VITE_API_URL=/api/ and /api both work correctly
const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

// Safety: if API returns an error object instead of array, use []
const toArray = (data) => (Array.isArray(data) ? data : [])

function App() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [placements, setPlacements] = useState([])
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useReveal()

  useEffect(() => {
    Promise.all([
      fetch(`${API}/projects`).then(r => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/skills`).then(r => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/placements`).then(r => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/links`).then(r => r.json()).then(toArray).catch(() => []),
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
