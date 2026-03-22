import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import styles from './Results.module.css'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!state) navigate('/dashboard')
  }, [state])

  if (!state) return null

  const { topicId, topicName, exam, answers, score, total } = state
  const pct = Math.round((score / total) * 100)

  const getMessage = () => {
    if (pct >= 90) return { emoji: '🏆', text: 'Outstanding!', sub: 'You absolutely nailed it.' }
    if (pct >= 75) return { emoji: '🎉', text: 'Great job!', sub: 'Solid performance — keep it up.' }
    if (pct >= 50) return { emoji: '💪', text: 'Good effort!', sub: 'Review the wrong answers and try again.' }
    return { emoji: '📚', text: 'Keep practicing!', sub: "Don't worry — every attempt makes you stronger." }
  }

  const msg = getMessage()

  const getScoreColor = () => {
    if (pct >= 75) return styles.scoreGreen
    if (pct >= 50) return styles.scoreAmber
    return styles.scoreRed
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        {/* Score card */}
        <div className={styles.scoreCard}>
          <div className={styles.scoreEmoji}>{msg.emoji}</div>
          <h1 className={styles.scoreTitle}>{msg.text}</h1>
          <p className={styles.scoreSub}>{msg.sub}</p>
          <div className={`${styles.scorePct} ${getScoreColor()}`}>{pct}%</div>
          <div className={styles.scoreStats}>
            <div className={styles.scoreStat}>
              <span className={styles.scoreStatN} style={{ color: 'var(--success-text)' }}>{score}</span>
              <span className={styles.scoreStatL}>Correct</span>
            </div>
            <div className={styles.scoreStatDivider} />
            <div className={styles.scoreStat}>
              <span className={styles.scoreStatN} style={{ color: 'var(--error-text)' }}>{total - score}</span>
              <span className={styles.scoreStatL}>Wrong</span>
            </div>
            <div className={styles.scoreStatDivider} />
            <div className={styles.scoreStat}>
              <span className={styles.scoreStatN}>{total}</span>
              <span className={styles.scoreStatL}>Total</span>
            </div>
          </div>
          <p className={styles.topicLabel}>📚 {topicName}</p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link to={`/quiz/${exam}/${topicId}`} className={styles.retryBtn}>🔄 Try Again</Link>
          <Link to="/dashboard" className={styles.dashBtn}>← Back to Dashboard</Link>
        </div>

        {/* Answer review */}
        <div className={styles.reviewSection}>
          <h2 className={styles.reviewTitle}>Answer Review</h2>
          <div className={styles.reviewList}>
            {answers.map((a, i) => (
              <AnswerCard key={i} a={a} i={i} />
            ))}
          </div>
        </div>
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
              className={`${styles.reviewOption} ${
                j === a.correct ? styles.reviewOptCorrect :
                j === a.selected && !a.isCorrect ? styles.reviewOptWrong : ''
              }`}
            >
              <span className={styles.reviewOptLetter}>{String.fromCharCode(65 + j)}</span>
              <span>{opt}</span>
              {j === a.correct && <span className={styles.reviewOptTag}>✓ Correct</span>}
              {j === a.selected && !a.isCorrect && <span className={styles.reviewOptTag}>Your answer</span>}
            </div>
          ))}
        </div>
      )}
      {a.explanation && (
        <div className={styles.reviewExplanation}>
          <span className={styles.expLabel}>💡 Explanation</span>
          <p>{a.explanation}</p>
        </div>
      )}
    </div>
  )
}
