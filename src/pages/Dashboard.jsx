import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './Dashboard.module.css'

const SUBJECTS_CEE = ['All', 'Biology', 'Physics', 'Chemistry', 'English']
const SUBJECTS_IOE = ['All', 'Mathematics', 'Physics', 'Chemistry', 'English']

export default function Dashboard() {
  const { user } = useAuth()
  const [exam, setExam] = useState('cee')
  const [subject, setSubject] = useState('All')
  const [search, setSearch] = useState('')
  const [bestScores, setBestScores] = useState({})

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const q = query(collection(db, 'scores'), where('userId', '==', user.uid))
        const snap = await getDocs(q)
        const scores = {}
        snap.docs.forEach((d) => {
          const data = d.data()
          if (!scores[data.topicId] || data.pct > scores[data.topicId]) {
            scores[data.topicId] = data.pct
          }
        })
        setBestScores(scores)
      } catch (e) {
        console.error(e)
      }
    }
    fetchScores()
  }, [user])

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const subjects = exam === 'cee' ? SUBJECTS_CEE : SUBJECTS_IOE

  const filtered = topics.filter((t) => {
    const matchSubject = subject === 'All' || t.subject === subject
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    return matchSubject && matchSearch
  })

  const firstName = user?.displayName?.split(' ')[0] || 'there'
  const attempted = Object.keys(bestScores).length
  const avgScore = attempted
    ? Math.round(Object.values(bestScores).reduce((a, b) => a + b, 0) / attempted)
    : null
  const bestEver = attempted ? Math.max(...Object.values(bestScores)) : null

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
              <span className={styles.qStatL}>Topics attempted</span>
            </div>
            <div className={styles.qStatDivider} />
            <div className={styles.qStat}>
              <span className={styles.qStatN}>{avgScore}%</span>
              <span className={styles.qStatL}>Avg best score</span>
            </div>
            <div className={styles.qStatDivider} />
            <div className={styles.qStat}>
              <span className={styles.qStatN}>{bestEver}%</span>
              <span className={styles.qStatL}>Best score ever</span>
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
              <TopicCard key={topic.id} topic={topic} exam={exam} bestScore={bestScores[topic.id]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TopicCard({ topic, exam, bestScore }) {
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

  const barColor = bestScore == null ? null
    : bestScore >= 75 ? '#22c55e'
    : bestScore >= 50 ? '#f59e0b'
    : '#ef4444'

  const textColor = bestScore == null ? null
    : bestScore >= 75 ? '#16a34a'
    : bestScore >= 50 ? '#d97706'
    : '#dc2626'

  return (
    <Link to={`/quiz/${exam}/${topic.id}`} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardEmoji}>{topic.emoji}</span>
        <span className={styles.cardCount}>{topic.questionCount} Qs</span>
      </div>
      <h3 className={styles.cardName}>{topic.name}</h3>
      <p className={styles.cardSubject}>{topic.subject}</p>

      {bestScore != null ? (
        <div className={styles.cardScore}>
          <div className={styles.scoreBarWrap}>
            <div
              className={styles.scoreBarFill}
              style={{ width: `${bestScore}%`, background: barColor }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: textColor }}>
            Best: {bestScore}%
          </span>
        </div>
      ) : (
        <div className={styles.cardAction}>Start Practice →</div>
      )}
    </Link>
  )
}

