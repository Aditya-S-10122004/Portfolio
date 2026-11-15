import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Sidebar.css'

const NAV = [
  { icon: '🏠', label: 'Dashboard', path: 'dashboard' },
  { icon: '📁', label: 'Projects', path: 'projects' },
  { icon: '⚡', label: 'Skills', path: 'skills' },
  { icon: '🎓', label: 'Certificates', path: 'certificates' },
  { icon: '🏢', label: 'Placements', path: 'placements' },
  { icon: '🔗', label: 'Links', path: 'links' },
  { icon: '✉️', label: 'Messages', path: 'messages' },
]

export default function Sidebar({ activePage, onNavigate, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  const handleNav = (path) => {
    onNavigate(path)
    onMobileClose()
  }

  return (
    <>
      {mobileOpen && <div className="sb-backdrop" onClick={onMobileClose} />}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sb-header">
          <div className="sb-logo">
            <span className="sb-logo-text">AS</span>
            <span className="sb-logo-dot" />
          </div>
          {!collapsed && <span className="sb-app-name">Admin Studio</span>}
          <button
            type="button"
            className="sb-collapse-btn desktop-only"
            onClick={() => setCollapsed((c) => !c)}
            title="Toggle sidebar"
          >
            {collapsed ? '→' : '←'}
          </button>
          <button
            type="button"
            className="sb-collapse-btn mobile-only"
            onClick={onMobileClose}
            title="Close menu"
          >
            ✕
          </button>
        </div>

        {/* User Card */}
        {!collapsed && (
          <div className="sb-user">
            <div className="sb-avatar">{user?.[0]?.toUpperCase() || 'A'}</div>
            <div className="sb-user-info">
              <p className="sb-username">{user || 'Administrator'}</p>
              <p className="sb-role">Portfolio Master</p>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav className="sb-nav" aria-label="Admin Navigation">
          {NAV.map((item) => (
            <button
              key={item.path}
              type="button"
              className={`sb-nav-item ${activePage === item.path ? 'active' : ''}`}
              onClick={() => handleNav(item.path)}
              title={collapsed ? item.label : ''}
            >
              <span className="sb-icon">{item.icon}</span>
              {!collapsed && <span className="sb-label">{item.label}</span>}
              {activePage === item.path && !collapsed && (
                <span className="sb-active-indicator" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer Actions: Theme Toggle & Logout */}
        <div className="sb-footer">
          <button
            type="button"
            className="sb-theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className="sb-theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            {!collapsed && (
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            )}
          </button>

          <button
            type="button"
            className="sb-logout"
            onClick={logout}
            title={collapsed ? 'Logout' : ''}
          >
            <span>🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
