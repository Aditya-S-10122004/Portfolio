import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Placements from './components/Placements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')
const toArray = (data) => (Array.isArray(data) ? data : [])

function PortfolioContent() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [placements, setPlacements] = useState([])
  const [links, setLinks] = useState([])
  const [certificates, setCertificates] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)

  useReveal()

  useEffect(() => {
    Promise.all([
      fetch(`${API}/projects`).then((r) => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/skills`).then((r) => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/placements`).then((r) => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/links`).then((r) => r.json()).then(toArray).catch(() => []),
      fetch(`${API}/certificates`).then((r) => r.json()).then(toArray).catch(() => []),
    ]).then(([proj, sk, place, lnk, certs]) => {
      setProjects(proj)
      setSkills(sk)
      setPlacements(place)
      setLinks(lnk)
      setCertificates(certs)
    })
  }, [])

  return (
    <>
      {initialLoading && <Loader onFinished={() => setInitialLoading(false)} />}
      <Cursor />
      <Navbar links={links} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Certificates certificates={certificates} />
        <Placements placements={placements} />
        <Contact />
      </main>
      <Footer links={links} />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
