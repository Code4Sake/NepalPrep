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
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('quiz') // quiz | mock

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch quiz scores
        const quizQ = query(collection(db, 'scores'), where('userId', '==', user.uid))
        const quizSnap = await getDocs(quizQ)
        const quizData = quizSnap.docs.map((d) => ({ id: d.id, type: 'quiz', ...d.data() }))

        // Fetch mock exam scores
        const mockQ = query(collection(db, 'mockScores'), where('userId', '==', user.uid))
        const mockSnap = await getDocs(mockQ)
        const mockData = mockSnap.docs.map((d) => ({ id: d.id, type: 'mock', ...d.data() }))

        const data = [...quizData, ...mockData]
        // Sort client-side
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

  // Detail view
  if (selected) {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.detailHeader}>
            <button className={styles.backBtn} onClick={() => setSelected(null)}>← Back to History</button>
            <div className={styles.detailMeta}>
              <h2 className={styles.detailTitle}>{selected.topicName}</h2>
              <span className={styles.detailDate}>{formatDate(selected.date)}</span>
            </div>
            <div className={styles.detailScore}>
              <span className={`${styles.detailPct} ${scoreClass(selected.pct, styles)}`}>{selected.pct}%</span>
              <span className={styles.detailFraction}>{selected.score} / {selected.total} correct</span>
            </div>
          </div>

          {selected.answers && selected.answers.length > 0 ? (
            <div className={styles.reviewList}>
              {selected.answers.map((a, i) => (
                <AnswerCard key={i} a={a} i={i} />
              ))}
            </div>
          ) : (
            <div className={styles.noAnswers}>
              <p>This attempt was saved before detailed answer tracking was added.</p>
              <Link to={`/quiz/${selected.exam}/${selected.topicId}`} className={styles.retryBtn}>
                Retake to get full review →
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Filter by tab
  const filteredScores = scores.filter((s) => s.type === tab)

  // List view
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>History</h1>
            <p className={styles.sub}>Click any attempt to review every question, your answers, and explanations.</p>
          </div>
          <Link to="/dashboard" className={styles.dashLink}>← Dashboard</Link>
        </div>

        {/* Tab toggle */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'quiz' ? styles.tabActive : ''}`} onClick={() => setTab('quiz')}>
            📝 Topic Quizzes
          </button>
          <button className={`${styles.tab} ${tab === 'mock' ? styles.tabActive : ''}`} onClick={() => setTab('mock')}>
            🕐 Mock Exams
          </button>
        </div>

        {filteredScores.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              {tab === 'quiz' ? 'No quizzes taken yet.' : 'No mock exams taken yet.'}
            </p>
            <Link to={tab === 'quiz' ? '/dashboard' : '/mock-exam'} className={styles.startBtn}>
              {tab === 'quiz' ? 'Start your first quiz →' : 'Take a mock exam →'}
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {filteredScores.map((s) => (
              <button key={s.id} className={styles.attemptCard} onClick={() => s.type === 'quiz' ? setSelected(s) : null}>
                <div className={styles.attemptLeft}>
                  <span className={styles.attemptTopic}>
                    {s.type === 'mock' ? `Mock Exam` : s.topicName}
                  </span>
                  <div className={styles.attemptMeta}>
                    <span className={styles.attemptExam}>{s.exam?.toUpperCase()}</span>
                    <span className={styles.attemptDate}>{formatDate(s.date)}</span>
                    <span className={styles.attemptFraction}>
                      {s.score}/{s.total} correct
                      {s.type === 'mock' && s.attempted != null && ` · ${s.attempted} attempted`}
                    </span>
                  </div>
                </div>
                <div className={styles.attemptRight}>
                  <span className={`${styles.attemptPct} ${scoreClass(s.pct, styles)}`}>{s.pct}%</span>
                  {s.type === 'quiz' && <span className={styles.viewBtn}>View →</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AnswerCard({ a, i }) {
  return (
    <div className={`${styles.reviewItem} ${a.isCorrect ? styles.reviewCorrect : styles.reviewWrong}`}>
      <div className={styles.reviewTop}>
        <span className={styles.reviewNum}>Q{i + 1}</span>
        <span className={a.isCorrect ? styles.reviewBadgeCorrect : styles.reviewBadgeWrong}>
          {a.isCorrect ? '✓ Correct' : '✗ Wrong'}
        </span>
      </div>
      <p className={styles.reviewQ}>{a.question}</p>

      {a.options && a.options.length > 0 && (
        <div className={styles.reviewOptions}>
          {a.options.map((opt, j) => (
            <div
              key={j}
              className={`${styles.reviewOption}
                ${j === a.correct ? styles.reviewOptCorrect : ''}
                ${j === a.selected && !a.isCorrect ? styles.reviewOptWrong : ''}
              `}
            >
              <span className={styles.reviewOptLetter}>{String.fromCharCode(65 + j)}</span>
              <span className={styles.reviewOptText}>{opt}</span>
              {j === a.correct && <span className={styles.reviewOptTag}>✓ Correct</span>}
              {j === a.selected && !a.isCorrect && <span className={styles.reviewOptTagWrong}>Your answer</span>}
            </div>
          ))}
        </div>
      )}

      {a.explanation && (
        <div className={styles.explanation}>
          <span className={styles.expLabel}>💡 Explanation</span>
          <p>{a.explanation}</p>
        </div>
      )}
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
