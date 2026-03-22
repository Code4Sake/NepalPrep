import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './SubtopicSelect.module.css'

function getProgress(userId, topicId) {
  try {
    const key = `nepalprep-quiz-${userId}-${topicId}`
    const saved = localStorage.getItem(key)
    if (!saved) return null
    const s = JSON.parse(saved)
    const done = (s.correctCount || 0) + (s.wrongCount || 0)
    if (done === 0) return null
    const accuracy = Math.round((s.correctCount / done) * 100)
    return { done, total: s.totalQuestions || 0, accuracy }
  } catch { return null }
}

export default function SubtopicSelect() {
  const { exam, topicId } = useParams()
  const { user } = useAuth()

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const topic = topics.find((t) => t.id === topicId)

  if (!topic || !topic.subtopics) return null

  const totalQuestions = topic.subtopics.reduce((sum, s) => sum + (s.questionCount || 0), 0)

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        <div className={styles.header}>
          <Link to="/dashboard" className={styles.backBtn}>← Dashboard</Link>
          <div className={styles.titleWrap}>
            <span className={styles.emoji}>{topic.emoji}</span>
            <div>
              <h1 className={styles.title}>{topic.name}</h1>
              <p className={styles.sub}>{topic.subject} · {totalQuestions} questions across {topic.subtopics.length} chapters</p>
            </div>
          </div>
        </div>

        <Link to={`/quiz/${exam}/${topicId}-random`} className={styles.randomCard}>
          <span className={styles.randomEmoji}>🎲</span>
          <div>
            <h3 className={styles.randomTitle}>Random Mix</h3>
            <p className={styles.randomSub}>Questions from all chapters — {totalQuestions} total</p>
          </div>
          <span className={styles.randomArrow}>→</span>
        </Link>

        <h2 className={styles.sectionTitle}>Choose a chapter</h2>
        <div className={styles.grid}>
          {topic.subtopics.map((sub) => (
            <SubtopicCard key={sub.id} sub={sub} exam={exam} userId={user?.uid} />
          ))}
        </div>

      </div>
    </div>
  )
}

function SubtopicCard({ sub, exam, userId }) {
  const progress = userId ? getProgress(userId, sub.id) : null

  if (sub.comingSoon) {
    return (
      <div className={`${styles.card} ${styles.cardDisabled}`}>
        <div className={styles.cardTop}>
          <span className={styles.comingSoon}>Coming soon</span>
        </div>
        <h3 className={styles.cardName}>{sub.name}</h3>
        <p className={styles.cardCount}>— Qs</p>
      </div>
    )
  }

  const pct = progress ? Math.round((progress.done / (progress.total || sub.questionCount)) * 100) : 0
  const accColor = progress
    ? progress.accuracy >= 75 ? '#16a34a'
    : progress.accuracy >= 50 ? '#d97706'
    : '#dc2626'
    : null
  const barColor = progress
    ? progress.accuracy >= 75 ? '#22c55e'
    : progress.accuracy >= 50 ? '#f59e0b'
    : '#ef4444'
    : null

  return (
    <Link to={`/quiz/${exam}/${sub.id}`} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardCount}>{sub.questionCount} Qs</span>
      </div>
      <h3 className={styles.cardName}>{sub.name}</h3>

      {progress ? (
        <div className={styles.cardScore}>
          <div className={styles.scoreBarWrap}>
            <div className={styles.scoreBarFill} style={{ width: `${pct}%`, background: barColor }} />
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)' }}>
            {progress.done}/{progress.total || sub.questionCount} done
            <span style={{ margin: '0 0.3rem' }}>·</span>
            <span style={{ color: accColor }}>{progress.accuracy}% accuracy</span>
          </span>
        </div>
      ) : (
        <div className={styles.cardAction}>Start →</div>
      )}
    </Link>
  )
}