import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './SubtopicSelect.module.css'

export default function SubtopicSelect() {
  const { exam, topicId } = useParams()
  const { user } = useAuth()
  const [bestScores, setBestScores] = useState({})

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const topic = topics.find((t) => t.id === topicId)

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
            <SubtopicCard key={sub.id} sub={sub} exam={exam} bestScore={bestScores[sub.id]} />
          ))}
        </div>

      </div>
    </div>
  )
}

function SubtopicCard({ sub, exam, bestScore }) {
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

  const barColor = bestScore == null ? null
    : bestScore >= 75 ? '#22c55e'
    : bestScore >= 50 ? '#f59e0b'
    : '#ef4444'

  const textColor = bestScore == null ? null
    : bestScore >= 75 ? '#16a34a'
    : bestScore >= 50 ? '#d97706'
    : '#dc2626'

  return (
    <Link to={`/quiz/${exam}/${sub.id}`} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardCount}>{sub.questionCount} Qs</span>
      </div>
      <h3 className={styles.cardName}>{sub.name}</h3>

      {bestScore != null ? (
        <div className={styles.cardScore}>
          <div className={styles.scoreBarWrap}>
            <div className={styles.scoreBarFill} style={{ width: `${bestScore}%`, background: barColor }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: textColor }}>
            Best: {bestScore}%
          </span>
        </div>
      ) : (
        <div className={styles.cardAction}>Start →</div>
      )}
    </Link>
  )
}