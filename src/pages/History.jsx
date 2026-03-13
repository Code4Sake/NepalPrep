import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import styles from './History.module.css'

export default function History() {
  const { user } = useAuth()
  const [tab, setTab] = useState('topic') // 'topic' | 'mock'
  const [topicScores, setTopicScores] = useState([])
  const [mockScores, setMockScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Topic quiz scores
        const tq = query(
          collection(db, 'scores'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        )
        const tSnap = await getDocs(tq)
        setTopicScores(tSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

        // Mock exam scores
        const mq = query(
          collection(db, 'mockScores'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        )
        const mSnap = await getDocs(mq)
        setMockScores(mSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    fetchAll()
  }, [user])

  const scores = tab === 'topic' ? topicScores : mockScores

  const totalQuizzes = scores.length
  const avgScore = scores.length
    ? Math.round(scores.reduce((a, s) => a + s.pct, 0) / scores.length)
    : 0
  const bestScore = scores.length ? Math.max(...scores.map((s) => s.pct)) : 0

  const formatDate = (date) => {
    if (!date?.toDate) return 'Recently'
    return new Date(date.toDate()).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>History</h1>
            <p className={styles.sub}>All your past quizzes and mock exams.</p>
          </div>
          <Link to="/dashboard" className={styles.backBtn}>← Dashboard</Link>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'topic' ? styles.tabActive : ''}`}
            onClick={() => setTab('topic')}
          >
            📚 Topic Quizzes
            {topicScores.length > 0 && (
              <span className={styles.tabCount}>{topicScores.length}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${tab === 'mock' ? styles.tabActive : ''}`}
            onClick={() => setTab('mock')}
          >
            📝 Mock Exams
            {mockScores.length > 0 && (
              <span className={styles.tabCount}>{mockScores.length}</span>
            )}
          </button>
        </div>

        {/* Summary stats */}
        {scores.length > 0 && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statN}>{totalQuizzes}</span>
              <span className={styles.statL}>{tab === 'topic' ? 'Quizzes Taken' : 'Mocks Taken'}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statN}>{avgScore}%</span>
              <span className={styles.statL}>Average Score</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statN}>{bestScore}%</span>
              <span className={styles.statL}>Best Score</span>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className={styles.loading}>Loading history...</div>
        ) : scores.length === 0 ? (
          <div className={styles.empty}>
            <p>{tab === 'topic' ? 'No quizzes taken yet.' : 'No mock exams taken yet.'}</p>
            <Link to={tab === 'topic' ? '/dashboard' : '/mock-exam'} className={styles.startBtn}>
              {tab === 'topic' ? 'Start your first quiz →' : 'Take a mock exam →'}
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {scores.map((s) => (
              <div key={s.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <p className={styles.itemTopic}>
                    {tab === 'topic' ? s.topicName : `Mock Exam`}
                  </p>
                  <p className={styles.itemMeta}>
                    <span className={`${styles.examBadge} ${s.exam === 'ioe' || s.exam === 'IOE' ? styles.badgeIoe : styles.badgeCee}`}>
                      {s.exam?.toUpperCase()}
                    </span>
                    {tab === 'mock' && (
                      <span className={styles.metaDetail}>{s.attempted}/{s.total} answered</span>
                    )}
                    <span>{formatDate(s.date)}</span>
                  </p>
                </div>
                <div className={styles.itemRight}>
                  <span className={`${styles.itemPct} ${
                    s.pct >= 75 ? styles.pctGreen : s.pct >= 50 ? styles.pctAmber : styles.pctRed
                  }`}>
                    {s.pct}%
                  </span>
                  <span className={styles.itemScore}>{s.score}/{s.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
