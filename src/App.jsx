import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import GoToTop from './components/GoToTop'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import History from './pages/History'
import MockExam from './pages/MockExam'
import PastPapers from './pages/PastPapers'
import Tracker from './pages/Tracker'
import VerifyEmail from './pages/VerifyEmail'

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])
  return null
}

function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', fontFamily: 'var(--font-sans)', textAlign: 'center', padding: '2rem',
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>😕</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        background: 'var(--primary)', color: '#fff', padding: '0.75rem 2rem',
        borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.95rem',
        textDecoration: 'none',
      }}>
        ← Go Home
      </Link>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth mode="login" key="login" />} />
      <Route path="/signup" element={<Auth mode="signup" key="signup" />} />
      <Route path="/past-papers" element={<PastPapers />} />

      {/* Protected */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      {/* key={location.key} forces Quiz to fully remount on every navigation, fixing the retry bug */}
      <Route path="/quiz/:exam/:topicId" element={<ProtectedRoute><Quiz key={location.key} /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/mock-exam" element={<ProtectedRoute><MockExam /></ProtectedRoute>} />
      <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
    <Route path="/verify-email" element={<VerifyEmail />} />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToHash />
          <AppRoutes />
          <GoToTop />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
