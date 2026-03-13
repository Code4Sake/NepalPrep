import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './PastPapers.module.css'

const PAPERS = {
  cee: [
    { year: 2023, exam: 'IOM', file: null },
    { year: 2023, exam: 'BPKIHS', file: null },
    { year: 2022, exam: 'IOM', file: null },
    { year: 2022, exam: 'BPKIHS', file: null },
    { year: 2021, exam: 'IOM', file: null },
    { year: 2020, exam: 'IOM', file: null },
  ],
  ioe: [
    { year: 2023, exam: 'Pulchowk', file: null },
    { year: 2022, exam: 'Pulchowk', file: null },
    { year: 2021, exam: 'Pulchowk', file: null },
    { year: 2020, exam: 'Pulchowk', file: null },
  ],
}

export default function PastPapers() {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Past Papers</h1>
          <p className={styles.sub}>Download and practice from real past year question papers.</p>
        </div>

        <section className={styles.section}>
          <div className={styles.secHeader}>
            <span className={styles.secEmoji}>🩺</span>
            <h2 className={styles.secTitle}>CEE — Medical</h2>
          </div>
          <div className={styles.grid}>
            {PAPERS.cee.map((p, i) => (
              <PaperCard key={i} paper={p} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.secHeader}>
            <span className={styles.secEmoji}>⚙️</span>
            <h2 className={styles.secTitle}>IOE — Engineering</h2>
          </div>
          <div className={styles.grid}>
            {PAPERS.ioe.map((p, i) => (
              <PaperCard key={i} paper={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PaperCard({ paper }) {
  return (
    <div className={`${styles.card} ${!paper.file ? styles.cardDisabled : ''}`}>
      <div className={styles.cardYear}>{paper.year}</div>
      <div className={styles.cardExam}>{paper.exam}</div>
      {paper.file ? (
        <a href={paper.file} download className={styles.downloadBtn}>
          ⬇ Download PDF
        </a>
      ) : (
        <span className={styles.comingSoon}>Coming soon</span>
      )}
    </div>
  )
}
