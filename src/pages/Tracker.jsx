import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ceeTopics } from '../data/questions'
import Navbar from '../components/Navbar'
import styles from './Tracker.module.css'

const ALL_TOPICS = ceeTopics.map((t) => ({ ...t, exam: 'CEE' }))
const DEFAULT_TOPIC_DATA = () => ({ tasks: [], deadline: '', done: false })

export default function Tracker() {
  const { user } = useAuth()
  const [tracker, setTracker] = useState({})
  const [examDate, setExamDate] = useState('')
  const [editingDate, setEditingDate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [taskInputs, setTaskInputs] = useState({})
  const [addingFor, setAddingFor] = useState(null) // topicId currently showing input

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, 'trackers', user.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const data = snap.data()
          setTracker(data.topics || {})
          setExamDate(data.examDate || '')
        }
      } catch (e) { console.error(e) }
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
    } catch (e) { console.error(e) }
  }

  const getTopicData = (topicId) => tracker[topicId] || DEFAULT_TOPIC_DATA()

  const addTask = (topicId) => {
    const name = (taskInputs[topicId] || '').trim()
    if (!name) return
    const td = getTopicData(topicId)
    const newTask = { id: Date.now().toString(), name, done: false }
    const updated = { ...tracker, [topicId]: { ...td, tasks: [...(td.tasks || []), newTask] } }
    setTracker(updated)
    save(updated, examDate)
    setTaskInputs((p) => ({ ...p, [topicId]: '' }))
    setAddingFor(null)
  }

  const toggleTask = (topicId, taskId) => {
    const td = getTopicData(topicId)
    const updatedTasks = td.tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t)
    const allDone = updatedTasks.length > 0 && updatedTasks.every((t) => t.done)
    const updated = { ...tracker, [topicId]: { ...td, tasks: updatedTasks, done: allDone } }
    setTracker(updated)
    save(updated, examDate)
  }

  const deleteTask = (topicId, taskId) => {
    const td = getTopicData(topicId)
    const updated = { ...tracker, [topicId]: { ...td, tasks: td.tasks.filter((t) => t.id !== taskId) } }
    setTracker(updated)
    save(updated, examDate)
  }

  const toggleTopicDone = (topicId) => {
    const td = getTopicData(topicId)
    const updated = { ...tracker, [topicId]: { ...td, done: !td.done } }
    setTracker(updated)
    save(updated, examDate)
  }

  const setDeadline = (topicId, date) => {
    const td = getTopicData(topicId)
    const updated = { ...tracker, [topicId]: { ...td, deadline: date } }
    setTracker(updated)
    save(updated, examDate)
  }

  const handleExamDate = (date) => {
    setExamDate(date)
    setEditingDate(false)
    save(tracker, date)
  }

  const today = new Date().toISOString().split('T')[0]
  const daysLeft = examDate ? Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)) : null
  const totalTopics = ALL_TOPICS.length
  const doneTopics = ALL_TOPICS.filter((t) => getTopicData(t.id).done).length
  const overallPct = Math.round((doneTopics / totalTopics) * 100)
  const backlogTopics = ALL_TOPICS.filter((t) => {
    const td = getTopicData(t.id)
    return td.deadline && td.deadline < today && !td.done
  })
  const displayTopics = ALL_TOPICS.filter((t) => {
    if (filter === 'Backlog') return backlogTopics.find((b) => b.id === t.id)
    return true
  })

  if (loading) return (
    <div className={styles.root}><Navbar /><div className={styles.loading}>Loading your tracker...</div></div>
  )

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Study Tracker</h1>
            <p className={styles.sub}>Add custom tasks per chapter, set deadlines, track your progress.</p>
          </div>
          <Link to="/dashboard" className={styles.backBtn}>← Dashboard</Link>
        </div>

        {/* Top cards */}
        <div className={styles.topCards}>
          <div className={styles.countdownCard}>
            {daysLeft !== null ? (
              <>
                <span className={`${styles.daysNum} ${daysLeft < 30 ? styles.daysRed : daysLeft < 60 ? styles.daysAmber : styles.daysGreen}`}>{daysLeft}</span>
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
                <input type="date" className={styles.datePicker} defaultValue={examDate} min={today}
                  onChange={(e) => handleExamDate(e.target.value)} autoFocus />
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
              <span className={styles.backlogLabel}>overdue</span>
              <button className={styles.viewBacklogBtn} onClick={() => setFilter('Backlog')}>View →</button>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div className={styles.filterTabs}>
          {['All', 'Backlog'].map((f) => (
            <button key={f}
              className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(f)}>
              {f === 'Backlog' && backlogTopics.length > 0 ? `Backlog (${backlogTopics.length})` : f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={styles.cardList}>
          {displayTopics.map((topic) => {
            const td = getTopicData(topic.id)
            const isOverdue = td.deadline && td.deadline < today && !td.done
            const topicDaysLeft = td.deadline
              ? Math.ceil((new Date(td.deadline) - new Date()) / (1000 * 60 * 60 * 24))
              : null
            const completedTasks = (td.tasks || []).filter((t) => t.done).length
            const totalTasks = (td.tasks || []).length
            const isAddingHere = addingFor === topic.id

            return (
              <div key={topic.id} className={`${styles.card} ${td.done ? styles.cardDone : ''} ${isOverdue ? styles.cardOverdue : ''}`}>

                {/* Card header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardLeft}>
                    <span className={styles.cardEmoji}>{topic.emoji}</span>
                    <div>
                      <span className={styles.cardName}>{topic.name}</span>
                      <span className={styles.badgeCee}>CEE</span>
                    </div>
                  </div>
                  <div className={styles.cardRight}>
                    {topicDaysLeft !== null && (
                      <span className={`${styles.daysChip} ${
                        td.done ? styles.chipDone :
                        topicDaysLeft < 0 ? styles.chipOverdue :
                        topicDaysLeft <= 3 ? styles.chipUrgent : styles.chipOk
                      }`}>
                        {td.done ? '✓' : topicDaysLeft < 0 ? `${Math.abs(topicDaysLeft)}d late` : `${topicDaysLeft}d`}
                      </span>
                    )}
                    <button
                      className={`${styles.doneToggle} ${td.done ? styles.doneToggleOn : ''}`}
                      onClick={() => toggleTopicDone(topic.id)}>
                      {td.done ? '✓ Done' : 'Mark done'}
                    </button>
                  </div>
                </div>

                {/* Task progress bar */}
                {totalTasks > 0 && (
                  <div className={styles.taskProgress}>
                    <div className={styles.taskProgressBar}>
                      <div className={styles.taskProgressFill} style={{ width: `${Math.round((completedTasks / totalTasks) * 100)}%` }} />
                    </div>
                    <span className={styles.taskProgressText}>{completedTasks}/{totalTasks}</span>
                  </div>
                )}

                {/* Pill tasks row */}
                <div className={styles.pillsRow}>
                  {(td.tasks || []).map((task) => (
                    <div key={task.id} className={`${styles.pill} ${task.done ? styles.pillDone : ''}`}>
                      <button className={styles.pillCheck} onClick={() => toggleTask(topic.id, task.id)}>
                        {task.done ? '✓' : ''}
                      </button>
                      <span className={styles.pillName}>{task.name}</span>
                      <button className={styles.pillDelete} onClick={() => deleteTask(topic.id, task.id)}>✕</button>
                    </div>
                  ))}

                  {/* Add button / input */}
                  {isAddingHere ? (
                    <div className={styles.pillInput}>
                      <input
                        autoFocus
                        className={styles.pillInputField}
                        placeholder="Task name..."
                        value={taskInputs[topic.id] || ''}
                        onChange={(e) => setTaskInputs((p) => ({ ...p, [topic.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') addTask(topic.id)
                          if (e.key === 'Escape') setAddingFor(null)
                        }}
                        onBlur={() => { if (!(taskInputs[topic.id] || '').trim()) setAddingFor(null) }}
                      />
                      <button className={styles.pillConfirm} onClick={() => addTask(topic.id)}>Add</button>
                    </div>
                  ) : (
                    <button className={styles.pillAdd} onClick={() => setAddingFor(topic.id)}>+ Add</button>
                  )}
                </div>

                {/* Deadline */}
                <div className={styles.deadlineRow}>
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
          <div className={styles.emptyBacklog}><p>🎉 No backlogs! You're on track.</p></div>
        )}
      </div>
    </div>
  )
}