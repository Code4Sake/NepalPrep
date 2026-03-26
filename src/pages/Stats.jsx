import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './Stats.module.css'

/* ── Nepali BS Calendar helpers ──────────────────────────── */

const BS_MONTHS = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// BS month lengths for years 2080–2083
const BS_DATA = {
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
}

// Reference: 2080-01-01 BS = 2023-04-14 AD (Friday = day 5)
const BS_REF = { y: 2080, m: 1, d: 1 }
const AD_REF = new Date(2023, 3, 14) // April 14, 2023
const AD_REF_WEEKDAY = 5 // Friday

function adToBS(adDate) {
  const ad = new Date(adDate.getFullYear(), adDate.getMonth(), adDate.getDate())
  let diff = Math.floor((ad - AD_REF) / 86400000)
  let bsY = BS_REF.y, bsM = BS_REF.m, bsD = BS_REF.d

  if (diff >= 0) {
    while (diff > 0) {
      const mLen = (BS_DATA[bsY] || BS_DATA[2082])[bsM - 1]
      const daysLeft = mLen - bsD
      if (diff <= daysLeft) {
        bsD += diff
        diff = 0
      } else {
        diff -= (daysLeft + 1)
        bsD = 1
        bsM++
        if (bsM > 12) { bsM = 1; bsY++ }
      }
    }
  } else {
    diff = Math.abs(diff)
    while (diff > 0) {
      if (diff < bsD) {
        bsD -= diff
        diff = 0
      } else {
        diff -= bsD
        bsM--
        if (bsM < 1) { bsM = 12; bsY-- }
        bsD = (BS_DATA[bsY] || BS_DATA[2082])[bsM - 1]
      }
    }
  }
  return { y: bsY, m: bsM, d: bsD }
}

function getBSDaysInMonth(bsYear, bsMonth) {
  return (BS_DATA[bsYear] || BS_DATA[2082])[bsMonth - 1]
}

// Get the AD date for BS date
function bsToAD(bsY, bsM, bsD) {
  let days = 0
  let y = BS_REF.y, m = BS_REF.m
  // Count days from reference start-of-month to target start-of-month
  while (y < bsY || (y === bsY && m < bsM)) {
    days += (BS_DATA[y] || BS_DATA[2082])[m - 1]
    m++
    if (m > 12) { m = 1; y++ }
  }
  days += (bsD - 1) // add day offset within target month
  const result = new Date(AD_REF)
  result.setDate(result.getDate() + days)
  return result
}

// Get the weekday (0=Sun..6=Sat) of the 1st of a BS month
function getFirstDayWeekday(bsYear, bsMonth) {
  let totalDays = 0
  let y = BS_REF.y, m = BS_REF.m
  while (y < bsYear || (y === bsYear && m < bsMonth)) {
    totalDays += (BS_DATA[y] || BS_DATA[2082])[m - 1]
    m++
    if (m > 12) { m = 1; y++ }
  }
  return (AD_REF_WEEKDAY + totalDays) % 7
}

/* ── Data helpers ────────────────────────────────────────── */

function getProgress(userId, topicId) {
  try {
    const key = `nepalprep-quiz-${userId}-${topicId}`
    const saved = localStorage.getItem(key)
    if (!saved) return null
    const s = JSON.parse(saved)
    const done = (s.correctCount || 0) + (s.wrongCount || 0)
    if (done === 0) return null
    const correct = s.correctCount || 0
    const accuracy = Math.round((correct / done) * 100)
    let totalTime = 0
    let avgTime = null
    if (s.questionTimes) {
      const times = Object.values(s.questionTimes)
      if (times.length > 0) {
        totalTime = times.reduce((a, b) => a + b, 0)
        avgTime = Math.round(totalTime / times.length)
      }
    }
    return { done, total: s.totalQuestions || 0, correct, accuracy, avgTime, totalTime, savedAt: s.savedAt }
  } catch { return null }
}

function getAllStats(userId, topics) {
  const results = []
  for (const t of topics) {
    if (t.comingSoon) continue
    if (t.hasSubtopics && t.subtopics) {
      for (const sub of t.subtopics) {
        const p = getProgress(userId, sub.id)
        if (p) results.push({ ...p, id: sub.id, name: sub.name, subject: t.subject, emoji: t.emoji })
      }
    } else {
      const p = getProgress(userId, t.id)
      if (p) results.push({ ...p, id: t.id, name: t.name, subject: t.subject, emoji: t.emoji })
    }
  }
  return results
}

function getAllTopics(topics) {
  const result = []
  for (const t of topics) {
    if (t.comingSoon) continue
    if (t.hasSubtopics && t.subtopics) {
      for (const sub of t.subtopics) {
        result.push({ id: sub.id, name: sub.name, subject: t.subject, emoji: t.emoji, questionCount: sub.questionCount })
      }
    } else {
      result.push({ id: t.id, name: t.name, subject: t.subject, emoji: t.emoji, questionCount: t.questionCount })
    }
  }
  return result
}

function formatTimeStat(seconds) {
  if (seconds == null || seconds === 0) return '—'
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

function formatTotalTime(seconds) {
  if (seconds == null || seconds === 0) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`
  if (m > 0) return s > 0 ? `${m}m ${s}s` : `${m}m`
  return `${s}s`
}

function getStudyDates(userId, topics) {
  const dates = new Set()
  for (const t of topics) {
    if (t.comingSoon) continue
    const ids = t.hasSubtopics && t.subtopics ? t.subtopics.map(s => s.id) : [t.id]
    for (const id of ids) {
      try {
        const key = `nepalprep-quiz-${userId}-${id}`
        const saved = localStorage.getItem(key)
        if (!saved) continue
        const s = JSON.parse(saved)
        if (s.savedAt) {
          const d = new Date(s.savedAt)
          dates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
        }
      } catch { /* ignore */ }
    }
  }
  return dates
}

function getStreak(studyDates) {
  if (studyDates.size === 0) return 0
  const today = new Date()
  let streak = 0
  let d = new Date(today)
  while (true) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (studyDates.has(key)) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

/* ── Component ───────────────────────────────────────────── */

export default function Stats() {
  const { user } = useAuth()
  const [exam] = useState('cee')

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const stats = getAllStats(user?.uid, topics)
  const allTopics = getAllTopics(topics)
  const studyDates = getStudyDates(user?.uid, topics)
  const streak = getStreak(studyDates)

  // ── Nepali calendar with month navigation
  const todayBS = useMemo(() => adToBS(new Date()), [])
  const [calMonth, setCalMonth] = useState(todayBS.m)
  const [calYear, setCalYear] = useState(todayBS.y)
  const bsDaysInMonth = getBSDaysInMonth(calYear, calMonth)
  const firstDayWeekday = getFirstDayWeekday(calYear, calMonth)

  const calendarDays = useMemo(() => {
    const days = []
    for (let d = 1; d <= bsDaysInMonth; d++) {
      const adDate = bsToAD(calYear, calMonth, d)
      const adKey = `${adDate.getFullYear()}-${String(adDate.getMonth() + 1).padStart(2, '0')}-${String(adDate.getDate()).padStart(2, '0')}`
      days.push({
        bsDay: d,
        adKey,
        isToday: calYear === todayBS.y && calMonth === todayBS.m && d === todayBS.d,
        studied: studyDates.has(adKey),
      })
    }
    return days
  }, [calYear, calMonth, bsDaysInMonth, todayBS, studyDates])

  const prevMonth = () => {
    if (calMonth === 1) { setCalMonth(12); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 12) { setCalMonth(1); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  // ── Overview
  const totalDone = stats.reduce((a, s) => a + s.done, 0)
  const totalCorrect = stats.reduce((a, s) => a + s.correct, 0)
  const overallAccuracy = totalDone > 0 ? Math.round((totalCorrect / totalDone) * 100) : null
  const timesWithData = stats.filter(s => s.avgTime != null)
  const overallAvgTime = timesWithData.length > 0
    ? Math.round(timesWithData.reduce((a, s) => a + s.avgTime, 0) / timesWithData.length)
    : null
  const grandTotalTime = stats.reduce((a, s) => a + (s.totalTime || 0), 0)

  // ── Subject breakdown
  const subjects = ['Biology', 'Physics', 'Chemistry', 'English']
  const subjectData = subjects.map(sub => {
    const topicsSub = allTopics.filter(t => t.subject === sub)
    const statsSub = stats.filter(s => s.subject === sub)
    const totalQs = topicsSub.reduce((a, t) => a + (t.questionCount || 0), 0)
    const done = statsSub.reduce((a, s) => a + s.done, 0)
    const correct = statsSub.reduce((a, s) => a + s.correct, 0)
    const accuracy = done > 0 ? Math.round((correct / done) * 100) : null
    const totalTime = statsSub.reduce((a, s) => a + (s.totalTime || 0), 0)
    return { subject: sub, totalQs, done, correct, accuracy, totalTime, topicsStarted: statsSub.length, totalTopics: topicsSub.length }
  })

  // ── Topic performance
  const topicPerformance = stats
    .map(s => ({ ...s, pct: Math.round((s.done / s.total) * 100) }))
    .sort((a, b) => b.done - a.done)

  // ── Weak topics
  const weakTopics = stats
    .filter(s => s.accuracy < 60 && s.done >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 6)

  // ── Bar chart
  const [chartTab, setChartTab] = useState('accuracy')
  const chartMax = useMemo(() => {
    if (chartTab === 'accuracy') return 100
    return Math.max(...subjectData.map(s => s.totalTime), 1)
  }, [subjectData, chartTab])

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>📊 My Statistics</h1>
            <p className={styles.subtitle}>Track your progress and identify areas to improve</p>
          </div>
          <Link to="/dashboard" className={styles.dashLink}>← Dashboard</Link>
        </div>

        {stats.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📋</div>
            <h3 className={styles.emptyTitle}>No stats yet</h3>
            <p className={styles.emptyText}>Start practicing to see your statistics here!</p>
            <Link to="/dashboard" className={styles.emptyBtn}>Go to Dashboard →</Link>
          </div>
        ) : (
          <>
            {/* ── Overview Cards ─────────────────────────── */}
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCard}>
                <span className={styles.overviewIcon}>📚</span>
                <span className={styles.overviewValue}>{stats.length}</span>
                <span className={styles.overviewLabel}>Topics Started</span>
              </div>
              <div className={styles.overviewCard}>
                <span className={styles.overviewIcon}>✅</span>
                <span className={styles.overviewValue}>{totalDone}</span>
                <span className={styles.overviewLabel}>Questions Done</span>
              </div>
              <div className={styles.overviewCard}>
                <span className={styles.overviewIcon}>🎯</span>
                <span className={`${styles.overviewValue} ${overallAccuracy >= 75 ? styles.vGreen : overallAccuracy >= 50 ? styles.vAmber : styles.vRed}`}>
                  {overallAccuracy != null ? `${overallAccuracy}%` : '—'}
                </span>
                <span className={styles.overviewLabel}>Accuracy Rate</span>
              </div>
              <div className={styles.overviewCard}>
                <span className={styles.overviewIcon}>⏱</span>
                <span className={styles.overviewValue}>{formatTimeStat(overallAvgTime)}</span>
                <span className={styles.overviewLabel}>Avg Time / Q</span>
              </div>
              <div className={styles.overviewCard}>
                <span className={styles.overviewIcon}>⏳</span>
                <span className={styles.overviewValue}>{formatTotalTime(grandTotalTime)}</span>
                <span className={styles.overviewLabel}>Total Time Spent</span>
              </div>
              <div className={styles.overviewCard}>
                <span className={styles.overviewIcon}>🔥</span>
                <span className={styles.overviewValue}>{streak}</span>
                <span className={styles.overviewLabel}>Day Streak</span>
              </div>
            </div>

            {/* ── Study Activity — Nepali Calendar ────────── */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🔥 Study Activity</h2>

              <div className={styles.calendarCard}>
                {/* Month navigation */}
                <div className={styles.calNav}>
                  <button className={styles.calArrow} onClick={prevMonth} aria-label="Previous month">◀</button>
                  <span className={styles.calMonthTitle}>{calYear} {BS_MONTHS[calMonth - 1]}</span>
                  <button className={styles.calArrow} onClick={nextMonth} aria-label="Next month">▶</button>
                </div>

                {/* Weekday headers */}
                <div className={styles.calGrid}>
                  {WEEKDAYS.map(w => (
                    <div key={w} className={styles.calWeekday}>{w}</div>
                  ))}

                  {/* Empty cells for offset */}
                  {Array.from({ length: firstDayWeekday }).map((_, i) => (
                    <div key={`empty-${i}`} className={styles.calEmpty} />
                  ))}

                  {/* Day cells */}
                  {calendarDays.map(d => (
                    <div
                      key={d.bsDay}
                      className={`${styles.calDay} ${d.studied ? styles.calStudied : ''} ${d.isToday ? styles.calToday : ''}`}
                      title={`${d.bsDay} ${BS_MONTHS[calMonth - 1]}${d.studied ? ' — studied ✓' : ''}`}
                    >
                      <span className={styles.calDayNum}>{d.bsDay}</span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className={styles.calLegend}>
                  <span className={styles.calLegendItem}>
                    <span className={styles.calLegendDot} data-type="inactive" /> No activity
                  </span>
                  <span className={styles.calLegendItem}>
                    <span className={styles.calLegendDot} data-type="studied" /> Studied
                  </span>
                  <span className={styles.calLegendItem}>
                    <span className={styles.calLegendDot} data-type="today" /> Today
                  </span>
                </div>
              </div>
            </div>

            {/* ── Bar Chart — Attempts / Time Spent ──────── */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>📈 Subject Overview</h2>
                <div className={styles.chartTabs}>
                  <button
                    className={`${styles.chartTab} ${chartTab === 'accuracy' ? styles.chartTabActive : ''}`}
                    onClick={() => setChartTab('accuracy')}
                  >
                    Accuracy
                  </button>
                  <button
                    className={`${styles.chartTab} ${chartTab === 'time' ? styles.chartTabActive : ''}`}
                    onClick={() => setChartTab('time')}
                  >
                    Time Spent
                  </button>
                </div>
              </div>
              <div className={styles.barChart}>
                {subjectData.map(s => {
                  const pct = chartTab === 'accuracy'
                    ? (s.accuracy != null ? s.accuracy : 0)
                    : (chartMax > 0 ? Math.round((s.totalTime / chartMax) * 100) : 0)
                  const barColor = s.accuracy == null ? 'var(--border)'
                    : s.accuracy >= 75 ? '#22c55e'
                      : s.accuracy >= 50 ? '#f59e0b'
                        : '#ef4444'
                  return (
                    <div key={s.subject} className={styles.barRow}>
                      <span className={styles.barLabel}>{s.subject}</span>
                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{ width: `${Math.max(pct, s.done > 0 ? 2 : 0)}%`, background: barColor }}
                        />
                      </div>
                      <span className={styles.barValue}>
                        {chartTab === 'accuracy'
                          ? (s.accuracy != null ? `${s.accuracy}%` : '—')
                          : formatTotalTime(s.totalTime)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Subject Breakdown ──────────────────────── */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📖 Subject Breakdown</h2>
              <div className={styles.subjectList}>
                {subjectData.map(s => {
                  const pct = s.totalQs > 0 ? Math.round((s.done / s.totalQs) * 100) : 0
                  const barColor = s.accuracy == null ? 'var(--border)' : s.accuracy >= 75 ? '#22c55e' : s.accuracy >= 50 ? '#f59e0b' : '#ef4444'
                  return (
                    <div key={s.subject} className={styles.subjectRow}>
                      <div className={styles.subjectInfo}>
                        <span className={styles.subjectName}>{s.subject}</span>
                        <span className={styles.subjectMeta}>
                          {s.done > 0 ? (
                            <>
                              {s.done}/{s.totalQs} done
                              <span className={styles.dot}>·</span>
                              <span style={{ color: barColor, fontWeight: 700 }}>{s.accuracy}%</span>
                              <span className={styles.dot}>·</span>
                              <span>{formatTotalTime(s.totalTime)}</span>
                            </>
                          ) : (
                            <span className={styles.notStarted}>Not started</span>
                          )}
                        </span>
                      </div>
                      <div className={styles.subjectBarWrap}>
                        <div className={styles.subjectBarFill} style={{ width: `${pct}%`, background: barColor }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Topic Performance Grid ─────────────────── */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📋 Topic Performance</h2>
              <div className={styles.perfLegend}>
                <span><span className={styles.perfDot} style={{ background: '#22c55e' }} /> 75%+ Strong</span>
                <span><span className={styles.perfDot} style={{ background: '#f59e0b' }} /> 50–74% Improving</span>
                <span><span className={styles.perfDot} style={{ background: '#ef4444' }} /> &lt;50% Needs Work</span>
              </div>
              <div className={styles.perfGrid}>
                {topicPerformance.map(tp => {
                  const color = tp.accuracy >= 75 ? '#22c55e' : tp.accuracy >= 50 ? '#f59e0b' : '#ef4444'
                  const bgColor = tp.accuracy >= 75 ? '#f0fdf4' : tp.accuracy >= 50 ? '#fffbeb' : '#fef2f2'
                  const borderColor = tp.accuracy >= 75 ? '#86efac' : tp.accuracy >= 50 ? '#fde68a' : '#fca5a5'
                  return (
                    <div
                      key={tp.id}
                      className={styles.perfCard}
                      style={{ background: bgColor, borderColor }}
                    >
                      <div className={styles.perfCardTop}>
                        <span className={styles.perfEmoji}>{tp.emoji}</span>
                        <span className={styles.perfAccuracy} style={{ color }}>{tp.accuracy}%</span>
                      </div>
                      <span className={styles.perfName}>{tp.name}</span>
                      <span className={styles.perfMeta}>{tp.done}/{tp.total} done</span>
                      <div className={styles.perfTimeRow}>
                        {tp.totalTime > 0 && (
                          <span className={styles.perfTime}>⏳ {formatTotalTime(tp.totalTime)}</span>
                        )}
                        {tp.avgTime != null && (
                          <span className={styles.perfTime}>⏱ {formatTimeStat(tp.avgTime)}/q</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Weak Topics ────────────────────────────── */}
            {weakTopics.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>⚠️ Focus These Topics</h2>
                <p className={styles.sectionSub}>These topics need more practice — accuracy below 60%</p>
                <div className={styles.weakList}>
                  {weakTopics.map(wt => (
                    <Link
                      key={wt.id}
                      to={`/quiz/cee/${wt.id}`}
                      className={styles.weakCard}
                    >
                      <div className={styles.weakLeft}>
                        <span className={styles.weakEmoji}>{wt.emoji}</span>
                        <div>
                          <span className={styles.weakName}>{wt.name}</span>
                          <span className={styles.weakMeta}>{wt.done}/{wt.total} done</span>
                        </div>
                      </div>
                      <div className={styles.weakRight}>
                        <span className={styles.weakAccuracy}>{wt.accuracy}%</span>
                        <span className={styles.weakCta}>Practice →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
