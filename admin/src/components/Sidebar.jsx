import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const NAV = [
  { icon: '🏠', label: 'Dashboard',  path: 'dashboard' },
  { icon: '📁', label: 'Projects',   path: 'projects' },
  { icon: '⚡', label: 'Skills',     path: 'skills' },
  { icon: '🏢', label: 'Placements', path: 'placements' },
  { icon: '🔗', label: 'Links',      path: 'links' },
  { icon: '✉️', label: 'Messages',   path: 'messages' },
]

export default function Sidebar({ activePage, onNavigate }) {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sb-header">
        <div className="sb-logo">
          <span className="sb-logo-text">AS</span>
          <span className="sb-logo-dot">.</span>
        </div>
        {!collapsed && <span className="sb-app-name">Portfolio Admin</span>}
        <button className="sb-collapse-btn" onClick={() => setCollapsed(c => !c)} title="Toggle sidebar">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* User */}
      {!collapsed && (
        <div className="sb-user">
          <div className="sb-avatar">{user?.[0]?.toUpperCase()}</div>
          <div className="sb-user-info">
            <p className="sb-username">{user}</p>
            <p className="sb-role">Administrator</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sb-nav">
        {NAV.map(item => (
          <button
            key={item.path}
            className={`sb-nav-item ${activePage === item.path ? 'active' : ''}`}
            onClick={() => onNavigate(item.path)}
            title={collapsed ? item.label : ''}
          >
            <span className="sb-icon">{item.icon}</span>
            {!collapsed && <span className="sb-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="sb-footer">
        <button className="sb-logout" onClick={logout} title={collapsed ? 'Logout' : ''}>
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
