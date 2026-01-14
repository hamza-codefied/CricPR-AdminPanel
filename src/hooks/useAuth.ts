import { useMutation } from '@tanstack/react-query'
import { authApi } from '../services/authApi'
import type { LoginRequest, LoginResponse } from '../services/authApi'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

/**
 * Custom hook for authentication operations
 */
export function useAuth() {
  const navigate = useNavigate()
  const { setAuthData, logout: storeLogout } = useAuthStore()

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: LoginResponse) => {
      // Store auth data in Zustand store
      setAuthData({
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.roles[0]?.name || 'admin',
          roles: data.user.roles,
        },
        token: data.tokens.access.token,
        refreshToken: data.tokens.refresh.token,
        tokenExpiry: data.tokens.access.expires,
      })
    },
    onError: (error: Error) => {
      console.error('Login error:', error)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      storeLogout()
      navigate('/login')
    },
    onError: () => {
      // Even if logout fails on backend, logout on frontend
      storeLogout()
      navigate('/login')
    },
  })

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: () => logoutMutation.mutate(),
    isLoading: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error,
  }
}

