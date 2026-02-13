import { Navigate, Outlet } from 'react-router-dom'

const SESSION_KEY = 'adminAuth'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in ms

interface AdminSession {
  loggedIn: boolean
  timestamp: number
}

function isSessionValid(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return false

    const session: AdminSession = JSON.parse(raw)
    if (!session.loggedIn) return false

    const elapsed = Date.now() - session.timestamp
    if (elapsed > SESSION_DURATION) {
      localStorage.removeItem(SESSION_KEY)
      return false
    }

    return true
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return false
  }
}

export default function ProtectedRoute() {
  return isSessionValid() ? <Outlet /> : <Navigate to="/login" replace />
}
