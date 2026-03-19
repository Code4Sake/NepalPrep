import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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

export default function Auth({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const exam = searchParams.get('exam') || 'cee'

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password)
        navigate('/dashboard')
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
      navigate('/dashboard')
    } catch (err) {
      setError(getFriendlyError(err.code))
    }
    setLoading(false)
  }

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoBlue}>Nepal</span>Prep
        </Link>

        <h1 className={styles.title}>{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        <p className={styles.sub}>
          {isLogin
            ? 'Log in to continue your preparation.'
            : 'Start preparing for CEE & IOE for free.'}
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder={isLogin ? '••••••••' : 'At least 6 characters'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
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
