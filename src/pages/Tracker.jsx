import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { ceeTopics } from '../data/questions'
import ThemeToggle from '../components/ThemeToggle'
import styles from './Tracker.module.css'

/* ── Domain map (same as Dashboard/Stats) ── */
const DOMAIN_MAP = {
  'cell-biology':'Zoology','animal-tissue':'Zoology','phylum':'Zoology',
  'development-biology':'Zoology','human-biology-diseases':'Zoology',
  'human-physiology':'Zoology','genetics':'Zoology',
  'basic-component-life':'Botany','plant-physiology':'Botany',
}
function getTopicDomain(t) {
  if (DOMAIN_MAP[t.id]) return DOMAIN_MAP[t.id]
  if (t.subject==='Physics')   return 'Physics'
  if (t.subject==='Chemistry') return 'Chemistry'
  return 'MAT'
}

const SUBJECT_COLORS = {
  Zoology:'#0d9488', Botany:'#16a34a', Physics:'#d97706',
  Chemistry:'#7c3aed', MAT:'#e11d48',
}
const SUBJECT_ORDER = ['All','Zoology','Botany','Physics','Chemistry','MAT']
const CEE_DATE = new Date(2026,7,20)

const adKey = (d=new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`

/* ── Sidebar icons ── */
const I = {
  dashboard:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  practice:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  mock:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  stats:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  history:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M2 12h2"/></svg>,
  tracker:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  fire:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-4.32 0-8-3.59-8-8.16 0-2.94 1.49-5.93 4.13-8.3A28.2 28.2 0 0112 3c1.17 1.08 2.65 2.6 3.87 4.54C18.51 11.07 20 13.9 20 14.84 20 19.41 16.32 23 12 23z"/></svg>,
  logout:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  target:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  clock:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  revise:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
}

/* ── Get quiz progress from localStorage ── */
function getQuizProgress(uid, id) {
  try {
    const s = JSON.parse(localStorage.getItem(`nepalprep-quiz-${uid}-${id}`) || 'null')
    if (!s) return null
    const done = (s.correctCount||0) + (s.wrongCount||0)
    if (done===0) return null
    return {
      done, total:s.totalQuestions||0,
      correct:s.correctCount||0,
      accuracy:Math.round((s.correctCount||0)/done*100),
      savedAt:s.savedAt,
      daysSince: s.savedAt ? Math.floor((Date.now()-new Date(s.savedAt))/(864e5)) : null,
    }
  } catch { return null }
}

/* ── Priority calculation — lower thresholds so bad accuracy = HIGH ── */
function calcPriority(quiz, done) {
  if (done) return 'done'
  if (!quiz) return 'unstarted'
  const accScore = (100 - quiz.accuracy) / 100          // 0=great, 1=terrible
  const ageScore = Math.min((quiz.daysSince||0) / 14, 1) // 0=fresh, 1=stale
  const score    = accScore * 0.65 + ageScore * 0.35
  if (score >= 0.50) return 'high'    // 13% acc → score 0.57 → HIGH ✓
  if (score >= 0.28) return 'medium'
  return 'low'
}

const PRIORITY_ORDER = { high:0, medium:1, unstarted:2, low:3, done:4 }
const PRIORITY_LABEL = { high:'High', medium:'Medium', low:'Low', unstarted:'Not started', done:'Done' }
const PRIORITY_COLOR = { high:'#ef4444', medium:'#f59e0b', low:'#22c55e', unstarted:'var(--text-subtle)', done:'var(--primary)' }

/* ── Aggregate quiz data across subtopics for parent chapters ── */
function getAggregatedQuiz(uid, t) {
  if (t.hasSubtopics && t.subtopics?.length) {
    const subs = t.subtopics.map(s => getQuizProgress(uid, s.id)).filter(Boolean)
    if (!subs.length) return null
    const totalDone    = subs.reduce((a, p) => a + p.done, 0)
    const totalCorrect = subs.reduce((a, p) => a + p.correct, 0)
    const totalQs      = t.subtopics.reduce((a, s) => a + (s.questionCount||0), 0)
    const minDays      = Math.min(...subs.map(p => p.daysSince ?? 999))
    return {
      done: totalDone, total: totalQs, correct: totalCorrect,
      accuracy: totalDone > 0 ? Math.round(totalCorrect / totalDone * 100) : 0,
      daysSince: minDays < 999 ? minDays : null,
    }
  }
  return getQuizProgress(uid, t.id)
}

/* ── Build flat topic list with enriched data ── */
function buildTopics(uid, trackerTopics={}) {
  const rows = []
  for (const t of ceeTopics) {
    if (t.comingSoon) continue
    const subject = getTopicDomain(t)
    const td   = trackerTopics[t.id] || {}
    const quiz = getAggregatedQuiz(uid, t)
    const pri  = calcPriority(quiz, td.done)
    const isOverdue = td.deadline && td.deadline < adKey() && !td.done
    const revisionDue = quiz?.daysSince != null && quiz.daysSince >= 7 && !td.done
    const totalQs = t.hasSubtopics
      ? t.subtopics.reduce((a, s) => a + (s.questionCount||0), 0)
      : (t.questionCount||0)
    rows.push({ ...t, subject, quiz, priority:pri, td, isOverdue, revisionDue, totalQs })
  }
  return rows
}

/* ──────────────────────────────────────────────
   COMPONENT
────────────────────────────────────────────── */
export default function Tracker() {
  const { user, logout } = useAuth()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [loading,      setLoading]      = useState(true)
  const [trackerData,  setTrackerData]  = useState({ examDate:'', topics:{}, todayPlan:{} })
  const [activeSubject,setActiveSubject]= useState('All')
  const [sortBy,       setSortBy]       = useState('priority')
  const [editingDate,  setEditingDate]  = useState(false)
  const [planPickerOpen,setPlanPickerOpen] = useState(false)

  const today = adKey()
  const todayPlan = trackerData.todayPlan?.[today] || []

  /* Load from Firestore */
  useEffect(()=>{
    document.title = 'Study Planner — NepalPrep'
    const load = async () => {
      try {
        const snap = await getDoc(doc(db,'trackers',user.uid))
        if (snap.exists()) setTrackerData(snap.data())
      } catch(e){ console.error(e) }
      setLoading(false)
    }
    load()
  },[user])

  /* Save to Firestore */
  const save = useCallback(async (data) => {
    try { await setDoc(doc(db,'trackers',user.uid), data) }
    catch(e){ console.error(e) }
  },[user])

  const updateData = (fn) => {
    setTrackerData(prev => {
      const next = fn(prev)
      save(next)
      return next
    })
  }

  /* All topics with enriched data */
  const allTopics = useMemo(()=>buildTopics(user?.uid, trackerData.topics),[user?.uid, trackerData.topics])

  /* Summary stats */
  // "Done" = either manually marked OR quiz is 100% complete
  const doneCount      = allTopics.filter(t=>t.td.done || (t.quiz && t.totalQs > 0 && t.quiz.done >= t.totalQs)).length
  const totalCount     = allTopics.length
  const highPriCount   = allTopics.filter(t=>t.priority==='high').length
  const revisionCount  = allTopics.filter(t=>t.revisionDue).length
  const daysLeft       = trackerData.examDate
    ? Math.max(0, Math.ceil((new Date(trackerData.examDate)-Date.now())/864e5))
    : Math.ceil((CEE_DATE - Date.now())/864e5)
  const undone         = totalCount - doneCount
  // Show days-per-topic when < 1 topic/day (more intuitive for chapter-level planning)
  const rawRate        = daysLeft > 0 ? undone / daysLeft : 0
  const paceLabel      = rawRate >= 1
    ? `${rawRate.toFixed(1)}/day`
    : undone > 0 && daysLeft > 0
      ? `1 per ${Math.round(daysLeft/undone)}d`
      : '—'

  /* Filtered + sorted topic rows */
  const rows = useMemo(()=>{
    let list = allTopics
    if (activeSubject !== 'All') list = list.filter(t=>t.subject===activeSubject)
    return [...list].sort((a,b)=>{
      if (sortBy==='priority') return PRIORITY_ORDER[a.priority]-PRIORITY_ORDER[b.priority]
      if (sortBy==='accuracy') {
        const aa=a.quiz?.accuracy??101, ba=b.quiz?.accuracy??101
        return aa-ba
      }
      if (sortBy==='lastStudied') {
        const ad=a.quiz?.daysSince??999, bd=b.quiz?.daysSince??999
        return ad-bd
      }
      if (sortBy==='deadline') {
        const ad=a.td.deadline||'9', bd=b.td.deadline||'9'
        return ad.localeCompare(bd)
      }
      return 0
    })
  },[allTopics, activeSubject, sortBy])

  /* Today's plan topics */
  const planTopics = useMemo(()=>
    todayPlan.map(id=>allTopics.find(t=>t.id===id)).filter(Boolean)
  ,[todayPlan, allTopics])

  /* Actions */
  const setExamDate = (date) => updateData(p=>({...p, examDate:date}))
  const toggleDone  = (id)   => updateData(p=>({...p, topics:{...p.topics,[id]:{...(p.topics[id]||{}),done:!(p.topics[id]?.done)}}}))
  const setDeadline = (id,d) => updateData(p=>({...p, topics:{...p.topics,[id]:{...(p.topics[id]||{}),deadline:d}}}))

  const addToToday  = (id) => {
    if (todayPlan.includes(id)) return
    updateData(p=>({...p, todayPlan:{...(p.todayPlan||{}),[today]:[...(p.todayPlan?.[today]||[]),id]}}))
    setPlanPickerOpen(false)
  }
  const removeFromToday = (id) => updateData(p=>({
    ...p, todayPlan:{...(p.todayPlan||{}),[today]:(p.todayPlan?.[today]||[]).filter(x=>x!==id)}
  }))

  const handleLogout = async () => { await logout(); navigate('/') }

  const sidebarLinks = [
    { section:'STUDY' },
    { to:'/dashboard',          icon:I.dashboard, label:'Dashboard' },
    { to:'/dashboard#practice', icon:I.practice,  label:'Practice', hash:true },
    { to:'/mock-exam',          icon:I.mock,       label:'Mock Exam' },
    { section:'TRACK' },
    { to:'/stats',              icon:I.stats,      label:'Stats' },
    { to:'/history',            icon:I.history,    label:'History' },
    { to:'/tracker',            icon:I.tracker,    label:'Study Tracker' },
  ]

  if (loading) return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}/>
      <main className={styles.main}><div className={styles.loadingScreen}>Loading your planner…</div></main>
    </div>
  )

  return (
    <div className={styles.layout}>

      {/* ═══ SIDEBAR ═══ */}
      {sidebarOpen && <div className={styles.sidebarOverlay} onClick={()=>setSidebarOpen(false)}/>}
      <aside className={`${styles.sidebar} ${sidebarOpen?styles.sidebarOpen:''}`}>
        <div className={styles.sidebarTop}>
          <Link to="/" className={styles.sidebarLogo}><span className={styles.logoAccent}>Nepal</span>Prep</Link>
          <button className={styles.sidebarClose} onClick={()=>setSidebarOpen(false)}>{I.close}</button>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarLinks.map((item,i)=>
            item.section ? <p key={i} className={styles.sidebarSection}>{item.section}</p> : (
              <NavLink key={item.to} to={item.to} end={item.to==='/dashboard'}
                className={({isActive})=>`${styles.sidebarLink}${isActive&&!item.hash?' '+styles.sidebarLinkActive:''}`}
                onClick={()=>setSidebarOpen(false)}>
                <span className={styles.sidebarIcon}>{item.icon}</span>{item.label}
              </NavLink>
            )
          )}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarThemeRow}>
            <span className={styles.sidebarThemeLabel}>{dark?'Dark mode':'Light mode'}</span>
            <ThemeToggle/>
          </div>
          <button className={styles.sidebarLogout} onClick={handleLogout}>{I.logout}<span>Sign out</span></button>
        </div>
      </aside>

      {/* ═══ MOBILE HEADER ═══ */}
      <div className={styles.mobileHeader}>
        <button className={styles.menuBtn} onClick={()=>setSidebarOpen(true)}>{I.menu}</button>
        <span className={styles.mobileLogoText}><span className={styles.logoAccent}>Nepal</span>Prep</span>
        <ThemeToggle/>
      </div>

      {/* ═══ MAIN ═══ */}
      <main className={styles.main}>
        <div className={styles.inner}>

          {/* ── Page header ── */}
          <div className={styles.pageHead}>
            <div>
              <h1 className={styles.pageTitle}>Study Planner</h1>
              <p className={styles.pageSub}>Plan daily, track progress, get smarter about what to study next</p>
            </div>
            <div className={styles.examDateBlock}>
              {editingDate ? (
                <input type="date" className={styles.dateInput} defaultValue={trackerData.examDate}
                  min={today} autoFocus onBlur={()=>setEditingDate(false)}
                  onChange={e=>{setExamDate(e.target.value);setEditingDate(false)}}/>
              ) : (
                <button className={styles.examDateBtn} onClick={()=>setEditingDate(true)}>
                  <span className={styles.examDaysNum}>{daysLeft}</span>
                  <span className={styles.examDaysLabel}>days to CEE</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Stat banner ── */}
          <div className={styles.statBanner}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{doneCount}<span className={styles.statOf}>/{totalCount}</span></span>
              <span className={styles.statLabel}>Topics done</span>
              <div className={styles.miniBar}><div className={styles.miniBarFill} style={{width:`${Math.round(doneCount/totalCount*100)}%`}}/></div>
            </div>
            <div className={styles.statDivider}/>
            <div className={styles.statItem}>
              <span className={styles.statVal} style={{color:'#f59e0b'}}>{paceLabel}</span>
              <span className={styles.statLabel}>Study pace</span>
              <span className={styles.statHint}>{undone} chapters left · {daysLeft}d to go</span>
            </div>
            <div className={styles.statDivider}/>
            <div className={styles.statItem}>
              <span className={styles.statVal} style={{color:'#ef4444'}}>{highPriCount}</span>
              <span className={styles.statLabel}>High priority</span>
              <span className={styles.statHint}>low accuracy / not practiced</span>
            </div>
            <div className={styles.statDivider}/>
            <div className={styles.statItem}>
              <span className={styles.statVal} style={{color:'#a78bfa'}}>{revisionCount}</span>
              <span className={styles.statLabel}>Due for revision</span>
              <span className={styles.statHint}>not studied in 7+ days</span>
            </div>
          </div>

          {/* ── Today's Focus ── */}
          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Today&apos;s Focus</h2>
              <span className={styles.sectionMeta}>{planTopics.filter(t=>t.td.done).length}/{planTopics.length} done today</span>
              <button className={styles.addPlanBtn} onClick={()=>setPlanPickerOpen(v=>!v)}>
                {I.plus} Add topic
              </button>
            </div>

            {/* Topic picker dropdown */}
            {planPickerOpen && (
              <div className={styles.planPicker}>
                <div className={styles.planPickerHead}>Pick topics to study today</div>
                {allTopics.filter(t=>!todayPlan.includes(t.id)&&!t.td.done)
                  .sort((a,b)=>PRIORITY_ORDER[a.priority]-PRIORITY_ORDER[b.priority])
                  .slice(0,20)
                  .map(t=>(
                    <button key={t.id} className={styles.planPickerRow} onClick={()=>addToToday(t.id)}>
                      <span className={styles.planPickerDot} style={{background:SUBJECT_COLORS[t.subject]||'var(--primary)'}}/>
                      <span className={styles.planPickerName}>{t.name}</span>
                      <span className={styles.planPickerSub}>{t.subject}</span>
                      <span className={styles.planPickerPri} style={{color:PRIORITY_COLOR[t.priority]}}>{PRIORITY_LABEL[t.priority]}</span>
                    </button>
                  ))
                }
              </div>
            )}

            {planTopics.length===0 ? (
              <div className={styles.planEmpty}>
                <span>{I.target}</span>
                <p>No topics planned yet. Add topics you want to focus on today.</p>
              </div>
            ) : (
              <div className={styles.planGrid}>
                {planTopics.map(t=>{
                  const col = SUBJECT_COLORS[t.subject]||'var(--primary)'
                  const done = t.td.done
                  return (
                    <div key={t.id} className={`${styles.planCard} ${done?styles.planCardDone:''}`}
                      style={{'--sc':col}}>
                      <div className={styles.planCardTop}>
                        <span className={styles.planCardSubject} style={{color:col}}>{t.subject}</span>
                        <button className={styles.planCardRemove} onClick={()=>removeFromToday(t.id)}>×</button>
                      </div>
                      <div className={styles.planCardName}>{t.name}</div>
                      {t.quiz && (
                        <div className={styles.planCardMeta}>
                          <span>{t.quiz.done}/{t.quiz.total} Qs</span>
                          <span style={{color:t.quiz.accuracy>=60?'#22c55e':t.quiz.accuracy>=40?'#f59e0b':'#ef4444'}}>
                            {t.quiz.accuracy}% acc
                          </span>
                        </div>
                      )}
                      <button
                        className={`${styles.planCardCheck} ${done?styles.planCardCheckDone:''}`}
                        onClick={()=>toggleDone(t.id)}>
                        {done ? <>{I.check} Done</> : 'Mark done'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Topic Master Table ── */}
          <div className={styles.section}>
            <div className={styles.tableHead}>
              <div className={styles.subjectTabs}>
                {SUBJECT_ORDER.map(s=>(
                  <button key={s}
                    className={`${styles.subTab}${activeSubject===s?' '+styles.subTabActive:''}`}
                    style={activeSubject===s&&s!=='All'?{'--sc':SUBJECT_COLORS[s]}:{}}
                    onClick={()=>setActiveSubject(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <div className={styles.sortRow}>
                <span className={styles.sortLabel}>Sort:</span>
                {[
                  ['priority','Priority'],
                  ['accuracy','Accuracy'],
                  ['lastStudied','Recent'],
                  ['deadline','Deadline'],
                ].map(([v,l])=>(
                  <button key={v}
                    className={`${styles.sortBtn}${sortBy===v?' '+styles.sortBtnActive:''}`}
                    onClick={()=>setSortBy(v)}>{l}</button>
                ))}
              </div>
            </div>

            <div className={styles.topicTable}>
              {/* Header */}
              <div className={styles.topicTableHead}>
                <span>Topic</span>
                <span>Priority</span>
                <span>Questions</span>
                <span>Accuracy</span>
                <span>Last Studied</span>
                <span>Status</span>
              </div>

              {rows.map(t=>{
                const col  = SUBJECT_COLORS[t.subject]||'var(--primary)'
                const pCol = PRIORITY_COLOR[t.priority]
                return (
                  <div key={t.id}
                    className={`${styles.topicRow}
                      ${t.isOverdue?styles.rowOverdue:''}
                      ${t.td.done?styles.rowDone:''}
                      ${t.revisionDue&&!t.td.done?styles.rowRevision:''}`}>

                    <div className={styles.rowName}>
                      <span className={styles.rowSubjectDot} style={{background:col}}/>
                      <div className={styles.rowNameInner}>
                        <span className={styles.rowTitle}>{t.name}</span>
                        <div className={styles.rowMeta}>
                          <span className={styles.rowSubject}>{t.subject}</span>
                          {t.td.deadline && (
                            <span className={styles.rowDeadlineBadge}>
                              {I.clock}
                              {t.isOverdue ? 'Overdue' : `Due ${t.td.deadline}`}
                            </span>
                          )}
                        </div>
                        {t.quiz && t.totalQs > 0 && (
                          <div className={styles.rowMiniBar}>
                            <div className={styles.rowMiniBarFill}
                              style={{width:`${Math.min(100,Math.round(t.quiz.done/t.totalQs*100))}%`,
                                background: SUBJECT_COLORS[t.subject] || 'var(--primary)'}}/>
                          </div>
                        )}
                      </div>
                      {t.revisionDue && !t.td.done && (
                        <span className={styles.revisionBadge} title="Not studied in 7+ days">{I.revise} Revise</span>
                      )}
                      {todayPlan.includes(t.id) && (
                        <span className={styles.todayBadge}>Today</span>
                      )}
                    </div>

                    <div className={styles.rowPriority}>
                      <span className={styles.priDot} style={{background:pCol}}/>
                      <span style={{color:pCol, fontSize:'0.72rem', fontWeight:700}}>{PRIORITY_LABEL[t.priority]}</span>
                    </div>

                    <div className={styles.rowQs}>
                      {t.quiz ? (
                        <>
                          <span className={styles.qsDone}>{t.quiz.done}</span>
                          <span className={styles.qsTotal}>/{t.totalQs}</span>
                        </>
                      ) : (
                        <span className={styles.qsTotal}>0/{t.totalQs}</span>
                      )}
                    </div>

                    <div className={styles.rowAcc}>
                      {t.quiz ? (
                        <span className={styles.accVal} style={{color:t.quiz.accuracy>=60?'#22c55e':t.quiz.accuracy>=40?'#f59e0b':'#ef4444'}}>
                          {t.quiz.accuracy}%
                        </span>
                      ) : <span className={styles.dash}>—</span>}
                    </div>

                    <div className={styles.rowLast}>
                      {t.quiz?.daysSince!=null ? (
                        <span className={t.quiz.daysSince>=7?styles.stale:styles.fresh}>
                          {t.quiz.daysSince===0?'Today':t.quiz.daysSince===1?'Yesterday':`${t.quiz.daysSince}d ago`}
                        </span>
                      ) : <span className={styles.dash}>—</span>}
                    </div>

                    <div className={styles.rowStatus}>
                      <input type="date" className={`${styles.deadlineInput}${t.isOverdue?' '+styles.deadlineOverdue:''}`}
                        value={t.td.deadline||''} min={today}
                        onChange={e=>setDeadline(t.id,e.target.value)}/>
                      <button
                        className={`${styles.doneBtn}${t.td.done?' '+styles.doneBtnOn:''}`}
                        onClick={()=>toggleDone(t.id)}>
                        {t.td.done ? <>{I.check} Done</> : 'Mark done'}
                      </button>
                      {!todayPlan.includes(t.id)&&!t.td.done&&(
                        <button className={styles.planBtn} onClick={()=>addToToday(t.id)}
                          title="Add to today's plan">+ Plan</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {rows.length===0&&(
              <div className={styles.emptyFilter}>No topics match this filter.</div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}