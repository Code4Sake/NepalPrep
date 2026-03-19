import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ceeTopics, ioeTopics } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './Tracker.module.css'

const ALL_TOPICS = [
  ...ceeTopics.map((t) => ({ ...t, exam: 'CEE' })),
  ...ioeTopics.map((t) => ({ ...t, exam: 'IOE' })),
]

const COLS = ['Notes', 'PYQ', 'Rev 1', 'Rev 2', 'Done']

const DEFAULT_TRACKER = () => {
  const obj = {}
  ALL_TOPICS.forEach((t) => {
    obj[t.id] = { notes: false, pyq: false, rev1: false, rev2: false, done: false, deadline: '' }
  })
  return obj
}

export default function Tracker() {
  const { user } = useAuth()
  const [tracker, setTracker] = useState(DEFAULT_TRACKER())
  const [examDate, setExamDate] = useState('')
  const [editingDate, setEditingDate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, 'trackers', user.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const data = snap.data()
          setTracker(data.topics || DEFAULT_TRACKER())
          setExamDate(data.examDate || '')
        }
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    load()
  }, [user])

  const save = async (newTracker, newExamDate) => {
    try {
      await setDoc(doc(db, 'trackers', user.uid), {
        topics: newTracker,
        examDate: newExamDate ?? examDate,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const toggle = (topicId, col) => {
    const colKey = col.toLowerCase().replace(' ', '')
    const updated = {
      ...tracker,
      [topicId]: {
        ...tracker[topicId],
        [colKey]: !tracker[topicId]?.[colKey],
      },
    }
    setTracker(updated)
    save(updated, examDate)
  }

  const setDeadline = (topicId, date) => {
    const updated = {
      ...tracker,
      [topicId]: { ...tracker[topicId], deadline: date },
    }
    setTracker(updated)
    save(updated, examDate)
  }

  const handleExamDate = (date) => {
    setExamDate(date)
    setEditingDate(false)
    save(tracker, date)
  }

  const daysLeft = examDate
    ? Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null

  const totalTopics = ALL_TOPICS.length
  const doneTopics = ALL_TOPICS.filter((t) => tracker[t.id]?.done).length
  const overallPct = Math.round((doneTopics / totalTopics) * 100)

  const today = new Date().toISOString().split('T')[0]
  const backlogTopics = ALL_TOPICS.filter((t) => {
    const td = tracker[t.id]
    return td?.deadline && td.deadline < today && !td.done
  })

  const displayTopics = ALL_TOPICS.filter((t) => {
    if (filter === 'CEE') return t.exam === 'CEE'
    if (filter === 'IOE') return t.exam === 'IOE'
    if (filter === 'Backlog') return backlogTopics.find((b) => b.id === t.id)
    return true
  })

  const colKey = (col) => col.toLowerCase().replace(' ', '')

  if (loading) {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.loading}>Loading your tracker...</div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Study Tracker</h1>
            <p className={styles.sub}>Track your chapter completion, set deadlines, and stay on top of backlogs.</p>
          </div>
          <Link to="/dashboard" className={styles.backBtn}>← Dashboard</Link>
        </div>

        <div className={styles.topCards}>
          <div className={styles.countdownCard}>
            {daysLeft !== null ? (
              <>
                <span className={`${styles.daysNum} ${daysLeft < 30 ? styles.daysRed : daysLeft < 60 ? styles.daysAmber : styles.daysGreen}`}>
                  {daysLeft}
                </span>
                <span className={styles.daysLabel}>days till exam</span>
                <button className={styles.changeDateBtn} onClick={() => setEditingDate(true)}>Change date</button>
              </>
            ) : (
              <>
                <p className={styles.noDateText}>Set your exam date</p>
                <button className={styles.setDateBtn} onClick={() => setEditingDate(true)}>Set Date →</button>
              </>
            )}
            {editingDate && (
              <div className={styles.datePickerWrap}>
                <input
                  type="date"
                  className={styles.datePicker}
                  defaultValue={examDate}
                  min={today}
                  onChange={(e) => handleExamDate(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <span className={styles.progressLabel}>Overall Progress</span>
              <span className={styles.progressPct}>{overallPct}%</span>
            </div>
            <div className={styles.progressBarWrap}>
              <div className={styles.progressBarFill} style={{ width: `${overallPct}%` }} />
            </div>
            <p className={styles.progressSub}>{doneTopics} / {totalTopics} chapters completed</p>
          </div>

          {backlogTopics.length > 0 && (
            <div className={styles.backlogCard}>
              <span className={styles.backlogNum}>{backlogTopics.length}</span>
              <span className={styles.backlogLabel}>overdue topics</span>
              <button className={styles.viewBacklogBtn} onClick={() => setFilter('Backlog')}>View backlogs →</button>
            </div>
          )}
        </div>

        <div className={styles.filterTabs}>
          {['All', 'CEE', 'IOE', 'Backlog'].map((f) => (
            <button
              key={f}
              className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'Backlog' && backlogTopics.length > 0 ? `Backlog (${backlogTopics.length})` : f}
            </button>
          ))}
        </div>

        {/* Mobile card layout */}
        <div className={styles.mobileList}>
          {displayTopics.map((topic) => {
            const td = tracker[topic.id] || {}
            const isOverdue = td.deadline && td.deadline < today && !td.done
            const isDone = td.done
            const topicDaysLeft = td.deadline
              ? Math.ceil((new Date(td.deadline) - new Date()) / (1000 * 60 * 60 * 24))
              : null

            return (
              <div key={topic.id} className={`${styles.mobileCard} ${isDone ? styles.mobileCardDone : ''} ${isOverdue ? styles.mobileCardOverdue : ''}`}>
                <div className={styles.mobileCardTop}>
                  <span className={styles.mobileEmoji}>{topic.emoji}</span>
                  <div className={styles.mobileCardInfo}>
                    <span className={styles.mobileName}>{topic.name}</span>
                    <span className={`${styles.examBadge} ${topic.exam === 'CEE' ? styles.badgeCee : styles.badgeIoe}`}>{topic.exam}</span>
                  </div>
                  {topicDaysLeft !== null && (
                    <span className={`${styles.daysChip} ${isDone ? styles.chipDone : topicDaysLeft < 0 ? styles.chipOverdue : topicDaysLeft <= 3 ? styles.chipUrgent : styles.chipOk}`}>
                      {isDone ? '✓' : topicDaysLeft < 0 ? `${Math.abs(topicDaysLeft)}d late` : `${topicDaysLeft}d`}
                    </span>
                  )}
                </div>

                <div className={styles.mobileCheckboxes}>
                  {COLS.map((col) => (
                    <button
                      key={col}
                      className={`${styles.mobileCheck} ${td[colKey(col)] ? styles.mobileCheckOn : ''}`}
                      onClick={() => toggle(topic.id, col)}
                    >
                      <span className={styles.mobileCheckLabel}>{col}</span>
                      <span className={styles.mobileCheckBox}>{td[colKey(col)] ? '✓' : ''}</span>
                    </button>
                  ))}
                </div>

                <div className={styles.mobileDeadline}>
                  <label className={styles.deadlineLabel}>Deadline:</label>
                  <input
                    type="date"
                    className={`${styles.deadlineInput} ${isOverdue ? styles.deadlineOverdue : ''}`}
                    value={td.deadline || ''}
                    min={today}
                    onChange={(e) => setDeadline(topic.id, e.target.value)}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {displayTopics.length === 0 && filter === 'Backlog' && (
          <div className={styles.emptyBacklog}>
            <p>🎉 No backlogs! You're on track.</p>
          </div>
        )}
      </div>
    </div>
  )
}
