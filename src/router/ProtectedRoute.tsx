import { Navigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useAuthStore } from '../store/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, checkTokenValidity, token, tokenExpiry } = useAuthStore()

  // Check token validity on mount
  useEffect(() => {
    if (token && tokenExpiry) {
      const isValid = checkTokenValidity()
      if (!isValid) {
        // Token expired, will be handled by store logout
        return
      }
    }
  }, []) // Only run on mount

  // Check if token is expired
  const isTokenValid = useMemo(() => {
    if (!token || !tokenExpiry) {
      return false
    }
    const expiryDate = new Date(tokenExpiry)
    const now = new Date()
    return expiryDate > now
  }, [token, tokenExpiry])

  if (!isAuthenticated || !token || !isTokenValid) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

