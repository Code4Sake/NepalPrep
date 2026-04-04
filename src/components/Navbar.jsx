import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ceeTopics } from '../data/questions'
import ThemeToggle from './ThemeToggle'
import styles from './Navbar.module.css'

/* ── Streak calculator ── */
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

/* ── Get user initials ── */
function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return parts[0][0].toUpperCase()
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const streak = useMemo(() => calcStreak(user?.uid), [user?.uid])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    setProfileOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  /* Close profile dropdown on outside click or Escape */
  useEffect(() => {
    if (!profileOpen) return
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [profileOpen])

  return (
    <>
      <div className={styles.navSpacer} />
      <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to={user ? '/dashboard' : '/'} className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>
            <span className={styles.logoAccent}>Nepal</span>Prep
          </span>
        </Link>

        <div className={styles.actions}>
          {user ? (
            <>
              {/* Main nav links — always visible */}
              <Link to="/dashboard" className={styles.btnSecondary}>Dashboard</Link>
              <Link to="/stats" className={styles.btnSecondary}>Stats</Link>
              <Link to="/history" className={styles.btnSecondary}>History</Link>
              <Link to="/tracker" className={styles.btnSecondary}>Tracker</Link>

              {/* Streak badge */}
              {streak > 0 && (
                <Link to="/stats" className={styles.streakBadge} title={`${streak} day streak!`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  {streak}d
                </Link>
              )}

              {/* Profile avatar + dropdown */}
              <div className={styles.profileWrap} ref={profileRef}>
                <button
                  className={styles.avatar}
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="Profile menu"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className={styles.avatarImg} referrerPolicy="no-referrer" />
                  ) : (
                    <span className={styles.avatarInitials}>{getInitials(user.displayName)}</span>
                  )}
                </button>

                {profileOpen && (
                  <div className={styles.profileMenu}>
                    {/* User info header */}
                    <div className={styles.profileHeader}>
                      <div className={styles.profileAvatarLg}>
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="" className={styles.avatarImgLg} referrerPolicy="no-referrer" />
                        ) : (
                          <span className={styles.avatarInitialsLg}>{getInitials(user.displayName)}</span>
                        )}
                      </div>
                      <div>
                        <p className={styles.profileName}>{user.displayName || 'Student'}</p>
                        <p className={styles.profileEmail}>{user.email}</p>
                      </div>
                    </div>

                    <div className={styles.profileDivider} />

                    {/* Quick links (mobile-friendly duplicates) */}
                    <Link to="/dashboard" className={styles.profileLink} onClick={() => setProfileOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                      Dashboard
                    </Link>
                    <Link to="/stats" className={styles.profileLink} onClick={() => setProfileOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                      Statistics
                    </Link>
                    <Link to="/tracker" className={styles.profileLink} onClick={() => setProfileOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                      Study Tracker
                    </Link>
                    <Link to="/mock-exam" className={styles.profileLink} onClick={() => setProfileOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Mock Exam
                    </Link>

                    <div className={styles.profileDivider} />

                    <button onClick={handleLogout} className={styles.profileLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnGhost}>Log in</Link>
              <Link to="/signup" className={styles.btnPrimary}>Start Practicing</Link>
            </>
          )}
        </div>

        <div className={styles.rightControls}>
          <ThemeToggle />
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerLinks} />
        <div className={styles.drawerDivider} />
        <div className={styles.drawerActions}>
          {user ? (
            <>
              {/* Profile info in drawer */}
              <div className={styles.drawerProfile}>
                <div className={styles.drawerAvatar}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className={styles.avatarImg} referrerPolicy="no-referrer" />
                  ) : (
                    <span className={styles.avatarInitials}>{getInitials(user.displayName)}</span>
                  )}
                </div>
                <div>
                  <p className={styles.drawerName}>{user.displayName || 'Student'}</p>
                  <p className={styles.drawerEmail}>{user.email}</p>
                </div>
              </div>
              <div className={styles.drawerDivider} />
              <Link to="/dashboard" className={styles.drawerLink} onClick={closeMenu}>Dashboard</Link>
              <Link to="/stats" className={styles.drawerLink} onClick={closeMenu}>Stats</Link>
              <Link to="/history" className={styles.drawerLink} onClick={closeMenu}>History</Link>
              <Link to="/tracker" className={styles.drawerLink} onClick={closeMenu}>Tracker</Link>
              <Link to="/mock-exam" className={styles.drawerLink} onClick={closeMenu}>Mock Exam</Link>
              {streak > 0 && (
                <Link to="/stats" className={styles.drawerStreak} onClick={closeMenu}>
                  {streak} day streak
                </Link>
              )}
              <button onClick={handleLogout} className={styles.drawerLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.drawerLink} onClick={closeMenu}>Log in</Link>
              <Link to="/signup" className={styles.drawerCta} onClick={closeMenu}>Start Practicing</Link>
            </>
          )}
        </div>
      </div>
    </nav>
    </>
  )
}
