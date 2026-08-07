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
  projects:  Projects,
  skills:    Skills,
  placements: Placements,
  links:     Links,
  messages:  Messages,
}

const PAGE_LABELS = {
  dashboard: '🏠 Dashboard',
  projects:  '📁 Projects',
  skills:    '⚡ Skills',
  placements:'🏢 Placements',
  links:     '🔗 Links',
  messages:  '✉️ Messages',
}

function AdminApp() {
  const { isLoggedIn } = useAuth()
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isLoggedIn) return <Login />

  const PageComponent = PAGES[page] || Dashboard

  return (
    <div className="admin-layout">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="admin-body">
        {/* Mobile top header */}
        <header className="mobile-header">
          <button className="mobile-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
          <span className="mobile-page-title">{PAGE_LABELS[page]}</span>
          <div className="mobile-logo">
            <span className="sb-logo-text">AS</span>
            <span className="sb-logo-dot">.</span>
          </div>
        </header>

        <main className="admin-main">
          <div className="admin-content">
            <PageComponent />
          </div>
        </main>
      </div>
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
