import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { ceeTopics } from '../data/questions'
import styles from './Navbar.module.css'

/* ── Streak calculator (reads from localStorage) ── */
function calcStreak(userId) {
  if (!userId) return 0
  const dates = new Set()
  for (const t of ceeTopics) {
    if (t.comingSoon) continue
    const ids = t.hasSubtopics && t.subtopics ? t.subtopics.map(s => s.id) : [t.id]
    for (const id of ids) {
      try {
        const saved = localStorage.getItem(`nepalprep-quiz-${userId}-${id}`)
        if (!saved) continue
        const s = JSON.parse(saved)
        if (s.savedAt) {
          const d = new Date(s.savedAt)
          dates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
        }
      } catch { /* ignore */ }
    }
  }
  if (dates.size === 0) return 0
  let streak = 0
  let d = new Date()
  while (true) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (dates.has(key)) {
      streak++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return streak
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const streak = useMemo(() => calcStreak(user?.uid), [user?.uid])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to={user ? '/dashboard' : '/'} className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoBlue}>Nepal</span>
          <span className={styles.logoDark}>Prep</span>
        </Link>

        {!user && (
          <div className={styles.links}>
            <a href="/#features" className={styles.link}>Features</a>
            <a href="/#how-it-works" className={styles.link}>How it Works</a>
            <Link to="/past-papers" className={styles.link}>Past Papers</Link>
          </div>
        )}

        <div className={styles.actions}>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.btnSecondary}>Dashboard</Link>
              <Link to="/stats" className={styles.btnSecondary}>Stats</Link>
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
          {streak > 0 && (
            <Link to="/stats" className={styles.streakBadge} title={`${streak} day streak!`}>
              🔥 {streak}
            </Link>
          )}
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
          {!user && (
            <>
              <a href="/#features" className={styles.drawerLink} onClick={closeMenu}>Features</a>
              <a href="/#how-it-works" className={styles.drawerLink} onClick={closeMenu}>How it Works</a>
            </>
          )}
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
              <Link to="/stats" className={styles.drawerLink} onClick={closeMenu}>Stats</Link>
              <Link to="/history" className={styles.drawerLink} onClick={closeMenu}>History</Link>
              <Link to="/tracker" className={styles.drawerLink} onClick={closeMenu}>Tracker</Link>
              {streak > 0 && (
                <Link to="/stats" className={styles.drawerStreak} onClick={closeMenu}>
                  🔥 {streak} day streak
                </Link>
              )}
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
