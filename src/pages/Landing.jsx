import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './Landing.module.css'

const FEATURES = [
  { icon: '⚡', tag: 'CEE · IOE', title: 'Topic-wise MCQs', desc: 'Thousands of past paper questions organized by subject and chapter. Practice exactly what you need.' },
  { icon: '🕐', tag: 'Timed · Realistic', title: 'Mock Exams', desc: 'Full-length timed exams that simulate real entrance conditions. Know where you stand before exam day.' },
  { icon: '📄', tag: 'All Years', title: 'Past Papers', desc: 'Every past year question paper in one place. Solve them online or download as PDF.' },
  { icon: '📊', tag: 'Smart Analytics', title: 'Progress Tracking', desc: 'See your weak topics, track improvement over time, and focus your study where it matters most.' },
]

const SAMPLE_Q = {
  q: 'Which organelle is known as the powerhouse of the cell?',
  options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus'],
  answer: 2,
  explanation: 'Mitochondria produce ATP through aerobic respiration — that\'s why they\'re called the powerhouse of the cell.',
}

export default function Landing() {
  const [selected, setSelected] = useState(null)

  const pick = (i) => {
    if (selected !== null) return
    setSelected(i)
  }

  return (
    <div className={styles.root}>
      <Navbar />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Free for all Nepal students
        </div>
        <h1 className={styles.heroTitle}>
          Crack <span className={styles.blue}>CEE</span> &amp; <span className={styles.blue}>IOE.</span>
        </h1>
        <p className={styles.heroSub}>
          Nepal's smartest entrance exam prep platform. Topic-wise MCQs,
          mock exams, past papers, and progress tracking — all in one place.
        </p>
        <div className={styles.heroCtas}>
          <Link to="/signup?exam=cee" className={styles.ctaPrimary}>Start CEE Prep →</Link>
          <Link to="/signup?exam=ioe" className={styles.ctaSecondary}>Start IOE Prep →</Link>
        </div>

        {/* Sample question card */}
        <div className={styles.qCard}>
          <div className={styles.qCardHeader}>
            <span className={styles.qBadge}>Biology · Cell Biology</span>
            <span className={styles.qNum}>Q.12</span>
          </div>
          <p className={styles.qText}>{SAMPLE_Q.q}</p>
          <div className={styles.qOptions}>
            {SAMPLE_Q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.qOpt} ${
                  selected === i
                    ? i === SAMPLE_Q.answer ? styles.correct : styles.wrong
                    : selected !== null && i === SAMPLE_Q.answer ? styles.correct : ''
                }`}
                onClick={() => pick(i)}
              >
                <span className={styles.qLetter}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <p className={styles.qFeedback}>
              {selected === SAMPLE_Q.answer ? '✅' : '❌'} {SAMPLE_Q.explanation}
            </p>
          )}
        </div>
      </section>

      {/* STATS */}
      <div className={styles.statsWrap}>
        <div className={styles.stats}>
          {[['5000+', 'Practice Questions'], ['2', 'Entrance Exams'], ['10+', 'Subjects'], ['100%', 'Free Forever']].map(([n, l]) => (
            <div key={l} className={styles.stat}>
              <span className={styles.statN}>{n}</span>
              <span className={styles.statL}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className={styles.section}>
        <p className={styles.secLabel}>Why NepalPrep</p>
        <h2 className={styles.secTitle}>Everything you need.<br />Nothing you don't.</h2>
        <div className={styles.featGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featCard}>
              <div className={styles.featIcon}>{f.icon}</div>
              <p className={styles.featTag}>{f.tag}</p>
              <h3 className={styles.featTitle}>{f.title}</h3>
              <p className={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={styles.section}>
        <p className={styles.secLabel}>The Process</p>
        <h2 className={styles.secTitle}>Three steps to<br />exam confidence.</h2>
        <div className={styles.steps}>
          {[
            ['01', 'Create a free account', 'Sign up in 30 seconds. No cost, no catch.'],
            ['02', 'Choose your exam', 'Select CEE for medical or IOE for engineering — or both.'],
            ['03', 'Start practicing', 'Dive into topic-wise MCQs, mock exams, and notes.'],
          ].map(([num, title, desc], i, arr) => (
            <div key={num} className={styles.step}>
              <div className={styles.stepNum}>{num}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </div>
              {i < arr.length - 1 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>
      </section>

      {/* EXAMS */}
      <div className={styles.examsWrap}>
        <div className={styles.examCard}>
          <span className={styles.examEmoji}>🩺</span>
          <div>
            <h3 className={styles.examName}>CEE — Medical</h3>
            <p className={styles.examDesc}>Biology, Physics, Chemistry & English for IOM, BPKIHS and other medical colleges.</p>
          </div>
          <Link to="/signup?exam=cee" className={styles.examBtn}>Prepare for CEE →</Link>
        </div>
        <span className={styles.examOr}>or</span>
        <div className={styles.examCard}>
          <span className={styles.examEmoji}>⚙️</span>
          <div>
            <h3 className={styles.examName}>IOE — Engineering</h3>
            <p className={styles.examDesc}>Mathematics, Physics, Chemistry & English for Pulchowk and affiliated colleges.</p>
          </div>
          <Link to="/signup?exam=ioe" className={styles.examBtn}>Prepare for IOE →</Link>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaWrap}>
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>Ready to start?</h2>
          <p className={styles.ctaSub}>Join thousands of Nepal students already preparing smarter.</p>
          <Link to="/signup" className={styles.ctaMainBtn}>Create Free Account →</Link>
          <p className={styles.ctaNote}>Always free</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <span className={styles.blue}>Nepal</span>Prep
        </div>
        <p className={styles.footerNote}>Built with ❤️ for Nepal students · CEE & IOE preparation</p>
        <div className={styles.footerLinks}>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  )
}
