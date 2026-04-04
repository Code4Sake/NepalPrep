import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ceeTopics, ioeTopics, loadQuestions } from '../data/questions'
import { useAuth } from '../context/AuthContext'
import styles from './Quiz.module.css'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/* ── Streak banner ── */
function StreakBanner({ streak }) {
  if (streak < 2) return null
  const msgs = { 2: ['Nice!', '✨'], 3: ['3 in a row!', '🔥'], 4: ['On fire!', '🔥🔥'], 5: ['Unstoppable!', '⚡'] }
  const [msg, emoji] = msgs[Math.min(streak, 5)] || ['Keep going!', '🚀']
  return (
    <div key={streak} className={styles.streakBanner}>
      <span>{emoji}</span>
      <span className={styles.streakBannerText}>{msg}</span>
      <span className={styles.streakBannerCount}>{streak} correct</span>
    </div>
  )
}

export default function Quiz() {
  const { exam, topicId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const storageKey = `nepalprep-quiz-${user?.uid}-${topicId}`

  const topics = exam === 'cee' ? ceeTopics : ioeTopics
  const isRandom = topicId.endsWith('-random')
  const parentId = isRandom ? topicId.replace('-random', '') : null
  const parentTopic = isRandom ? topics.find(t => t.id === parentId) : null
  const topic = isRandom
    ? parentTopic
    : topics.find(t => t.id === topicId)
    ?? topics.flatMap(t => t.subtopics || []).find(s => s.id === topicId)

  const [qs, setQs] = useState([])
  const [loading, setLoading] = useState(true)
  const questionOrderRef = useRef(null)

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
  const [saveFlash, setSaveFlash] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerPaused, setTimerPaused] = useState(false)
  const [timerHidden, setTimerHidden] = useState(false)
  const [questionTimes, setQuestionTimes] = useState({})
  const [correctStreak, setCorrectStreak] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [cardKey, setCardKey] = useState(0)

  const timerRef = useRef(null)
  const hasLoadedSave = useRef(false)
  const prevTopicRef = useRef(null)
  const activeDotRef = useRef(null)

  // ── Load questions ──
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    async function fetchQuestions() {
      let arr = []
      if (isRandom && parentTopic?.subtopics) {
        const results = await Promise.all(parentTopic.subtopics.map(sub => loadQuestions(sub.id)))
        arr = results.flat()
      } else {
        arr = await loadQuestions(topicId)
      }
      if (cancelled) return
      if (isRandom) {
        setQs(arr)
        questionOrderRef.current = null
      } else {
        let savedOrder = null
        try {
          const saved = localStorage.getItem(storageKey)
          if (saved) {
            const s = JSON.parse(saved)
            if (s.questionOrder && s.questionOrder.length === arr.length) savedOrder = s.questionOrder
          }
        } catch { /* ignore */ }
        if (savedOrder) {
          questionOrderRef.current = savedOrder
          setQs(savedOrder.map(i => arr[i]))
        } else {
          const indices = arr.map((_, i) => i)
          for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]]
          }
          questionOrderRef.current = indices
          setQs(indices.map(i => arr[i]))
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
      setLoading(false)
    }
    fetchQuestions()
    return () => { cancelled = true }
  }, [topicId])

  // ── Reset on topic change ──
  useEffect(() => {
    if (prevTopicRef.current !== topicId) {
      prevTopicRef.current = topicId
      setCurrent(0); setSelected(null); setConfirmed(false)
      setBookmarks({}); setCorrectCount(0); setWrongCount(0)
      setAnswers([]); setAllConfirmed({}); setAllSelections({})
      setTimerSeconds(0); setTimerPaused(false); setQuestionTimes({})
      setCorrectStreak(0); setLastResult(null)
    }
  }, [topicId])

  // ── Auto-save load ──
  useEffect(() => {
    if (hasLoadedSave.current || loading || qs.length === 0) return
    hasLoadedSave.current = true
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) return
      const s = JSON.parse(saved)
      if (s.totalQuestions !== qs.length) { localStorage.removeItem(storageKey); return }
      setCurrent(s.current || 0)
      setSelected(s.allSelections?.[s.current] ?? null)
      setConfirmed(s.allConfirmed?.[s.current] ?? false)
      setBookmarks(s.bookmarks || {})
      setCorrectCount(s.correctCount || 0)
      setWrongCount(s.wrongCount || 0)
      setAnswers(s.answers || [])
      setAllConfirmed(s.allConfirmed || {})
      setAllSelections(s.allSelections || {})
      if (s.questionTimes) setQuestionTimes(s.questionTimes)
      if ((s.correctCount || 0) + (s.wrongCount || 0) > 0) {
        setResumeToast(`Resuming from Q${(s.current || 0) + 1}`)
        setTimeout(() => setResumeToast(null), 3000)
      }
    } catch { /* ignore */ }
  }, [storageKey, qs.length, loading])

  // ── Save helper ──
  const saveProgress = useCallback((showFlash = false) => {
    if (!storageKey) return
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        current, bookmarks, correctCount, wrongCount, answers,
        allConfirmed, allSelections, totalQuestions: qs.length,
        questionOrder: questionOrderRef.current, questionTimes, savedAt: Date.now(),
      }))
      if (showFlash) { setSaveFlash(true); setTimeout(() => setSaveFlash(false), 2000) }
    } catch { /* ignore */ }
  }, [storageKey, current, bookmarks, correctCount, wrongCount, answers, allConfirmed, allSelections, qs.length, questionTimes])

  useEffect(() => {
    const fn = () => saveProgress()
    window.addEventListener('beforeunload', fn)
    return () => window.removeEventListener('beforeunload', fn)
  }, [saveProgress])

  useEffect(() => {
    if (activeDotRef.current) activeDotRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [current])

  // ── Timer ──
  useEffect(() => {
    if (timerPaused || loading) return
    timerRef.current = setInterval(() => setTimerSeconds(s => s + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [current, timerPaused, loading])

  useEffect(() => { setTimerSeconds(0); setTimerPaused(false) }, [current])

  useEffect(() => {
    if (!loading && (!topic || qs.length === 0)) navigate('/dashboard')
  }, [topic, qs, loading])

  // ── Keyboard nav ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' && current > 0) handleJump(current - 1)
      else if (e.key === 'ArrowRight') {
        if (confirmed && !isLast) handleNext()
        else if (!confirmed) handleJump(current + 1)
      } else if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault()
        if (selected !== null && !confirmed) handleConfirm()
        else if (confirmed && !isLast) handleNext()
      } else if (e.key >= '1' && e.key <= '4' && !confirmed) {
        const i = parseInt(e.key) - 1
        if (qs[current]?.options?.[i] !== undefined) setSelected(i)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // ── Loading ──
  if (loading) {
    return (
      <div className={styles.root}>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Loading questions…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  if (!topic || qs.length === 0) return null

  const q = qs[current]
  const isLast = current === qs.length - 1
  const progress = ((current + 1) / qs.length) * 100
  const bookmarkedNow = bookmarks[current] ?? false
  const answered = correctCount + wrongCount
  const accuracy = answered > 0 ? Math.round((correctCount / answered) * 100) : null
  const accColor = accuracy === null ? 'var(--primary)' : accuracy >= 70 ? '#16a34a' : accuracy >= 45 ? '#d97706' : '#dc2626'

  const handleSelect = (i) => { if (confirmed) return; setSelected(i) }

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    setTimerPaused(true)
    const isCorrect = selected === q.answer
    const newAllConfirmed = { ...allConfirmed, [current]: true }
    const newAllSelections = { ...allSelections, [current]: selected }
    const newQuestionTimes = { ...questionTimes, [current]: timerSeconds }
    setAllConfirmed(newAllConfirmed)
    setAllSelections(newAllSelections)
    setQuestionTimes(newQuestionTimes)
    const newCorrect = isCorrect ? correctCount + 1 : correctCount
    const newWrong = isCorrect ? wrongCount : wrongCount + 1
    if (isCorrect) { setCorrectCount(c => c + 1); setCorrectStreak(s => s + 1) }
    else { setWrongCount(c => c + 1); setCorrectStreak(0) }
    setLastResult(isCorrect ? 'correct' : 'wrong')
    // Scroll nav buttons into view after a short delay
    setTimeout(() => {
      document.querySelector('[data-nav-btns]')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 350)
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        current, bookmarks, correctCount: newCorrect, wrongCount: newWrong, answers,
        allConfirmed: newAllConfirmed, allSelections: newAllSelections,
        totalQuestions: qs.length, questionOrder: questionOrderRef.current,
        questionTimes: newQuestionTimes, savedAt: Date.now(),
      }))
      setSaveFlash(true); setTimeout(() => setSaveFlash(false), 2000)
    } catch { /* ignore */ }
  }

  const handleBookmark = () => setBookmarks(prev => ({ ...prev, [current]: !bookmarkedNow }))

  const handleJump = (idx) => {
    if (idx < 0 || idx >= qs.length) return
    if (confirmed) {
      setAllConfirmed(prev => ({ ...prev, [current]: true }))
      setAllSelections(prev => ({ ...prev, [current]: selected }))
    }
    setCardKey(k => k + 1)
    setCurrent(idx)
    setSelected(allSelections[idx] ?? null)
    setConfirmed(allConfirmed[idx] ?? false)
    setLastResult(null)
  }

  const handleNext = () => {
    const newAnswers = [...answers, {
      question: q.q, options: q.options, selected,
      correct: q.answer, isCorrect: selected === q.answer, explanation: q.explanation || '',
    }]
    if (isLast) {
      localStorage.removeItem(storageKey)
      navigate('/results', { state: { topicId, topicName: topic.name, exam, answers: newAnswers, score: newAnswers.filter(a => a.isCorrect).length, total: qs.length } })
    } else {
      setAnswers(newAnswers)
      const next = current + 1
      setCardKey(k => k + 1)
      setCurrent(next)
      setSelected(allSelections[next] ?? null)
      setConfirmed(allConfirmed[next] ?? false)
      setLastResult(null)
    }
  }

  const getDotStatus = (idx) => {
    if (bookmarks[idx]) return 'bookmarked'
    if (!allConfirmed[idx]) return 'unanswered'
    return allSelections[idx] === qs[idx]?.answer ? 'correct' : 'wrong'
  }

  const displayEmoji = topic.emoji || topics.find(t => t.subtopics?.some(s => s.id === topicId))?.emoji || '📚'
  const handleSaveExit = () => { saveProgress(true); setShowExitModal(true) }
  const confirmExit = () => { saveProgress(); navigate('/dashboard') }

  return (
    <div className={styles.root}>

      {resumeToast && <div className={styles.resumeToast}>{resumeToast}</div>}
      <StreakBanner streak={correctStreak} />

      {/* Exit modal */}
      {showExitModal && (
        <div className={styles.modalOverlay} onClick={() => setShowExitModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>Progress saved!</h3>
            <p className={styles.modalText}>
              {answered}/{qs.length} answered · {accuracy ?? 0}% accuracy. Resume anytime from your dashboard.
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.modalCancel} onClick={() => setShowExitModal(false)}>Keep studying</button>
              <button className={styles.modalConfirm} onClick={confirmExit}>Exit to dashboard</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.layout}>

        {/* ═══ SIDEBAR ═══ */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <span className={styles.sidebarTitle}>Questions</span>
            <span className={styles.sidebarCount}>{answered}/{qs.length}</span>
          </div>

          {/* Labeled accuracy bar */}
          <div className={styles.accuracyWrap}>
            <div className={styles.accuracyLabel}>
              <span>Accuracy</span>
              {accuracy !== null && (
                <span className={styles.accuracyPct} style={{ color: accColor }}>{accuracy}%</span>
              )}
            </div>
            <div className={styles.accuracyBar}>
              <div
                className={styles.accuracyFill}
                style={{ width: accuracy !== null ? `${accuracy}%` : '0%', background: accColor }}
              />
            </div>
          </div>

          {/* Dots */}
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
                  title={`Q${idx + 1}`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className={styles.sidebarStats}>
            <div className={styles.sidebarStat}><span className={styles.statDot} style={{ background: '#16a34a' }} />{correctCount} correct</div>
            <div className={styles.sidebarStat}><span className={styles.statDot} style={{ background: '#dc2626' }} />{wrongCount} wrong</div>
            <div className={styles.sidebarStat}><span className={styles.statDot} style={{ background: '#f59e0b' }} />{Object.values(bookmarks).filter(Boolean).length} saved</div>
            <div className={styles.sidebarStat}><span className={styles.statDot} style={{ background: 'var(--border)' }} />{qs.length - answered} left</div>
          </div>
        </div>

        {/* ═══ MAIN ═══ */}
        <div className={styles.main}>
          <div className={styles.mainInner}>

            {/* Top bar */}
            <div className={styles.topBar}>
              <button onClick={handleSaveExit} className={styles.backBtn}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Save &amp; Exit
              </button>

              <div className={styles.topCenter}>
                <span className={styles.topicBadge}>{displayEmoji} {topic.name}</span>
                {saveFlash && <span className={styles.saveIndicator}>✓ Saved</span>}
              </div>

              <span className={styles.topCounter}>{current + 1} / {qs.length}</span>
            </div>

            {/* Progress bar */}
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <span className={styles.progressLabel}>{current + 1}<span className={styles.progressOf}>/{qs.length}</span></span>
            </div>

            {/* Timer — original position below progress */}
            {!timerHidden ? (
              <div className={styles.timerBar}>
                <span className={`${styles.timerDisplay} ${timerSeconds > 90 ? styles.timerUrgent : ''}`}>
                  {formatTime(timerSeconds)}
                </span>
                <div className={styles.timerControls}>
                  <button className={styles.timerBtn} onClick={() => setTimerPaused(p => !p)} title={timerPaused ? 'Resume' : 'Pause'}>
                    {timerPaused ? '▶' : '⏸'}
                  </button>
                  <button className={styles.timerBtnHide} onClick={() => setTimerHidden(true)}>Hide</button>
                </div>
              </div>
            ) : (
              <button className={styles.timerShowBtn} onClick={() => setTimerHidden(false)}>⏱ Show Timer</button>
            )}

            {/* Question card */}
            <div
              key={cardKey}
              className={`${styles.card} ${confirmed ? (lastResult === 'correct' ? styles.cardCorrect : styles.cardWrong) : ''}`}
            >
              <div className={styles.cardAccent} />

              <div className={styles.cardTopRow}>
                <p className={styles.qLabel}>Question {current + 1}</p>
                <button
                  className={`${styles.markReviewBtn} ${bookmarkedNow ? styles.markReviewActive : ''}`}
                  onClick={handleBookmark}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarkedNow ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  {bookmarkedNow ? 'Saved' : 'Save'}
                </button>
              </div>

              <h2 className={styles.qText}>{q.q}</h2>

              <div className={styles.options}>
                {q.options.map((opt, i) => {
                  let cls = styles.option
                  if (!confirmed) {
                    if (selected === i) cls = `${styles.option} ${styles.selectedPending}`
                  } else {
                    if (i === q.answer) cls = `${styles.option} ${styles.correct}`
                    else if (selected === i) cls = `${styles.option} ${styles.wrong}`
                    else cls = `${styles.option} ${styles.dimmed}`
                  }
                  return (
                    <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={confirmed}>
                      <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                      <span className={styles.optText}>{opt}</span>
                      {confirmed && i === q.answer && (
                        <span className={styles.tick}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                      )}
                      {confirmed && selected === i && i !== q.answer && (
                        <span className={styles.cross}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {confirmed && (
                <div className={`${styles.feedback} ${lastResult === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                  <span className={styles.feedbackLabel}>
                    {lastResult === 'correct' ? '✓ Correct!' : `✗ Answer: ${q.options[q.answer]}`}
                  </span>
                  {q.explanation && <p className={styles.explanation}>{q.explanation}</p>}
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className={styles.navBtns} data-nav-btns>
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
                    Check Answer
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </button>
                )}
                {confirmed && (
                  <button className={styles.nextBtn} onClick={handleNext}>
                    {isLast ? 'See Results' : 'Next Question'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                )}
              </div>
            </div>

            {/* Keyboard hint */}
            <div className={styles.keyHint}>
              <kbd>1–4</kbd> select · <kbd>Space</kbd> confirm · <kbd>←</kbd><kbd>→</kbd> navigate
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
