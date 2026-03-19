import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoBlue}>Nepal</span>
          <span className={styles.logoDark}>Prep</span>
        </Link>

        <div className={styles.links}>
          <a href="/#features" className={styles.link}>Features</a>
          <a href="/#how-it-works" className={styles.link}>How it Works</a>
          <Link to="/past-papers" className={styles.link}>Past Papers</Link>
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.btnSecondary}>Dashboard</Link>
              <Link to="/history" className={styles.btnSecondary}>History</Link>
              <Link to="/tracker" className={styles.btnSecondary}>Tracker</Link>
              <button onClick={handleLogout} className={styles.btnOutline}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnGhost}>Log in</Link>
              <Link to="/signup" className={styles.btnPrimary}>Get Started Free →</Link>
            </>
          )}
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Hamburger button */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerLinks}>
          <a href="/#features" className={styles.drawerLink} onClick={closeMenu}>Features</a>
          <a href="/#how-it-works" className={styles.drawerLink} onClick={closeMenu}>How it Works</a>
          <Link to="/past-papers" className={styles.drawerLink} onClick={closeMenu}>Past Papers</Link>
        </div>
        <div className={styles.drawerDivider} />
        <div className={styles.drawerActions}>
          <button onClick={() => { toggleTheme(); closeMenu() }} className={styles.drawerLink}>
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <div className={styles.drawerDivider} />
          {user ? (
            <>
              <Link to="/dashboard" className={styles.drawerLink} onClick={closeMenu}>Dashboard</Link>
              <Link to="/history" className={styles.drawerLink} onClick={closeMenu}>History</Link>
              <Link to="/tracker" className={styles.drawerLink} onClick={closeMenu}>Tracker</Link>
              <button onClick={handleLogout} className={styles.drawerLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.drawerLink} onClick={closeMenu}>Log in</Link>
              <Link to="/signup" className={styles.drawerCta} onClick={closeMenu}>Get Started Free →</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
