import { useState, useEffect, useMemo } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { ceeTopics } from '../data/questions'
import ThemeToggle from '../components/ThemeToggle'
import styles from './Stats.module.css'

/* ════════════════════════════════════════════════════════════
   Same DOMAIN_MAP as Dashboard — single source of truth
════════════════════════════════════════════════════════════ */
const DOMAIN_MAP = {
  'cell-biology': 'Zoology', 'animal-tissue': 'Zoology', 'phylum': 'Zoology',
  'development-biology': 'Zoology', 'human-biology-diseases': 'Zoology',
  'human-physiology': 'Zoology', 'genetics': 'Zoology',
  'basic-component-life': 'Botany', 'plant-physiology': 'Botany',
}
function getTopicDomain(topicId, subject) {
  if (DOMAIN_MAP[topicId]) return DOMAIN_MAP[topicId]
  if (subject === 'Physics')   return 'Physics'
  if (subject === 'Chemistry') return 'Chemistry'
  if (subject === 'English' || subject === 'Mathematics') return 'MAT'
  return 'Zoology'
}

const SUBJECT_ORDER = ['Zoology', 'Botany', 'Physics', 'Chemistry', 'MAT']
const SUBJECT_META = {
  Zoology:   { color: '#0d9488', label: 'Zoology' },
  Botany:    { color: '#16a34a', label: 'Botany' },
  Physics:   { color: '#d97706', label: 'Physics' },
  Chemistry: { color: '#7c3aed', label: 'Chemistry' },
  MAT:       { color: '#e11d48', label: 'MAT' },
}

/* ── Sidebar icons (copied from Dashboard) ── */
const I = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  practice:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  mock:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  stats:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  history:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M2 12h2"/></svg>,
  tracker:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  fire:      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-4.32 0-8-3.59-8-8.16 0-2.94 1.49-5.93 4.13-8.3A28.2 28.2 0 0112 3c1.17 1.08 2.65 2.6 3.87 4.54C18.51 11.07 20 13.9 20 14.84 20 19.41 16.32 23 12 23z"/></svg>,
  logout:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
}

/* ── Data helpers ─────────────────────────────────────────── */
const adKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`

function getTopicProgress(uid, id) {
  try {
    const s = JSON.parse(localStorage.getItem(`nepalprep-quiz-${uid}-${id}`) || 'null')
    if (!s) return null
    const done    = (s.correctCount||0) + (s.wrongCount||0)
    if (done === 0) return null
    const correct  = s.correctCount || 0
    const times    = s.questionTimes ? Object.values(s.questionTimes) : []
    const totalTime = times.reduce((a,b)=>a+b, 0)
    return { done, total:s.totalQuestions||0, correct, accuracy:Math.round(correct/done*100),
             avgTime:times.length?Math.round(totalTime/times.length):null, totalTime, savedAt:s.savedAt }
  } catch { return null }
}

function buildStats(uid) {
  const bySubject = {}    // subject → { topics: [...] }
  const intensityMap = {} // dateKey → count

  for (const t of ceeTopics) {
    if (t.comingSoon) continue
    const entries = t.hasSubtopics && t.subtopics
      ? t.subtopics.map(s=>({ id:s.id, name:s.name, totalQs:s.questionCount||0, parentId:t.id }))
      : [{ id:t.id, name:t.name, totalQs:t.questionCount||0, parentId:t.id }]

    // determine domain from parent topic id
    const domain = getTopicDomain(t.id, t.subject)
    if (!bySubject[domain]) bySubject[domain] = { topics:[], color: SUBJECT_META[domain]?.color||'var(--primary)' }

    for (const e of entries) {
      const p = getTopicProgress(uid, e.id)
      if (p?.savedAt) {
        const k = adKey(new Date(p.savedAt))
        intensityMap[k] = (intensityMap[k]||0) + (p.done||0)  // count questions, not topics
      }
      bySubject[domain].topics.push({ id:e.id, name:e.name, totalQs:e.totalQs, progress:p })
    }
  }
  return { bySubject, intensityMap }
}

function calcStreak(intensityMap) {
  let streak=0, d=new Date()
  while(true) {
    if(intensityMap[adKey(d)]){ streak++; d.setDate(d.getDate()-1) } else break
  }
  return streak
}

function fmtTime(s)  { if(!s)return'—'; if(s<60)return`${s}s`; const m=Math.floor(s/60),r=s%60; return r?`${m}m ${r}s`:`${m}m` }
function fmtTotal(s) {
  if(!s||s===0) return'—'
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), r=s%60
  if(h) return m?`${h}h ${m}m`:`${h}h`
  if(m) return r?`${m}m ${r}s`:`${m}m`
  return`${r}s`
}

const accColor = (a) => a==null?'var(--text-subtle)':a>=75?'#22c55e':a>=50?'#f59e0b':'#ef4444'

/* ── Heatmap ─────────────────────────────────────────────── */
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function buildHeatmap(intensityMap) {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - 364)
  start.setDate(start.getDate() - start.getDay())
  const weeks = [], allDays = []
  let week = [], cur = new Date(start)
  while (cur <= today) {
    const k = adKey(cur)
    const cell = { date:new Date(cur), k, count:intensityMap[k]||0 }
    week.push(cell); allDays.push(cell)
    if (cur.getDay()===6) { weeks.push(week); week=[] }
    cur.setDate(cur.getDate()+1)
  }
  if(week.length) weeks.push(week)
  return { weeks, allDays }
}

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export default function Stats() {
  const { user, logout } = useAuth()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tooltip, setTooltip]         = useState(null)
  const [activeTab, setActiveTab]      = useState(null) // subject tab

  useEffect(()=>{ document.title = 'Stats — NepalPrep' },[])

  const { bySubject, intensityMap } = useMemo(()=>buildStats(user?.uid),[user?.uid])
  const streak = useMemo(()=>calcStreak(intensityMap),[intensityMap])
  const { weeks: heatWeeks } = useMemo(()=>buildHeatmap(intensityMap),[intensityMap])

  // Overview totals across ALL subjects
  const allProgress = Object.values(bySubject).flatMap(s=>s.topics).map(t=>t.progress).filter(Boolean)
  const totalDone    = allProgress.reduce((a,p)=>a+p.done, 0)
  const totalCorrect = allProgress.reduce((a,p)=>a+p.correct, 0)
  const overallAcc   = totalDone>0 ? Math.round(totalCorrect/totalDone*100) : null
  const grandTime    = allProgress.reduce((a,p)=>a+(p.totalTime||0), 0)
  const topicsStarted = allProgress.length
  const totalStudyDays = Object.keys(intensityMap).length

  // Month labels — require ≥4 week gap to avoid overlap
  const monthLabels = useMemo(()=>{
    const labels=[]; let lastM=-1; let lastWi=-5
    heatWeeks.forEach((week,wi)=>{
      const d = week.find(c=>c)?.date; if(!d) return
      const m = d.getMonth()
      if(m!==lastM && wi-lastWi>=4){ labels.push({wi,label:MONTH_NAMES[m]}); lastM=m; lastWi=wi }
    })
    return labels
  },[heatWeeks])

  const handleLogout = async () => { await logout(); navigate('/') }

  const sidebarLinks = [
    { section: 'STUDY' },
    { to:'/dashboard',        icon:I.dashboard, label:'Dashboard' },
    { to:'/dashboard#practice', icon:I.practice, label:'Practice', hash:true },
    { to:'/mock-exam',        icon:I.mock,      label:'Mock Exam' },
    { section: 'TRACK' },
    { to:'/stats',            icon:I.stats,     label:'Stats' },
    { to:'/history',          icon:I.history,   label:'History' },
    { to:'/tracker',          icon:I.tracker,   label:'Study Tracker' },
  ]

  const subjects = SUBJECT_ORDER.filter(s => bySubject[s] || true) // show ALL 5 subjects always
  const resolvedTab = activeTab && subjects.includes(activeTab) ? activeTab : subjects[0]

  return (
    <div className={styles.layout}>

      {/* ═══ SIDEBAR (identical layout to Dashboard) ═══ */}
      {sidebarOpen && <div className={styles.sidebarOverlay} onClick={()=>setSidebarOpen(false)}/>}
      <aside className={`${styles.sidebar} ${sidebarOpen?styles.sidebarOpen:''}`}>
        <div className={styles.sidebarTop}>
          <Link to="/" className={styles.sidebarLogo}>
            <span className={styles.logoAccent}>Nepal</span>Prep
          </Link>
          <button className={styles.sidebarClose} onClick={()=>setSidebarOpen(false)}>{I.close}</button>
        </div>

        <nav className={styles.sidebarNav}>
          {sidebarLinks.map((item,i)=>
            item.section ? (
              <p key={i} className={styles.sidebarSection}>{item.section}</p>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to==='/dashboard'}
                className={({isActive})=>`${styles.sidebarLink}${isActive&&!item.hash?' '+styles.sidebarLinkActive:''}`}
                onClick={()=>setSidebarOpen(false)}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className={styles.sidebarBottom}>
          {streak>0 && (
            <div className={styles.streakCard}>
              <span className={styles.streakFire}>{I.fire}</span>
              <span className={styles.streakNum}>{streak}</span>
              <span className={styles.streakLabel}>day streak</span>
            </div>
          )}
          <div className={styles.sidebarThemeRow}>
            <span className={styles.sidebarThemeLabel}>{dark?'Dark mode':'Light mode'}</span>
            <ThemeToggle/>
          </div>
          <button className={styles.sidebarLogout} onClick={handleLogout}>
            {I.logout}
            <span>Sign out</span>
          </button>
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

          {/* Page heading */}
          <div className={styles.pageHead}>
            <h1 className={styles.pageTitle}>Charts &amp; Metrics</h1>
            <p className={styles.pageSub}>Your complete study analytics</p>
          </div>

          {totalDone===0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>No practice data yet</h3>
              <p className={styles.emptyText}>Start answering questions and your stats will appear here.</p>
              <Link to="/dashboard" className={styles.emptyBtn}>Start Practicing →</Link>
            </div>
          ) : (<>

            {/* ── 4 summary cards (unchanged — user likes these) ── */}
            <div className={styles.summaryRow}>
              <div className={styles.summaryCard} style={{'--cc':'var(--primary)'}}>
                <div className={styles.summaryLabel}>Questions Attempted</div>
                <div className={styles.summaryValue}>{totalDone}</div>
                <div className={styles.summaryMeta}>
                  <span className={styles.correct}>✓ {totalCorrect}</span>
                  <span className={styles.wrong}>✗ {totalDone-totalCorrect}</span>
                </div>
                <div className={styles.summaryBg} aria-hidden>
                  <svg viewBox="0 0 90 60" fill="none" width="90" height="60">
                    <polyline points="0,50 20,30 35,38 50,15 65,25 80,8" stroke="var(--primary)" strokeWidth="2" opacity="0.25"/>
                  </svg>
                </div>
              </div>
              <div className={styles.summaryCard} style={{'--cc':accColor(overallAcc)}}>
                <div className={styles.summaryLabel}>Current Accuracy</div>
                <div className={styles.summaryValue} style={{color:accColor(overallAcc)}}>{overallAcc!=null?`${overallAcc}%`:'—'}</div>
                <div className={styles.summaryMeta}>{topicsStarted} topics started</div>
                <div className={styles.summaryBg} aria-hidden>
                  <svg viewBox="0 0 90 60" fill="none" width="90" height="60">
                    <circle cx="65" cy="35" r="28" stroke="var(--cc)" strokeWidth="2" opacity="0.15"/>
                    <circle cx="65" cy="35" r="16" stroke="var(--cc)" strokeWidth="1.5" opacity="0.12"/>
                  </svg>
                </div>
              </div>
              <div className={styles.summaryCard} style={{'--cc':'#f05c48'}}>
                <div className={styles.summaryLabel}>Study Streak</div>
                <div className={styles.summaryValue}>{streak}</div>
                <div className={styles.summaryMeta}>{streak>0?'days in a row':'Study today to start'}</div>
                <div className={styles.summaryBgText} aria-hidden>🔥</div>
              </div>
              <div className={styles.summaryCard} style={{'--cc':'#a78bfa'}}>
                <div className={styles.summaryLabel}>Total Time Studied</div>
                <div className={styles.summaryValue}>{fmtTotal(grandTime)}</div>
                <div className={styles.summaryMeta}>{totalStudyDays} days active</div>
                <div className={styles.summaryBg} aria-hidden>
                  <svg viewBox="0 0 90 60" fill="none" width="90" height="60">
                    <circle cx="60" cy="32" r="22" stroke="#a78bfa" strokeWidth="2" opacity="0.18"/>
                    <path d="M60 14 L60 32 L72 32" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.22"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Activity Heatmap ── */}
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Activity</h2>
                <span className={styles.sectionMeta}>{totalDone} questions answered in the past year</span>
              </div>

              <div className={styles.heatmapOuter} data-heatmap>
                {/* Tooltip */}
                {tooltip && (
                  <div className={styles.tooltip} style={{left:tooltip.x, top:tooltip.y}}>
                    <strong>{tooltip.date.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</strong>
                    <span>{tooltip.count===0?'No activity':`${tooltip.count} question${tooltip.count!==1?'s':''} answered`}</span>
                  </div>
                )}

                <div className={styles.heatmapScroll}>
                  {/* Month labels */}
                  <div className={styles.monthRow}>
                    <div className={styles.dayLabelSpace}/>
                    <div className={styles.monthLabels}>
                      {monthLabels.map((ml,i)=>(
                        <span key={i} className={styles.monthLabel} style={{left:`${ml.wi*15}px`}}>{ml.label}</span>
                      ))}
                    </div>
                  </div>
                  {/* Grid */}
                  <div className={styles.heatBody}>
                    <div className={styles.dayLabels}>
                      <span/><span>Mon</span><span/><span>Wed</span><span/><span>Fri</span><span/>
                    </div>
                    <div className={styles.heatGrid}>
                      {heatWeeks.map((week,wi)=>(
                        <div key={wi} className={styles.heatWeek}>
                          {Array.from({length:7}).map((_,di)=>{
                            const cell=week[di]
                            if(!cell) return <div key={di} className={styles.heatCell} style={{opacity:0}}/>
                            const lvl=cell.count===0?0:cell.count<=5?1:cell.count<=20?2:3
                            return (
                              <div key={di}
                                className={`${styles.heatCell} ${styles[`heat${lvl}`]}`}
                                onMouseEnter={e=>{
                                  const r=e.currentTarget.getBoundingClientRect()
                                  const wr=e.currentTarget.closest('[data-heatmap]')?.getBoundingClientRect()
                                  setTooltip({x:r.left-(wr?.left||0)+r.width/2, y:r.top-(wr?.top||0)-50, date:cell.date, count:cell.count})
                                }}
                                onMouseLeave={()=>setTooltip(null)}
                              />
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Legend outside scroll — stays visible during horizontal scroll */}
                <div className={styles.heatLegend}>
                  <span>Less</span>
                  <div className={`${styles.heatCell} ${styles.heat0}`}/>
                  <div className={`${styles.heatCell} ${styles.heat1}`}/>
                  <div className={`${styles.heatCell} ${styles.heat2}`}/>
                  <div className={`${styles.heatCell} ${styles.heat3}`}/>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* ── Per-subject breakdown with tabs ── */}
            <div className={styles.section}>
              {/* Tab bar */}
              <div className={styles.tabBar}>
                {SUBJECT_ORDER.map(sName=> {
                  const { color } = SUBJECT_META[sName]||{ color:'var(--primary)' }
                  const sub = bySubject[sName]
                  const attempted = sub ? sub.topics.filter(t=>t.progress).length : 0
                  const isActive = resolvedTab === sName
                  return (
                    <button
                      key={sName}
                      className={`${styles.tab}${isActive?' '+styles.tabActive:''}`}
                      style={isActive?{'--tc':color}:{}}
                      onClick={()=>setActiveTab(sName)}
                    >
                      <span className={styles.tabName}>{sName}</span>
                      {attempted>0&&<span className={styles.tabBadge} style={isActive?{background:color,color:'#fff'}:{}}>{attempted}</span>}
                    </button>
                  )
                })}
              </div>

              {/* Active subject content */}
              {SUBJECT_ORDER.map(subjectName=>{
                if(subjectName!==resolvedTab) return null
                const sub = bySubject[subjectName]
                if (!sub) return (
                  <div key={subjectName} className={styles.empty} style={{padding:'2rem',textAlign:'center'}}>
                    <div className={styles.emptyIcon} style={{marginBottom:'0.75rem',opacity:0.4}}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                      </svg>
                    </div>
                    <p style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>No {subjectName} questions attempted yet.</p>
                  </div>
                )
                const { color } = SUBJECT_META[subjectName]||{ color:'var(--primary)' }
                const topics = sub.topics
                const attempted = topics.filter(t=>t.progress)
                const totalSubDone    = attempted.reduce((a,t)=>a+t.progress.done,0)
                const totalSubCorrect = attempted.reduce((a,t)=>a+t.progress.correct,0)
                const totalSubTime    = attempted.reduce((a,t)=>a+(t.progress.totalTime||0),0)
                const subAcc = totalSubDone>0?Math.round(totalSubCorrect/totalSubDone*100):null
                const timesArr = attempted.filter(t=>t.progress.avgTime!=null)
                const subAvgTime = timesArr.length
                  ? Math.round(timesArr.reduce((a,t)=>a+t.progress.avgTime,0)/timesArr.length)
                  : null

                return (
                  <div key={subjectName}>
                    {/* Subject meta line */}
                    <div className={styles.subjectHead}>
                      <span className={styles.subjectAccent} style={{background:color}}/>
                      <h2 className={styles.subjectTitle}>{subjectName}</h2>
                      <span className={styles.subjectCount}>{attempted.length}/{topics.length} topics attempted</span>
                    </div>

                    {/* Topic table */}
                    <div className={styles.topicTable}>
                      <div className={styles.topicTableHead}>
                        <span>Topic</span>
                        <span>Progress</span>
                        <span>Done</span>
                        <span>Accuracy</span>
                        <span>Avg Time</span>
                      </div>
                      {topics.map(t=>{
                        const p=t.progress
                        const pct=p&&t.totalQs>0?Math.round(p.done/t.totalQs*100):0
                        const barColor = pct > 0 ? color : 'var(--border)'
                        const accCol = p ? accColor(p.accuracy) : 'var(--text-subtle)'
                        return (
                          <div key={t.id} className={`${styles.topicRow}${!p?' '+styles.unseen:''}`}>
                            <span className={styles.topicName}>{t.name}</span>
                            <div className={styles.topicBarWrap}>
                              <div className={styles.topicBar} style={{width:`${pct}%`,background:barColor}}/>
                            </div>
                            <span className={styles.topicDone}>{p?`${p.done}/${t.totalQs}`:`0/${t.totalQs}`}</span>
                            <span className={styles.topicAcc} style={{color:accCol}}>{p?`${p.accuracy}%`:'—'}</span>
                            <span className={styles.topicTime}>{p?.avgTime?fmtTime(p.avgTime):'—'}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Subject totals */}
                    {attempted.length>0&&(
                      <div className={styles.subjectTotals}>
                        <div className={styles.subTotal}>
                          <span className={styles.subTotalLabel}>Total Attempts</span>
                          <span className={styles.subTotalValue}>{totalSubDone}</span>
                          <span className={styles.subTotalSub}>
                            <span style={{color:'#22c55e'}}>✓ {totalSubCorrect} correct</span>
                            {' '}<span style={{color:'#ef4444'}}>✗ {totalSubDone-totalSubCorrect} wrong</span>
                          </span>
                        </div>
                        <div className={styles.subTotal}>
                          <span className={styles.subTotalLabel}>Accuracy</span>
                          <span className={styles.subTotalValue} style={{color:accColor(subAcc)}}>{subAcc!=null?`${subAcc}%`:'—'}</span>
                          <span className={styles.subTotalSub}>{attempted.length} of {topics.length} topics</span>
                        </div>
                        <div className={styles.subTotal}>
                          <span className={styles.subTotalLabel}>Time Spent</span>
                          <span className={styles.subTotalValue}>{fmtTotal(totalSubTime)}</span>
                          <span className={styles.subTotalSub}>{topics.reduce((a,t)=>a+t.totalQs,0)} questions total</span>
                        </div>
                        <div className={styles.subTotal}>
                          <span className={styles.subTotalLabel}>Avg per Question</span>
                          <span className={styles.subTotalValue}>{fmtTime(subAvgTime)}</span>
                          <span className={styles.subTotalSub}>across all topics</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

          </>)}
        </div>
      </main>
    </div>
  )
}
