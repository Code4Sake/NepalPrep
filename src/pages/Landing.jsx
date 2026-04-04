import { useState, useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import styles from './Landing.module.css'

/* ── Realistic ECG path with smooth bezier curves ── */
const ECG = 'M0,50 L30,50 C35,50 38,43 41,43 C44,43 46,50 49,50 L58,50 L60,54 L63,12 L66,74 L69,44 L72,50 L82,50 C86,50 90,35 94,35 C98,35 101,50 104,50 L200,50 L230,50 C235,50 238,43 241,43 C244,43 246,50 249,50 L258,50 L260,54 L263,12 L266,74 L269,44 L272,50 L282,50 C286,50 290,35 294,35 C298,35 301,50 304,50 L400,50 L430,50 C435,50 438,43 441,43 C444,43 446,50 449,50 L458,50 L460,54 L463,12 L466,74 L469,44 L472,50 L482,50 C486,50 490,35 494,35 C498,35 501,50 504,50 L600,50 L630,50 C635,50 638,43 641,43 C644,43 646,50 649,50 L658,50 L660,54 L663,12 L666,74 L669,44 L672,50 L682,50 C686,50 690,35 694,35 C698,35 701,50 704,50 L800,50 L830,50 C835,50 838,43 841,43 C844,43 846,50 849,50 L858,50 L860,54 L863,12 L866,74 L869,44 L872,50 L882,50 C886,50 890,35 894,35 C898,35 901,50 904,50 L1000,50'

const SAMPLE_Q = {
  q: 'Which organelle is known as the powerhouse of the cell?',
  options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus'],
  answer: 2,
  explanation: 'Mitochondria produce ATP through aerobic respiration \u2014 the cell\u2019s primary energy currency.',
}

const DOMAINS = [
  { name: 'Zoology', qs: 40 },
  { name: 'Botany', qs: 40 },
  { name: 'Chemistry', qs: 50 },
  { name: 'Physics', qs: 50 },
  { name: 'MAT', qs: 20 },
]

function countUp(el, target, dur = 2200) {
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1)
    const e = 1 - Math.pow(2, -10 * p)
    el.textContent = Math.round(target * e).toLocaleString()
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ── Interactive Stethoscope ── */
function Stethoscope({ className }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg viewBox="0 0 140 220" fill="none" style={{ width: '100%', height: '100%' }}>
        {/* Earpiece arch */}
        <path
          d="M40,20 Q40,62 60,70 Q80,62 80,20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: hover ? 'scaleX(1.08)' : 'scaleX(1)',
            transformOrigin: '60px 45px',
          }}
        />
        {/* Left earpiece */}
        <ellipse cx="38" cy="16" rx="7" ry="10" stroke="currentColor" strokeWidth="3" fill="none"
          style={{ transform: `rotate(${hover ? -10 : -5}deg)`, transformOrigin: '38px 16px', transition: 'transform 0.4s' }}
        />
        {/* Right earpiece */}
        <ellipse cx="82" cy="16" rx="7" ry="10" stroke="currentColor" strokeWidth="3" fill="none"
          style={{ transform: `rotate(${hover ? 10 : 5}deg)`, transformOrigin: '82px 16px', transition: 'transform 0.4s' }}
        />
        {/* Main tube */}
        <path
          d={hover ? "M60,70 C54,105 66,130 60,155" : "M60,70 C60,105 60,130 60,155"}
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          style={{ transition: 'd 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
        {/* Bell connector */}
        <path d="M60,155 L60,164" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        {/* Chest piece outer */}
        <circle cx="60" cy="190" r="28" stroke="currentColor" strokeWidth="3.5"
          style={{
            transition: 'all 0.4s',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            transformOrigin: '60px 190px',
          }}
        />
        {/* Inner ring */}
        <circle cx="60" cy="190" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        {/* Diaphragm pulse */}
        <circle cx="60" cy="190" r="12" fill="currentColor" opacity="0.08">
          <animate attributeName="r" values="10;15;10" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.06;0.18;0.06" dur="1.5s" repeatCount="indefinite" />
        </circle>
        {/* Pulse ring */}
        <circle cx="60" cy="190" r="28" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0"
          style={{ transformOrigin: '60px 190px' }}
        >
          <animate attributeName="r" values="28;42" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

export default function Landing() {
  const { user } = useAuth()
  const [selected, setSelected] = useState(null)
  const statsRef = useRef(null)
  const statsTriggered = useRef(false)

  /* SEO: set page title + meta description */
  useEffect(() => {
    document.title = 'NepalPrep — Free CEE Entrance Exam Preparation'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', "Nepal's free CEE entrance exam preparation platform. Practice 1,000+ topic-wise MCQs, take mock exams, and track your progress for medical entrance.")
    }
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !statsTriggered.current) {
        statsTriggered.current = true
        el.querySelectorAll('[data-target]').forEach((n) => countUp(n, parseInt(n.dataset.target)))
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (user) return <Navigate to="/dashboard" replace />

  const pick = (i) => { if (selected === null) setSelected(i) }

  const line1 = 'Crack the'
  const line2 = 'CEE'

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        {/* Continuous hospital-monitor ECG */}
        <div className={styles.ecgWrap}>
          <div className={styles.ecgTrack}>
            <svg className={styles.ecgSvg} viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d={ECG} className={styles.ecgPath} />
            </svg>
            <svg className={styles.ecgSvg} viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d={ECG} className={styles.ecgPath} />
            </svg>
          </div>
          {/* Sweep line (hospital monitor effect) */}
          <div className={styles.ecgSweep} />
        </div>

        <h1 className={styles.heroTitle}>
          {line1.split('').map((c, i) => (
            <span key={i} className={styles.char} style={{ animationDelay: `${0.3 + i * 0.04}s` }}>
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
          <br />
          {line2.split('').map((c, i) => (
            <span key={`b${i}`} className={`${styles.char} ${styles.heroAccent}`}
              style={{ animationDelay: `${0.3 + (line1.length + i) * 0.04}s` }}
            >{c}</span>
          ))}
        </h1>

        <p className={styles.heroSub}>1,000+ questions. Zero cost.</p>
        <p className={styles.heroBody}>The free practice platform built for Nepali medical students.</p>

        <Link to="/signup" className={styles.heroCta}>
          Start Practicing
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* ═══ STETHOSCOPE + DEMO ═══ */}
      <section className={styles.demoSection}>
        <p className={styles.demoLabel}>
          <svg className={styles.demoLabelIcon} viewBox="0 0 140 220" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M40,20 Q40,62 60,70 Q80,62 80,20" />
            <ellipse cx="38" cy="16" rx="7" ry="10" strokeWidth="3" fill="none" />
            <ellipse cx="82" cy="16" rx="7" ry="10" strokeWidth="3" fill="none" />
            <path d="M60,70 C60,105 60,130 60,155" strokeWidth="4.5" />
            <path d="M60,155 L60,164" strokeWidth="6" />
            <circle cx="60" cy="190" r="28" strokeWidth="3.5" />
          </svg>
          Try a question
        </p>

        <div className={styles.demoRow}>
          {/* Stethoscope - prominent and interactive */}
          <Stethoscope className={styles.stethoscope} />

          {/* Clipboard */}
          <div className={styles.clipboard}>
            <div className={styles.clipTop}>
              <div className={styles.clipMetal} />
            </div>
            <div className={styles.clipPaper}>
              <div className={styles.marginNote}>pick one</div>
              <p className={styles.clipSubject}>Biology &middot; Cell Biology</p>
              <p className={styles.clipQuestion}>{SAMPLE_Q.q}</p>
              <div className={styles.clipOptions}>
                {SAMPLE_Q.options.map((opt, i) => (
                  <button key={i}
                    className={`${styles.clipOpt} ${selected === i
                      ? i === SAMPLE_Q.answer ? styles.clipCorrect : styles.clipWrong
                      : selected !== null && i === SAMPLE_Q.answer ? styles.clipCorrect : ''
                      }`}
                    onClick={() => pick(i)}
                  >
                    <span className={styles.clipLetter}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <p className={styles.clipFeedback}>
                  {selected === SAMPLE_Q.answer ? 'Correct! ' : 'Not quite. '}
                  {SAMPLE_Q.explanation}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className={styles.demoCaption}>This is what practice feels like.</p>
      </section>

      {/* ═══ EXAM STRUCTURE ═══ */}
      <section className={styles.examSection}>
        <h2 className={styles.examTitle}>
          <span className={styles.examNum}>200</span> questions.{' '}
          <span className={styles.examNum}>5</span> domains.
        </h2>
        <p className={styles.examNote}>know your exam</p>

        <div className={styles.domainList}>
          {DOMAINS.map((d) => (
            <div key={d.name} className={styles.domainItem}>
              <span className={styles.domainName}>{d.name}</span>
              <span className={styles.domainDivider} />
              <span className={styles.domainQs}>{d.qs}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={styles.statsGrid}>
          {[['1000', '+', 'Practice Questions'], ['10', '+', 'Chapters'], ['100', '%', 'Free Forever']].map(([num, suf, label]) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNum} data-target={num}>0</span>
              <span className={styles.statPlus}>{suf}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={styles.footer}>
        <div className={styles.footerEcg}>
          <svg viewBox="0 0 500 40" preserveAspectRatio="none" className={styles.footerEcgSvg}>
            <path d="M0,20 L120,20 C123,20 125,17 127,17 C129,17 131,20 133,20 L148,20 L150,22 L152,6 L154,34 L156,14 L159,20 L180,20 C183,20 186,14 189,14 C192,14 194,20 196,20 L300,20 L320,20 C323,20 325,17 327,17 C329,17 331,20 333,20 L348,20 L350,22 L352,6 L354,34 L356,14 L359,20 L380,20 C383,20 386,14 389,14 C392,14 394,20 396,20 L500,20" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.15" />
          </svg>
        </div>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoAccent}>Nepal</span>Prep
          </div>
          <p className={styles.footerText}>Free CEE preparation for every Nepali student.</p>
          <div className={styles.footerLinks}>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log in</Link>
          </div>

          <p className={styles.footerCopy}>© {new Date().getFullYear()} NepalPrep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
