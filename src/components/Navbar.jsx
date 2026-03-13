import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoBlue}>Nepal</span>
          <span className={styles.logoDark}>Prep</span>
        </Link>

        <div className={styles.links}>
          <Link to="/#features" className={styles.link}>Features</Link>
          <Link to="/#how-it-works" className={styles.link}>How it Works</Link>
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
        </div>
      </div>
    </nav>
  )
}
