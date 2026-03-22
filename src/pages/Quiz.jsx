import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ceeTopics, ioeTopics, questions } from '../data/questions'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import styles from './Quiz.module.css'

export default function Quiz() {
  const { exam, topicId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const storageKey = `nepalprep-quiz-${user?.uid}-${topicId}`

  const topics = exam === 'cee' ? ceeTopics : ioeTopics

  const isRandom = topicId.endsWith('-random')
  const parentId = isRandom ? topicId.replace('-random', '') : null
  const parentTopic = isRandom ? topics.find((t) => t.id === parentId) : null

  const topic = isRandom
    ? parentTopic
    : topics.find((t) => t.id === topicId)
    ?? topics.flatMap((t) => t.subtopics || []).find((s) => s.id === topicId)

  const qsRef = useRef(null)
  const qsTopicRef = useRef(null)
  const questionOrderRef = useRef(null)

  if (qsTopicRef.current !== topicId) {
    qsTopicRef.current = topicId
    const arr = isRandom
      ? (parentTopic?.subtopics || []).flatMap((sub) => (questions[sub.id] || []))
      : (questions[topicId] || [])
    if (isRandom) {
      qsRef.current = arr
    } else {
      // Try to restore saved question order for auto-save consistency
      let savedOrder = null
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          const s = JSON.parse(saved)
          if (s.questionOrder && s.questionOrder.length === arr.length) {
            savedOrder = s.questionOrder
          }
        }
      } catch { /* ignore */ }

      if (savedOrder) {
        // Restore exact same order from saved progress
        questionOrderRef.current = savedOrder
        qsRef.current = savedOrder.map(i => arr[i])
      } else {
        // Fresh shuffle
        const indices = arr.map((_, i) => i)
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]]
        }
        questionOrderRef.current = indices
        qsRef.current = indices.map(i => arr[i])
        // Save the order for future restores
        try {
          const existing = localStorage.getItem(storageKey)
          if (existing) {
            const s = JSON.parse(existing)
            s.questionOrder = indices
            localStorage.setItem(storageKey, JSON.stringify(s))
          }
        } catch { /* ignore */ }
      }
    }
  }

  const qs = qsRef.current || []

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [bookmarks, setBookmarks] = useState({})
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [answers, setAnswers] = useState([])
  const [allConfirmed, setAllConfirmed] = useState({})
  const [allSelections, setAllSelections] = useState({})
  const [resumeToast, setResumeToast] = useState(null)
  const hasLoadedSave = useRef(false)

  const prevTopicRef = useRef(null)
  const activeDotRef = useRef(null)

  useEffect(() => {
    if (prevTopicRef.current !== topicId) {
      prevTopicRef.current = topicId
      setCurrent(0)
      setSelected(null)
      setConfirmed(false)
      setBookmarks({})
      setCorrectCount(0)
      setWrongCount(0)
      setAnswers([])
      setAllConfirmed({})
      setAllSelections({})
    }
  }, [topicId])

  // --- AUTO-SAVE: Load saved progress on mount ---
  useEffect(() => {
    if (hasLoadedSave.current || !storageKey || qs.length === 0) return
    hasLoadedSave.current = true
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) return
      const s = JSON.parse(saved)
      if (s.totalQuestions !== qs.length) {
        localStorage.removeItem(storageKey)
        return
      }
      setCurrent(s.current || 0)
      setSelected(s.allSelections?.[s.current] ?? null)
      setConfirmed(s.allConfirmed?.[s.current] ?? false)
      setBookmarks(s.bookmarks || {})
      setCorrectCount(s.correctCount || 0)
      setWrongCount(s.wrongCount || 0)
      setAnswers(s.answers || [])
      setAllConfirmed(s.allConfirmed || {})
      setAllSelections(s.allSelections || {})
      if ((s.correctCount || 0) + (s.wrongCount || 0) > 0) {
        setResumeToast(`Resuming from question ${(s.current || 0) + 1}`)
        setTimeout(() => setResumeToast(null), 3000)
      }
    } catch { /* ignore corrupt data */ }
  }, [storageKey, qs.length])

  // --- AUTO-SAVE: Save helper ---
  const saveProgress = useCallback(() => {
    if (!storageKey) return
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        current, bookmarks, correctCount, wrongCount, answers,
        allConfirmed, allSelections, totalQuestions: qs.length,
        questionOrder: questionOrderRef.current,
        savedAt: Date.now(),
      }))
    } catch { /* storage full — ignore */ }
  }, [storageKey, current, bookmarks, correctCount, wrongCount, answers, allConfirmed, allSelections, qs.length])

  // --- AUTO-SAVE: beforeunload safety net ---
  useEffect(() => {
    const handleBeforeUnload = () => saveProgress()
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [saveProgress])

  useEffect(() => {
    if (activeDotRef.current) {
      activeDotRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [current])

  useEffect(() => {
    if (!topic || qs.length === 0) navigate('/dashboard')
  }, [topic, qs])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && current > 0) {
        handleJump(current - 1)
      } else if (e.key === 'ArrowRight') {
        if (confirmed && !isLast) {
          handleNext()
        } else if (!confirmed && !isLast) {
          handleJump(current + 1)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (!topic || qs.length === 0) return null

  const q = qs[current]
  const isLast = current === qs.length - 1
  const progress = ((current + 1) / qs.length) * 100
  const bookmarkedNow = bookmarks[current] ?? false

  const handleSelect = (i) => {
    if (confirmed) return
    setSelected(i)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    const newAllConfirmed = { ...allConfirmed, [current]: true }
    const newAllSelections = { ...allSelections, [current]: selected }
    setAllConfirmed(newAllConfirmed)
    setAllSelections(newAllSelections)
    const newCorrect = selected === q.answer ? correctCount + 1 : correctCount
    const newWrong = selected !== q.answer ? wrongCount + 1 : wrongCount
    if (selected === q.answer) {
      setCorrectCount(c => c + 1)
    } else {
      setWrongCount(c => c + 1)
    }
    // Auto-save after every confirmation
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        current, bookmarks, correctCount: newCorrect, wrongCount: newWrong, answers,
        allConfirmed: newAllConfirmed, allSelections: newAllSelections,
        totalQuestions: qs.length, questionOrder: questionOrderRef.current,
        savedAt: Date.now(),
      }))
    } catch { /* ignore */ }
  }

  const handleBookmark = () => {
    setBookmarks(prev => ({ ...prev, [current]: !bookmarkedNow }))
  }

  const handleJump = (idx) => {
    if (idx < 0 || idx >= qs.length) return
    if (confirmed) {
      setAllConfirmed(prev => ({ ...prev, [current]: true }))
      setAllSelections(prev => ({ ...prev, [current]: selected }))
    }
    setCurrent(idx)
    setSelected(allSelections[idx] ?? null)
    setConfirmed(allConfirmed[idx] ?? false)
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
      // Clear saved progress on quiz completion
      localStorage.removeItem(storageKey)
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
      const next = current + 1
      setCurrent(next)
      setSelected(allSelections[next] ?? null)
      setConfirmed(allConfirmed[next] ?? false)
    }
  }

  const getDotStatus = (idx) => {
    if (bookmarks[idx]) return 'bookmarked'
    if (!allConfirmed[idx]) return 'unanswered'
    if (allSelections[idx] === qs[idx]?.answer) return 'correct'
    return 'wrong'
  }

  const displayEmoji = topic.emoji || topics.find((t) =>
    t.subtopics?.some((s) => s.id === topicId)
  )?.emoji || '📚'

  return (
    <div className={styles.root}>
      <Navbar />
      {resumeToast && (
        <div className={styles.resumeToast}>{resumeToast}</div>
      )}
      <div className={styles.layout}>

        {/* LEFT SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <span className={styles.sidebarTitle}>Questions</span>
            <span className={styles.sidebarCount}>{correctCount + wrongCount}/{qs.length}</span>
          </div>

          <div className={styles.dotsGrid}>
            {qs.map((_, idx) => {
              const status = getDotStatus(idx)
              const isActive = current === idx
              return (
                <button
                  key={idx}
                  ref={isActive ? activeDotRef : null}
                  className={`${styles.dot} ${styles[`dot_${status}`]} ${isActive ? styles.dotActive : ''}`}
                  onClick={() => handleJump(idx)}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          <div className={styles.sidebarStats}>
            <div className={styles.sidebarStat}>
              <span className={styles.statDot} style={{ background: '#16a34a' }} />
              <span>{correctCount} correct</span>
            </div>
            <div className={styles.sidebarStat}>
              <span className={styles.statDot} style={{ background: '#dc2626' }} />
              <span>{wrongCount} wrong</span>
            </div>
            <div className={styles.sidebarStat}>
              <span className={styles.statDot} style={{ background: '#f59e0b' }} />
              <span>{Object.values(bookmarks).filter(Boolean).length} saved</span>
            </div>
            <div className={styles.sidebarStat}>
              <span className={styles.statDot} style={{ background: 'var(--border)' }} />
              <span>{qs.length - correctCount - wrongCount} remaining</span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.main}>
          <div className={styles.mainInner}>

            {/* Top bar */}
            <div className={styles.topBar}>
              <Link to="/dashboard" className={styles.backBtn}>← Dashboard</Link>
              <div className={styles.topMeta}>
                <span className={styles.topicBadge}>{displayEmoji} {topic.name}</span>
                <span className={styles.counter}>{current + 1} / {qs.length}</span>
              </div>
            </div>

            {/* Progress */}
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            {/* Question card */}
            <div className={styles.card}>
              <div className={styles.cardTopRow}>
                <p className={styles.qLabel}>Question {current + 1}</p>
                <button
                  className={`${styles.markReviewBtn} ${bookmarkedNow ? styles.markReviewActive : ''}`}
                  onClick={handleBookmark}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={bookmarkedNow ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  {bookmarkedNow ? 'Marked for Review' : 'Mark for Review'}
                </button>
              </div>

              <h2 className={styles.qText}>{q.q}</h2>

              <div className={styles.options}>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`${styles.option} ${!confirmed
                      ? selected === i ? styles.selectedPending : ''
                      : i === q.answer ? styles.correct
                        : selected === i ? styles.wrong
                          : styles.dimmed
                      }`}
                    onClick={() => handleSelect(i)}
                    disabled={confirmed}
                  >
                    <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                    {confirmed && i === q.answer && <span className={styles.tick}>✓</span>}
                    {confirmed && selected === i && i !== q.answer && <span className={styles.cross}>✗</span>}
                  </button>
                ))}
              </div>

              {confirmed && (
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

            {/* Action buttons */}
            <div className={styles.navBtns}>
              <button
                className={styles.prevBtn}
                onClick={() => handleJump(current - 1)}
                disabled={current === 0}
              >
                ← Prev
              </button>
              <div className={styles.navBtnsRight}>
                {!confirmed && (
                  <button
                    className={styles.skipBtn}
                    onClick={() => handleJump(current + 1)}
                    disabled={isLast}
                  >
                    Skip →
                  </button>
                )}
                {selected !== null && !confirmed && (
                  <button className={styles.confirmBtn} onClick={handleConfirm}>
                    Check Answer ✓
                  </button>
                )}
                {confirmed && (
                  <button className={styles.nextBtn} onClick={handleNext}>
                    {isLast ? 'See Results →' : 'Next Question →'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}