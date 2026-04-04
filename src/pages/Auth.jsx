import { useState } from 'react'
import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,   // ADD THIS
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase'
import styles from './Auth.module.css'

/* Reuse ECG path from landing page for visual continuity */
const ECG = 'M0,50 L30,50 C35,50 38,43 41,43 C44,43 46,50 49,50 L58,50 L60,54 L63,12 L66,74 L69,44 L72,50 L82,50 C86,50 90,35 94,35 C98,35 101,50 104,50 L200,50 L230,50 C235,50 238,43 241,43 C244,43 246,50 249,50 L258,50 L260,54 L263,12 L266,74 L269,44 L272,50 L282,50 C286,50 290,35 294,35 C298,35 301,50 304,50 L400,50 L430,50 C435,50 438,43 441,43 C444,43 446,50 449,50 L458,50 L460,54 L463,12 L466,74 L469,44 L472,50 L482,50 C486,50 490,35 494,35 C498,35 501,50 504,50 L600,50'

export default function Auth({ mode }) {
  const isLogin = mode === 'login'
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const exam = searchParams.get('exam') || 'cee'

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  // Must be AFTER hooks — Rules of Hooks require no conditional returns before hook calls
  if (authLoading) return null                              // AuthContext spinner handles this
  if (user) return <Navigate to="/dashboard" replace />    // Already logged in → dashboard

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password)
        // Don't navigate manually — the `if (user)` guard at the top of this
        // component will redirect once onAuthStateChanged fires with the new user.
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password)
        await updateProfile(user, { displayName: form.name })
        await setDoc(doc(db, 'users', user.uid), {
          name: form.name,
          email: form.email,
          createdAt: new Date(),
          preferredExam: exam,
        })
        await sendEmailVerification(user)   // ADD THIS
        navigate('/verify-email')           // CHANGE THIS (was '/dashboard')
      }
    } catch (err) {
      setError(getFriendlyError(err.code))
    }
    setLoading(false)
  }


  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
        preferredExam: exam,
      }, { merge: true })
      // Don't navigate manually — `if (user)` guard above will redirect
      // once onAuthStateChanged fires, avoiding the blank-screen race condition.
    } catch (err) {
      setError(getFriendlyError(err.code))
    }
    setLoading(false)
  }

  return (
    <div className={styles.root}>
      {/* Subtle ECG background — ties to landing page */}
      <div className={styles.ecgBg}>
        <svg className={styles.ecgFullSvg} viewBox="0 0 600 100" preserveAspectRatio="xMidYMid slice">
          <path id="ecgAuthPath" d={ECG} className={styles.ecgPath} />
          {/* Glowing dot that follows the ECG curve */}
          <circle r="3" className={styles.pulseDot}>
            <animateMotion dur="14s" repeatCount="indefinite">
              <mpath href="#ecgAuthPath" />
            </animateMotion>
          </circle>
        </svg>
      </div>

      <div className={styles.card}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoBlue}>Nepal</span>Prep
        </Link>
        <Link to="/" className={styles.backHome}>← Back to home</Link>

        <h1 className={styles.title}>{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        <p className={styles.sub}>
          {isLogin
            ? 'Log in to continue your preparation.'
            : 'Start preparing for CEE for free.'}
        </p>

        <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
          </svg>
          Continue with Google
        </button>

        <div className={styles.divider}><span>or</span></div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.field}>
              <label>Full name</label>
              <input
                type="text"
                placeholder=""
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <div className={styles.pwWrap}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder={isLogin ? '••••••••' : 'At least 6 characters'}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPw(v => !v)}
                tabIndex={-1}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          {isLogin && (
            <button
              type="button"
              className={styles.forgotBtn}
              onClick={async () => {
                if (!form.email) { setError('Enter your email first, then click Forgot password.'); return }
                try {
                  await sendPasswordResetEmail(auth, form.email)
                  setError('')
                  alert('Password reset email sent! Check your inbox.')
                } catch (err) {
                  setError(getFriendlyError(err.code))
                }
              }}
            >
              Forgot password?
            </button>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className={styles.switch}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link to={isLogin ? '/signup' : '/login'}>
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </p>
      </div>
    </div>
  )
}

function getFriendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'This email is already registered. Try logging in.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}
