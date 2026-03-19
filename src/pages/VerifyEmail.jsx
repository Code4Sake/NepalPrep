import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'

export default function VerifyEmail() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    await sendEmailVerification(user)
    setResent(true)
  }

  const handleContinue = async () => {
    await user.reload()
    if (user.emailVerified) {
      navigate('/dashboard')
    } else {
      alert('Email not verified yet. Please check your inbox.')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
      <h1>Verify your email ✉️</h1>
      <p>We sent a verification link to <strong>{user?.email}</strong></p>
      <p>Check your inbox and click the link, then come back here.</p>
      <button onClick={handleContinue} style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '999px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
        I've verified, continue →
      </button>
      <button onClick={handleResend} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: '600', cursor: 'pointer' }}>
        {resent ? 'Email sent!' : 'Resend email'}
      </button>
    </div>
  )
}