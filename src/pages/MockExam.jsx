import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics, questions } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './MockExam.module.css'

const EXAM_DURATION = 120 * 60

function buildMockQuestions(examType) {
  const topics = examType === 'cee' ? ceeTopics : ioeTopics
  const topicIds = new Set(topics.filter(t => !t.comingSoon).map(t => t.id))
  const all = []
  Object.entries(questions).forEach(([topicId, qs]) => {
    if (!topicIds.has(topicId)) return
    qs.forEach((q, i) => all.push({ ...q, topicId, id: `${topicId}-${i}` }))
  })
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]]
  }
  return all.slice(0, Math.min(100, all.length))
}

export default function MockExam() {
  const { user } = useAuth()
  const [started, setStarted] = useState(false)
  const [exam, setExam] = useState('cee')
  const [qs, setQs] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const timerRef = useRef(null)
  const savedRef = useRef(false)
  // Refs to avoid stale closures in timer callback
  const qsRef = useRef([])
  const answersRef = useRef({})

  // Keep refs in sync with state
  useEffect(() => { qsRef.current = qs }, [qs])
  useEffect(() => { answersRef.current = answers }, [answers])

  useEffect(() => {
    if (started && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(timerRef.current); doSubmit(qsRef.current, answersRef.current); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [started, submitted])

  const startExam = () => {
    const mockQs = buildMockQuestions(exam)
    setQs(mockQs)
    qsRef.current = mockQs
    setAnswers({})
    answersRef.current = {}
    setCurrent(0)
    setTimeLeft(EXAM_DURATION)
    setSubmitted(false)
    savedRef.current = false
    setStarted(true)
  }

  const doSubmit = async (qsList, answersMap) => {
    clearInterval(timerRef.current)
    setSubmitted(true)
    if (savedRef.current) return
    savedRef.current = true

    const finalQs = qsList || qsRef.current
    const finalAnswers = answersMap || answersRef.current
    const score = finalQs.filter((q, i) => finalAnswers[i] === q.answer).length
    const total = finalQs.length
    const pct = total > 0 ? Math.round((score / total) * 100) : 0

    setSaving(true)
    try {
      await addDoc(collection(db, 'mockScores'), {
        userId: user.uid,
        userName: user.displayName || user.email,
        exam,
        score,
        total,
        pct,
        attempted: Object.keys(finalAnswers).length,
        date: new Date(),
      })
    } catch (e) {
      console.error('Failed to save mock score:', e)
    }
    setSaving(false)
  }

  const handleSubmit = () => {
    const unanswered = qs.length - Object.keys(answers).length
    if (unanswered > 0) {
      const confirmed = window.confirm(
        `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Are you sure you want to submit?`
      )
      if (!confirmed) return
    }
    doSubmit(qs, answers)
  }

  const handleSelect = (i) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [current]: i }))
  }

  const formatTime = (s) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const score = submitted ? qs.filter((q, i) => answers[i] === q.answer).length : 0
  const pct = submitted && qs.length > 0 ? Math.round((score / qs.length) * 100) : 0
  const attempted = Object.keys(answers).length

  // START SCREEN
  if (!started) {
    return (
      <div className={styles.root}>
        <div className={styles.startContainer}>
          <div className={styles.startCard}>
            <div className={styles.startEmoji}>📝</div>
            <h1 className={styles.startTitle}>Mock Exam</h1>
            <p className={styles.startSub}>Simulate real entrance exam conditions with a timed full-length test.</p>

            <div className={styles.examSelector}>
              <button
                className={`${styles.examOpt} ${exam === 'cee' ? styles.examOptActive : ''}`}
                onClick={() => setExam('cee')}
              >
                🩺 CEE — Medical
              </button>
              <button
                className={`${styles.examOpt} ${exam === 'ioe' ? styles.examOptActive : ''}`}
                onClick={() => setExam('ioe')}
              >
                ⚙️ IOE — Engineering
              </button>
            </div>

            <div className={styles.examInfo}>
              <div className={styles.infoItem}><span>⏱</span> 2 hours</div>
              <div className={styles.infoItem}><span>❓</span> Up to 100 questions</div>
              <div className={styles.infoItem}><span>📊</span> Results saved to history</div>
            </div>

            <button className={styles.startBtn} onClick={startExam}>
              Start Mock Exam →
            </button>
            <Link to="/dashboard" className={styles.cancelLink}>← Back to dashboard</Link>
          </div>
        </div>
      </div>
    )
  }

  // RESULTS SCREEN
  if (submitted) {
    return (
      <div className={styles.root}>
        <div className={styles.startContainer}>
          <div className={styles.startCard}>
            <div className={styles.startEmoji}>{pct >= 75 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
            <h1 className={styles.startTitle}>Mock Exam Complete</h1>
            {saving && <p className={styles.savingNote}>Saving results...</p>}

            <div className={`${styles.resultPct} ${pct >= 75 ? styles.pctGreen : pct >= 50 ? styles.pctAmber : styles.pctRed}`}>
              {pct}%
            </div>

            <div className={styles.resultStats}>
              <div className={styles.rStat}>
                <span style={{ color: 'var(--success-text)', fontWeight: 900, fontSize: '1.5rem' }}>{score}</span>
                <span className={styles.rStatL}>Correct</span>
              </div>
              <div className={styles.rStatDiv} />
              <div className={styles.rStat}>
                <span style={{ color: 'var(--error-text)', fontWeight: 900, fontSize: '1.5rem' }}>{qs.length - score - (qs.length - attempted)}</span>
                <span className={styles.rStatL}>Wrong</span>
              </div>
              <div className={styles.rStatDiv} />
              <div className={styles.rStat}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 900, fontSize: '1.5rem' }}>{qs.length - attempted}</span>
                <span className={styles.rStatL}>Skipped</span>
              </div>
            </div>

            <div className={styles.resultActions}>
              <button className={styles.startBtn} onClick={() => setStarted(false)}>
                Take Another →
              </button>
              <Link to="/history" className={styles.historyLink}>📊 View History</Link>
              <Link to="/dashboard" className={styles.cancelLink}>← Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q = qs[current]

  // EXAM SCREEN
  return (
    <div className={styles.root}>
      <div className={styles.examHeader}>
        <span className={styles.examLabel}>Mock Exam · {exam.toUpperCase()}</span>
        <div className={`${styles.timer} ${timeLeft < 300 ? styles.timerRed : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
        <button className={styles.submitHeaderBtn} onClick={handleSubmit}>
          Submit Exam
        </button>
      </div>

      <div className={styles.examBody}>
        <div className={styles.qPanel}>
          <p className={styles.qLabel}>Question {current + 1} of {qs.length}</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${((current + 1) / qs.length) * 100}%` }} />
          </div>
          <h2 className={styles.qText}>{q.q}</h2>
          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.option} ${answers[current] === i ? styles.optSelected : ''}`}
                onClick={() => handleSelect(i)}
              >
                <span className={`${styles.optLetter} ${answers[current] === i ? styles.optLetterSelected : ''}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
          <div className={styles.qNavRow}>
            <button
              className={styles.qNavBtn}
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
            >
              ← Prev
            </button>
            <span className={styles.attempted}>{attempted}/{qs.length} answered</span>
            <button
              className={styles.qNavBtn}
              onClick={() => setCurrent(Math.min(qs.length - 1, current + 1))}
              disabled={current === qs.length - 1}
            >
              Next →
            </button>
          </div>
        </div>

        <div className={styles.qNav2}>
          <p className={styles.navTitle}>Questions</p>
          <div className={styles.navGrid}>
            {qs.map((_, i) => (
              <button
                key={i}
                className={`${styles.navDot} ${current === i ? styles.navDotCurrent : ''} ${answers[i] !== undefined ? styles.navDotAnswered : ''}`}
                onClick={() => setCurrent(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
