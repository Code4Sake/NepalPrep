import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ceeTopics, ioeTopics, questions } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './Quiz.module.css'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz() {
  const { exam, topicId } = useParams()
  const navigate = useNavigate()

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const topic = topics.find((t) => t.id === topicId)
  // Shuffle questions on mount (useMemo ensures stable shuffle per mount)
  const qs = useMemo(() => shuffleArray(questions[topicId] || []), [topicId])

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])

  // Reset all state when topic changes (handles retry)
  useEffect(() => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
  }, [topicId])

  useEffect(() => {
    if (!topic || qs.length === 0) {
      navigate('/dashboard')
    }
  }, [topic, qs])

  if (!topic || qs.length === 0) return null

  const q = qs[current]
  const isLast = current === qs.length - 1
  const progress = ((current + 1) / qs.length) * 100

  const handleSelect = (i) => {
    if (selected !== null) return
    setSelected(i)
  }

  const handleNext = () => {
    const newAnswers = [
      ...answers,
      {
        question: q.q,
        options: q.options,
        selected,
        correct: q.answer,
        isCorrect: selected === q.answer,
        explanation: q.explanation || '',
      },
    ]
    if (isLast) {
      navigate('/results', {
        state: {
          topicId,
          topicName: topic.name,
          exam,
          answers: newAnswers,
          score: newAnswers.filter((a) => a.isCorrect).length,
          total: qs.length,
        },
      })
    } else {
      setAnswers(newAnswers)
      setCurrent(current + 1)
      setSelected(null)
    }
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <Link to="/dashboard" className={styles.backBtn}>← Dashboard</Link>
          <div className={styles.topMeta}>
            <span className={styles.topicBadge}>{topic.emoji} {topic.name}</span>
            <span className={styles.counter}>{current + 1} / {qs.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Question card */}
        <div className={styles.card}>
          <p className={styles.qLabel}>Question {current + 1}</p>
          <h2 className={styles.qText}>{q.q}</h2>

          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.option} ${
                  selected === null ? '' :
                  i === q.answer ? styles.correct :
                  selected === i ? styles.wrong : styles.dimmed
                }`}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
                {selected !== null && i === q.answer && <span className={styles.tick}>✓</span>}
                {selected === i && i !== q.answer && <span className={styles.cross}>✗</span>}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className={styles.feedback}>
              <span className={selected === q.answer ? styles.feedbackCorrect : styles.feedbackWrong}>
                {selected === q.answer
                  ? '✅ Correct!'
                  : `❌ Incorrect — correct answer: ${q.options[q.answer]}`}
              </span>
              <p className={styles.explanation}>{q.explanation}</p>
            </div>
          )}
        </div>

        {/* Next button */}
        <div className={styles.navBtns}>
          {selected !== null && (
            <button className={styles.nextBtn} onClick={handleNext}>
              {isLast ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </div>

        {/* Score so far */}
        <div className={styles.scoreBar}>
          <span>✅ {answers.filter((a) => a.isCorrect).length} correct</span>
          <span>❌ {answers.filter((a) => !a.isCorrect).length} wrong</span>
          <span className={styles.remaining}>{qs.length - current - 1} remaining</span>
        </div>
      </div>
    </div>
  )
}
