import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import styles from './History.module.css'

export default function History() {
  const { user } = useAuth()
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const mockQ = query(collection(db, 'mockScores'), where('userId', '==', user.uid))
        const mockSnap = await getDocs(mockQ)
        const data = mockSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
        data.sort((a, b) => {
          const aTime = a.date?.seconds ? a.date.seconds : new Date(a.date).getTime() / 1000
          const bTime = b.date?.seconds ? b.date.seconds : new Date(b.date).getTime() / 1000
          return bTime - aTime
        })
        setScores(data)
      } catch (e) {
        console.error('History fetch error:', e)
      }
      setLoading(false)
    }
    load()
  }, [user])

  if (loading) {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.loading}>Loading your history...</div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Mock Exam History</h1>
            <p className={styles.sub}>Review your past mock exam attempts and track improvement.</p>
          </div>
          <Link to="/dashboard" className={styles.dashLink}>← Dashboard</Link>
        </div>

        {scores.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No mock exams taken yet.</p>
            <Link to="/mock-exam" className={styles.startBtn}>
              Take a mock exam →
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {scores.map((s) => (
              <div key={s.id} className={styles.attemptCard}>
                <div className={styles.attemptLeft}>
                  <span className={styles.attemptTopic}>Mock Exam</span>
                  <div className={styles.attemptMeta}>
                    <span className={styles.attemptExam}>{s.exam?.toUpperCase()}</span>
                    <span className={styles.attemptDate}>{formatDate(s.date)}</span>
                    <span className={styles.attemptFraction}>
                      {s.score}/{s.total} correct
                      {s.attempted != null && ` · ${s.attempted} attempted`}
                    </span>
                  </div>
                </div>
                <div className={styles.attemptRight}>
                  <span className={`${styles.attemptPct} ${scoreClass(s.pct, styles)}`}>{s.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(date) {
  if (!date) return ''
  const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function scoreClass(pct, styles) {
  if (pct >= 75) return styles.scoreGreen
  if (pct >= 50) return styles.scoreAmber
  return styles.scoreRed
}
