import { useState, useEffect, useMemo } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { ceeTopics } from '../data/questions'
import ThemeToggle from '../components/ThemeToggle'
import styles from './Dashboard.module.css'

/* ── CEE 5 domains ── */
const CEE_SUBJECTS = [
  { key: 'Zoology',   label: 'Zoology',   accent: '#0d9488', bg: 'rgba(13,148,136,0.1)',  short: 'ZOO', icon: '🦎' },
  { key: 'Botany',    label: 'Botany',    accent: '#16a34a', bg: 'rgba(22,163,74,0.1)',   short: 'BOT', icon: '🌿' },
  { key: 'Physics',   label: 'Physics',   accent: '#d97706', bg: 'rgba(217,119,6,0.1)',   short: 'PHY', icon: '⚛️' },
  { key: 'Chemistry', label: 'Chemistry', accent: '#7c3aed', bg: 'rgba(124,58,237,0.1)',  short: 'CHM', icon: '🧪' },
  { key: 'MAT',       label: 'MAT',       accent: '#e11d48', bg: 'rgba(225,29,72,0.1)',   short: 'MAT', icon: '🧠' },
]

const DOMAIN_MAP = {
  'cell-biology': 'Zoology', 'animal-tissue': 'Zoology', 'phylum': 'Zoology',
  'development-biology': 'Zoology', 'human-biology-diseases': 'Zoology',
  'human-physiology': 'Zoology', 'genetics': 'Zoology',
  'basic-component-life': 'Botany', 'plant-physiology': 'Botany',
}

function getTopicDomain(topic) {
  if (DOMAIN_MAP[topic.id]) return DOMAIN_MAP[topic.id]
  if (topic.subject === 'Physics') return 'Physics'
  if (topic.subject === 'Chemistry') return 'Chemistry'
  if (topic.subject === 'English' || topic.subject === 'Mathematics') return 'MAT'
  return 'Zoology'
}

function getSubjectColor(domain) {
  return CEE_SUBJECTS.find(s => s.key === domain) || { accent: '#6b7280', bg: 'rgba(107,114,128,0.1)', short: '—', icon: '📚' }
}

/* ── Icons ── */
const I = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  practice: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  mock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  papers: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  stats: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  history: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M2 12h2"/></svg>,
  tracker: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  zap: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  fire: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-4.32 0-8-3.59-8-8.16 0-2.94 1.49-5.93 4.13-8.3A28.2 28.2 0 0112 3c1.17 1.08 2.65 2.6 3.87 4.54C18.51 11.07 20 13.9 20 14.84 20 19.41 16.32 23 12 23z"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  target: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
}

/* ── Progress helpers ── */
function getProgress(userId, topicId) {
  try {
    const key = `nepalprep-quiz-${userId}-${topicId}`
    const saved = localStorage.getItem(key)
    if (!saved) return null
    const s = JSON.parse(saved)
    const done = (s.correctCount || 0) + (s.wrongCount || 0)
    if (done === 0) return null
    return { done, total: s.totalQuestions || 0, accuracy: Math.round((s.correctCount / done) * 100), savedAt: s.savedAt }
  } catch { return null }
}

function getAllProgress(userId, topics) {
  const results = {}
  for (const t of topics) {
    if (t.hasSubtopics && t.subtopics) {
      for (const sub of t.subtopics) {
        const p = getProgress(userId, sub.id)
        if (p) results[sub.id] = p
      }
    } else {
      const p = getProgress(userId, t.id)
      if (p) results[t.id] = p
    }
  }
  return results
}

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
  let streak = 0, d = new Date()
  while (true) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (dates.has(key)) { streak++; d.setDate(d.getDate() - 1) } else break
  }
  return streak
}

function getWeeklyHabit(userId) {
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const activeDates = new Set()
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
          activeDates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
        }
      } catch { /* ignore */ }
    }
  }
  const now = new Date()
  const dayOfWeek = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7))
  monday.setHours(0, 0, 0, 0)
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  return dayLabels.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const isFuture = d > now
    const isToday = dateStr === todayStr
    const studied = activeDates.has(dateStr)
    let status = 'missed'
    if (isFuture) status = 'future'
    else if (isToday) status = studied ? 'today' : 'todayMissed'
    else if (studied) status = 'studied'
    return { label, status, dateStr }
  })
}

function getRecentTopics(userId, progress) {
  const recent = []
  for (const t of ceeTopics) {
    if (t.comingSoon) continue
    if (t.hasSubtopics && t.subtopics) {
      let totalDone = 0, totalQs = 0, latestSave = null
      for (const sub of t.subtopics) {
        totalQs += sub.questionCount || 0
        const p = progress[sub.id]
        if (p) { totalDone += p.done; if (p.savedAt && (!latestSave || new Date(p.savedAt) > new Date(latestSave))) latestSave = p.savedAt }
      }
      if (totalDone > 0) recent.push({ ...t, progressDone: totalDone, progressTotal: totalQs, savedAt: latestSave })
    } else {
      const p = progress[t.id]
      if (p) recent.push({ ...t, progressDone: p.done, progressTotal: p.total, savedAt: p.savedAt })
    }
  }
  recent.sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0))
  return recent.slice(0, 4)
}

function getDomainProgress(progress) {
  const domains = {}
  for (const s of CEE_SUBJECTS) domains[s.key] = { done: 0, total: 0 }
  for (const t of ceeTopics) {
    const domain = getTopicDomain(t)
    if (!domains[domain]) domains[domain] = { done: 0, total: 0 }
    if (t.hasSubtopics && t.subtopics) {
      for (const sub of t.subtopics) {
        domains[domain].total += sub.questionCount || 0
        const p = progress[sub.id]
        if (p) domains[domain].done += p.done
      }
    } else {
      domains[domain].total += t.questionCount || 0
      const p = progress[t.id]
      if (p) domains[domain].done += p.done
    }
  }
  return CEE_SUBJECTS.map(s => ({
    ...s,
    done: domains[s.key]?.done || 0, total: domains[s.key]?.total || 0,
    pct: (domains[s.key]?.total || 0) > 0 ? Math.round(((domains[s.key]?.done || 0) / domains[s.key].total) * 100) : 0,
  }))
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return parts[0][0].toUpperCase()
}

function getGreeting(name) {
  const h = new Date().getHours()
  const firstName = name ? name.trim().split(' ')[0] : 'Student'
  if (h < 5)  return { greet: `Burning the midnight oil`, name: firstName, emoji: '🌙' }
  if (h < 12) return { greet: `Good morning`, name: firstName, emoji: '☀️' }
  if (h < 17) return { greet: `Good afternoon`, name: firstName, emoji: '🌤️' }
  if (h < 21) return { greet: `Good evening`, name: firstName, emoji: '🌆' }
  return { greet: `Late night study session`, name: firstName, emoji: '💫' }
}

function getMotivation(totalDone, avgAccuracy, streak) {
  if (totalDone === 0) return 'Start your first topic — every expert was once a beginner.'
  if (streak >= 7) return `${streak}-day streak! 🔥 You're unstoppable. Keep it going.`
  if (avgAccuracy >= 80) return 'Excellent accuracy! Now focus on covering more topics.'
  if (avgAccuracy >= 60) return `${avgAccuracy}% accuracy and climbing. Keep pushing!`
  if (totalDone >= 100) return `${totalDone} questions done! Review weak areas to boost accuracy.`
  return 'Practice daily — even 20 minutes makes a big difference.'
}

/* ── Live Countdown ── */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calcTime(targetDate))
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTime(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])
  return timeLeft
}

function calcTime(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  }
}

const CEE_DATE = new Date(2026, 7, 20).getTime()

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const countdown = useCountdown(CEE_DATE)

  useEffect(() => {
    document.title = 'Dashboard — NepalPrep'
    requestAnimationFrame(() => setMounted(true))
  }, [])

  const progress    = useMemo(() => getAllProgress(user?.uid, ceeTopics), [user?.uid])
  const streak      = useMemo(() => calcStreak(user?.uid), [user?.uid])
  const weeklyHabit = useMemo(() => getWeeklyHabit(user?.uid), [user?.uid])
  const recentTopics = useMemo(() => getRecentTopics(user?.uid, progress), [user?.uid, progress])
  const domainProgress = useMemo(() => getDomainProgress(progress), [progress])

  const attempted   = Object.keys(progress).length
  const totalDone   = Object.values(progress).reduce((a, p) => a + p.done, 0)
  const avgAccuracy = attempted ? Math.round(Object.values(progress).reduce((a, p) => a + p.accuracy, 0) / attempted) : 0
  const motivation  = getMotivation(totalDone, avgAccuracy, streak)
  const greeting    = getGreeting(user?.displayName)

  const handleLogout = async () => { await logout(); navigate('/') }

  const sidebarLinks = [
    { section: 'STUDY' },
    { to: '/dashboard', icon: I.dashboard, label: 'Dashboard' },
    { to: '/dashboard#practice', icon: I.practice, label: 'Practice', hash: true },
    { to: '/mock-exam', icon: I.mock, label: 'Mock Exam' },
    { section: 'TRACK' },
    { to: '/stats', icon: I.stats, label: 'Stats' },
    { to: '/history', icon: I.history, label: 'History' },
    { to: '/tracker', icon: I.tracker, label: 'Study Tracker' },
  ]

  const available  = ceeTopics.filter(t => !t.comingSoon)
  const comingSoon = ceeTopics.filter(t => t.comingSoon)

  return (
    <div className={styles.layout}>

      {/* ═══ SIDEBAR ═══ */}
      {sidebarOpen && <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarTop}>
          <Link to="/" className={styles.sidebarLogo}>
            <span className={styles.logoAccent}>Nepal</span>Prep
          </Link>
          <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}>{I.close}</button>
        </div>

        <nav className={styles.sidebarNav}>
          {sidebarLinks.map((item, i) =>
            item.section ? (
              <p key={i} className={styles.sidebarSection}>{item.section}</p>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/dashboard'}
                className={({ isActive }) => `${styles.sidebarLink} ${isActive && !item.hash ? styles.sidebarLinkActive : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className={styles.sidebarBottom}>
          {/* Streak card */}
          {streak > 0 && (
            <Link to="/stats" className={styles.streakCard} onClick={() => setSidebarOpen(false)}>
              <div className={styles.streakTop}>
                <span className={styles.streakFire}>{I.fire}</span>
                <span className={styles.streakNum}>{streak}</span>
                <span className={styles.streakLabel}>day streak</span>
              </div>
              <div className={styles.streakDots}>
                {[...Array(Math.min(streak, 7))].map((_, i) => (
                  <span key={i} className={styles.streakDot} />
                ))}
                {[...Array(Math.max(0, 7 - streak))].map((_, i) => (
                  <span key={`e${i}`} className={`${styles.streakDot} ${styles.streakDotEmpty}`} />
                ))}
              </div>
            </Link>
          )}

          {/* Theme toggle row */}
          <div className={styles.sidebarThemeRow}>
            <span className={styles.sidebarThemeLabel}>{dark ? 'Dark mode' : 'Light mode'}</span>
            <ThemeToggle />
          </div>

          {/* Profile */}
          <div className={styles.sidebarProfile}>
            <div className={styles.sidebarAvatar}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className={styles.avatarImg} referrerPolicy="no-referrer" />
              ) : (
                <span className={styles.avatarText}>{getInitials(user?.displayName)}</span>
              )}
            </div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{user?.displayName || 'Student'}</p>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn} title="Log out">{I.logout}</button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <main className={styles.main}>
        {/* Mobile top bar */}
        <div className={styles.mobileBar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>{I.menu}</button>
          <Link to="/" className={styles.mobileLogo}><span className={styles.logoAccent}>Nepal</span>Prep</Link>
          <div className={styles.mobileRight}>
            <ThemeToggle />
            <div className={styles.mobileAvatar}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className={styles.avatarImg} referrerPolicy="no-referrer" />
              ) : (
                <span className={styles.avatarText}>{getInitials(user?.displayName)}</span>
              )}
            </div>
          </div>
        </div>

        {/* ═══ GREETING HERO ═══ */}
        <div className={`${styles.greetingHero} ${mounted ? styles.anim : ''}`}>
          <div className={styles.greetingLeft}>
            <h1 className={styles.greetingTitle}>
              {greeting.greet}, <span className={styles.greetingName}>{greeting.name}</span> {greeting.emoji}
            </h1>
            <p className={styles.greetingMotivation}>{motivation}</p>
          </div>
          {/* CEE Countdown */}
          <div className={styles.countdownBlock}>
            <span className={styles.ceeBadge}>CEE 2083</span>
            <div className={styles.countdownTimer}>
              {[
                [countdown.days, 'days'],
                [String(countdown.hours).padStart(2,'0'), 'hrs'],
                [String(countdown.mins).padStart(2,'0'), 'min'],
                [String(countdown.secs).padStart(2,'0'), 'sec'],
              ].map(([val, lbl], i) => (
                <div key={lbl} className={styles.countdownUnit}>
                  <span className={`${styles.countdownNum} ${lbl === 'sec' ? styles.countdownSec : ''}`}>{val}</span>
                  <span className={styles.countdownLabel}>{lbl}</span>
                  {i < 3 && <span className={styles.countdownColon}>:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ STAT CARDS ═══ */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardPrimary} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.08s' }}>
            <div className={styles.statIconWrap} style={{ background: 'rgba(13,148,136,0.15)', color: 'var(--primary)' }}>
              {I.check}
            </div>
            <div className={styles.statBody}>
              <span className={styles.statNum} style={{ color: 'var(--primary)' }}>{totalDone}</span>
              <span className={styles.statLabel}>Questions Done</span>
            </div>
          </div>

          <div className={`${styles.statCard} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.13s' }}>
            <div className={styles.statIconWrap} style={{
              background: avgAccuracy >= 70 ? 'rgba(22,163,74,0.15)' : avgAccuracy >= 45 ? 'rgba(217,119,6,0.15)' : 'rgba(220,38,38,0.15)',
              color: avgAccuracy >= 70 ? '#16a34a' : avgAccuracy >= 45 ? '#d97706' : '#dc2626',
            }}>
              {I.target}
            </div>
            <div className={styles.statBody}>
              <span className={styles.statNum} style={{ color: avgAccuracy >= 70 ? '#16a34a' : avgAccuracy >= 45 ? '#d97706' : '#dc2626' }}>
                {avgAccuracy}%
              </span>
              <span className={styles.statLabel}>Avg Topic Acc.</span>
            </div>
          </div>

          <div className={`${styles.statCard} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.18s' }}>
            <div className={styles.statIconWrap} style={{ background: 'rgba(124,58,237,0.15)', color: '#7c3aed' }}>
              {I.practice}
            </div>
            <div className={styles.statBody}>
              <span className={styles.statNum} style={{ color: '#7c3aed' }}>{attempted}</span>
              <span className={styles.statLabel}>Topics Started</span>
            </div>
          </div>

          <div className={`${styles.statCard} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.23s' }}>
            <div className={styles.statIconWrap} style={{ background: 'rgba(220,74,56,0.15)', color: 'var(--accent)' }}>
              {I.fire}
            </div>
            <div className={styles.statBody}>
              <span className={styles.statNum} style={{ color: 'var(--accent)' }}>{streak}</span>
              <span className={styles.statLabel}>Day Streak</span>
            </div>
          </div>
        </div>

        {/* ═══ TWO COLUMN PANELS ═══ */}
        <div className={`${styles.twoCol} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.28s' }}>

          {/* Continue where you left off */}
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>
              <span className={styles.panelTitleDot} style={{ background: 'var(--primary)' }} />
              Continue practicing
            </h2>
            {recentTopics.length > 0 ? (
              <div className={styles.continueList}>
                {recentTopics.map((t) => {
                  const sc = getSubjectColor(getTopicDomain(t))
                  const pct = t.progressTotal > 0 ? Math.round((t.progressDone / t.progressTotal) * 100) : 0
                  return (
                    <Link key={t.id} to={t.hasSubtopics ? `/topic/cee/${t.id}` : `/quiz/cee/${t.id}`} className={styles.continueItem}>
                      <div className={styles.continueAccent} style={{ background: sc.accent }} />
                      <div className={styles.continueInfo}>
                        <h3 className={styles.continueName}>{t.name}</h3>
                        <div className={styles.continueMeta}>
                          <span className={styles.continueBadge} style={{ background: sc.bg, color: sc.accent }}>{sc.short}</span>
                          <span className={styles.continueProg}>{t.progressDone}/{t.progressTotal} done</span>
                        </div>
                        <div className={styles.continueBar}>
                          <div className={styles.continueBarFill} style={{ width: `${pct}%`, background: sc.accent }} />
                        </div>
                      </div>
                      <span className={styles.continueArrow}>{I.arrow}</span>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📖</div>
                <p className={styles.emptyMsg}>Start practicing to track your progress here</p>
                <a href="#practice" className={styles.emptyBtn}>Browse topics {I.arrow}</a>
              </div>
            )}
            <a href="#practice" className={styles.viewAllLink}>View all topics {I.arrow}</a>
          </div>

          {/* Subject progress */}
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>
              <span className={styles.panelTitleDot} style={{ background: 'var(--accent)' }} />
              Subject progress
            </h2>
            <div className={styles.subjectList}>
              {domainProgress.map(sp => (
                <div key={sp.key} className={styles.subjectItem}>
                  <div className={styles.subjectIconWrap} style={{ background: sp.bg, color: sp.accent }}>
                    <span className={styles.subjectEmoji}>{sp.icon}</span>
                  </div>
                  <div className={styles.subjectInfo}>
                    <div className={styles.subjectTop}>
                      <span className={styles.subjectName}>{sp.label}</span>
                      <span className={styles.subjectPct} style={{ color: sp.accent }}>{sp.pct}%</span>
                    </div>
                    <div className={styles.subjectBar}>
                      <div className={styles.subjectBarFill} style={{ width: `${Math.max(sp.pct, sp.pct > 0 ? 2 : 0)}%`, background: sp.accent }} />
                    </div>
                    <span className={styles.subjectCount}>{sp.done} / {sp.total} answered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ THIS WEEK ═══ */}
        <div className={`${styles.panel} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.33s' }}>
          <h2 className={styles.panelTitle}>
            <span className={styles.panelTitleDot} style={{ background: '#d97706' }} />
            This week
          </h2>
          <div className={styles.habitRow}>
            {weeklyHabit.map((d, i) => (
              <div key={i} className={styles.habitDay}>
                <div className={`${styles.habitBlock} ${styles[`habit_${d.status}`]}`}>
                  {d.status === 'studied' && <span className={styles.habitCheck}>✓</span>}
                  {d.status === 'today' && <span className={styles.habitCheck}>✓</span>}
                  {(d.status === 'todayMissed') && <span className={styles.habitNow}>•</span>}
                </div>
                <span className={`${styles.habitLabel} ${d.status === 'today' || d.status === 'todayMissed' ? styles.habitLabelToday : ''}`}>{d.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.habitLegend}>
            <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendStudied}`} /> Studied</span>
            <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendToday}`} /> Today</span>
            <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendMissed}`} /> Missed</span>
            <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendFuture}`} /> Upcoming</span>
          </div>
        </div>

        {/* ═══ START PRACTICING CTA ═══ */}
        <div className={`${styles.practiceCtaWrap} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.38s' }}>
          <a href="#practice" className={styles.practiceCta}>
            <span className={styles.practiceCtaIcon}>{I.zap}</span>
            Start Practicing
          </a>
        </div>

        {/* ═══ TOPIC CARDS ═══ */}
        <div id="practice" className={`${styles.practiceSection} ${mounted ? styles.anim : ''}`} style={{ animationDelay: '0.42s' }}>
          <h2 className={styles.sectionTitle}>All Topics</h2>
          <div className={styles.topicGrid}>
            {available.map((topic, idx) => {
              const domain  = getTopicDomain(topic)
              const sc      = getSubjectColor(domain)
              let pDone = 0, pTotal = 0
              if (topic.hasSubtopics && topic.subtopics) {
                for (const sub of topic.subtopics) {
                  pTotal += sub.questionCount || 0
                  const p = progress[sub.id]
                  if (p) pDone += p.done
                }
              } else {
                pTotal = topic.questionCount || 0
                const p = progress[topic.id]
                if (p) pDone = p.done
              }
              const pct = pTotal > 0 ? Math.round((pDone / pTotal) * 100) : 0
              return (
                <Link key={topic.id}
                  to={topic.hasSubtopics ? `/topic/cee/${topic.id}` : `/quiz/cee/${topic.id}`}
                  className={styles.topicCard}
                  style={{ '--card-accent': sc.accent, '--card-bg': sc.bg, animationDelay: `${0.45 + idx * 0.035}s` }}
                >
                  <div className={styles.cardAccentBar} />
                  <div className={styles.cardHeader}>
                    <div className={styles.cardSubjectIcon} style={{ background: sc.bg, color: sc.accent }}>
                      <span className={styles.cardEmoji}>{sc.icon}</span>
                    </div>
                    <span className={styles.cardCount}>{topic.questionCount} Qs</span>
                  </div>
                  <h3 className={styles.cardName}>{topic.name}</h3>
                  <p className={styles.cardDomain}>{domain}</p>
                  {pDone > 0 ? (
                    <div className={styles.cardProgress}>
                      <div className={styles.cardBar}>
                        <div className={styles.cardBarFill} style={{ width: `${pct}%`, background: sc.accent }} />
                      </div>
                      <span className={styles.cardPct}>{pDone}/{pTotal} · {pct}%</span>
                    </div>
                  ) : (
                    <span className={styles.cardStart}>Start Practice {I.arrow}</span>
                  )}
                </Link>
              )
            })}
            {comingSoon.map(topic => {
              const sc = getSubjectColor(getTopicDomain(topic))
              return (
                <div key={topic.id} className={`${styles.topicCard} ${styles.topicCardDisabled}`}>
                  <div className={styles.cardAccentBar} style={{ opacity: 0.3 }} />
                  <div className={styles.cardHeader}>
                    <div className={styles.cardSubjectIcon} style={{ background: sc.bg, color: sc.accent, opacity: 0.5 }}>
                      <span className={styles.cardEmoji}>{sc.icon}</span>
                    </div>
                    <span className={styles.cardSoon}>Coming soon</span>
                  </div>
                  <h3 className={styles.cardName}>{topic.name}</h3>
                  <p className={styles.cardDomain}>{getTopicDomain(topic)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
