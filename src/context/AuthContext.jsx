import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext(null)

const loadingStyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#0a0908',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid rgba(255,255,255,0.06)',
    borderTop: '3px solid #0d9488',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
}

// Inject spin keyframes once
if (typeof document !== 'undefined' && !document.getElementById('auth-spin-style')) {
  const s = document.createElement('style')
  s.id = 'auth-spin-style'
  s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }'
  document.head.appendChild(s)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const logout = () => signOut(auth)

  if (loading) {
    return (
      <AuthContext.Provider value={{ user, loading, logout }}>
        <div style={loadingStyles.root}>
          <div style={loadingStyles.spinner} />
        </div>
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
