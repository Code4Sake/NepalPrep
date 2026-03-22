import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics, questions } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './Dashboard.module.css'

function getProgress(userId, topicId) {
  try {
    const key = `nepalprep-quiz-${userId}-${topicId}`
    const saved = localStorage.getItem(key)
    if (!saved) return null
    const s = JSON.parse(saved)
    const done = (s.correctCount || 0) + (s.wrongCount || 0)
    if (done === 0) return null
    return { done, total: s.totalQuestions || 0, accuracy: Math.round((s.correctCount / done) * 100) }
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

const SUBJECTS_CEE = ['All', 'Biology', 'Physics', 'Chemistry', 'English']
const SUBJECTS_IOE = ['All', 'Mathematics', 'Physics', 'Chemistry', 'English']

export default function Dashboard() {
  const { user } = useAuth()
  const [exam, setExam] = useState('cee')
  const [subject, setSubject] = useState('All')
  const [search, setSearch] = useState('')

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const subjects = exam === 'cee' ? SUBJECTS_CEE : SUBJECTS_IOE
  const progress = getAllProgress(user?.uid, topics)

  const attempted = Object.keys(progress).length
  const totalDone = Object.values(progress).reduce((a, p) => a + p.done, 0)
  const avgAccuracy = attempted
    ? Math.round(Object.values(progress).reduce((a, p) => a + p.accuracy, 0) / attempted)
    : null

  const firstName = user?.displayName?.split(' ')[0] || 'there'

  const filtered = topics.filter((t) => {
    const matchSubject = subject === 'All' || t.subject === subject
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    return matchSubject && matchSearch
  })

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.greeting}>Hey, {firstName} 👋</h1>
            <p className={styles.greetingSub}>What are you practicing today?</p>
          </div>
          <div className={styles.headerActions}>
            <Link to="/tracker" className={styles.trackerBtn}>📋 Study Tracker</Link>
            <Link to="/mock-exam" className={styles.mockBtn}>🕐 Mock Exam</Link>
          </div>
        </div>

        {/* Quick stats */}
        {attempted > 0 && (
          <div className={styles.quickStats}>
            <div className={styles.qStat}>
              <span className={styles.qStatN}>{attempted}</span>
              <span className={styles.qStatL}>Topics started</span>
            </div>
            <div className={styles.qStatDivider} />
            <div className={styles.qStat}>
              <span className={styles.qStatN}>{totalDone}</span>
              <span className={styles.qStatL}>Questions done</span>
            </div>
            <div className={styles.qStatDivider} />
            <div className={styles.qStat}>
              <span className={styles.qStatN}>{avgAccuracy}%</span>
              <span className={styles.qStatL}>Avg accuracy</span>
            </div>
          </div>
        )}

        {/* Exam tabs */}
        <div className={styles.examTabs}>
          
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.subjectTabs}>
            {subjects.map((s) => (
              <button
                key={s}
                className={`${styles.subjectTab} ${subject === s ? styles.subjectTabActive : ''}`}
                onClick={() => setSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>

        {/* Topics grid */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No topics found for "{search}"</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((topic) => (
              <TopicCard key={topic.id} topic={topic} exam={exam} userId={user?.uid} progress={progress} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TopicCard({ topic, exam, userId, progress }) {
  if (topic.comingSoon) {
    return (
      <div className={`${styles.card} ${styles.cardDisabled}`}>
        <div className={styles.cardTop}>
          <span className={styles.cardEmoji}>{topic.emoji}</span>
          <span className={styles.comingSoonBadge}>Coming soon</span>
        </div>
        <h3 className={styles.cardName}>{topic.name}</h3>
        <p className={styles.cardSubject}>{topic.subject}</p>
      </div>
    )
  }

  // Aggregate progress for topics with subtopics
  let topicProgress = null
  if (topic.hasSubtopics && topic.subtopics) {
    let totalDone = 0, totalCorrect = 0, totalQs = 0
    for (const sub of topic.subtopics) {
      totalQs += sub.questionCount || 0
      const p = progress[sub.id]
      if (p) { totalDone += p.done; totalCorrect += Math.round(p.done * p.accuracy / 100) }
    }
    if (totalDone > 0) {
      topicProgress = { done: totalDone, total: totalQs, accuracy: Math.round((totalCorrect / totalDone) * 100) }
    }
  } else {
    topicProgress = progress[topic.id] || null
  }

  const pct = topicProgress ? Math.round((topicProgress.done / topicProgress.total) * 100) : 0
  const accColor = topicProgress
    ? topicProgress.accuracy >= 75 ? '#16a34a'
    : topicProgress.accuracy >= 50 ? '#d97706'
    : '#dc2626'
    : null
  const barColor = topicProgress
    ? topicProgress.accuracy >= 75 ? '#22c55e'
    : topicProgress.accuracy >= 50 ? '#f59e0b'
    : '#ef4444'
    : null

  return (
    <Link to={topic.hasSubtopics ? `/topic/${exam}/${topic.id}` : `/quiz/${exam}/${topic.id}`} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardEmoji}>{topic.emoji}</span>
        <span className={styles.cardCount}>{topic.questionCount} Qs</span>
      </div>
      <h3 className={styles.cardName}>{topic.name}</h3>
      <p className={styles.cardSubject}>{topic.subject}</p>

      {topicProgress ? (
        <div className={styles.cardScore}>
          <div className={styles.scoreBarWrap}>
            <div className={styles.scoreBarFill} style={{ width: `${pct}%`, background: barColor }} />
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)' }}>
            {topicProgress.done}/{topicProgress.total} done
            <span style={{ margin: '0 0.3rem' }}>·</span>
            <span style={{ color: accColor }}>{topicProgress.accuracy}%</span>
          </span>
        </div>
      ) : (
        <div className={styles.cardAction}>Start Practice →</div>
      )}
    </Link>
  )
}

