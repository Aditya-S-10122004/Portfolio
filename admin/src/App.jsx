import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Placements from './pages/Placements'
import Links from './pages/Links'
import Messages from './pages/Messages'
import './index.css'
import './pages/Messages.css'

const PAGES = {
  dashboard: Dashboard,
  projects: Projects,
  skills: Skills,
  placements: Placements,
  links: Links,
  messages: Messages,
}

function AdminApp() {
  const { isLoggedIn } = useAuth()
  const [page, setPage] = useState('dashboard')

  if (!isLoggedIn) return <Login />

  const PageComponent = PAGES[page] || Dashboard

  return (
    <div className="admin-layout">
      <Sidebar activePage={page} onNavigate={setPage} />
      <main className="admin-main">
        <div className="admin-content">
          <PageComponent />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  )
}
