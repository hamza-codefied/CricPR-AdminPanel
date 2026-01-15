import { Navigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useAuthStore } from '../store/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, token, tokenExpiry } = useAuthStore()

  // Check if token is expired
  const isTokenValid = useMemo(() => {
    if (!token || !tokenExpiry) {
      return false
    }
    try {
      const expiryDate = new Date(tokenExpiry)
      const now = new Date()
      // Add a small buffer (5 seconds) to account for clock differences
      return expiryDate.getTime() > (now.getTime() + 5000)
    } catch (error) {
      console.error('Error parsing token expiry:', error)
      return false
    }
  }, [token, tokenExpiry])

  if (!isAuthenticated || !token || !isTokenValid) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

