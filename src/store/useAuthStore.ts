import { create } from 'zustand'
import type { UserRole } from '../services/authApi'

export interface User {
  id: string
  name: string
  email: string
  role: string
  roles?: UserRole[]
  gender?: string
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  provider?: string
  status?: string
  fcmToken?: string | null
  profilePhoto?: string | null
}

export interface AuthData {
  user: User
  token: string
  refreshToken?: string
  tokenExpiry?: string
}

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  tokenExpiry: string | null
  isAuthenticated: boolean
  setAuthData: (data: AuthData) => void
  updateUser: (updates: Partial<User>) => void
  logout: () => void
  checkTokenValidity: () => boolean
}

const loadAuthFromStorage = (): Partial<AuthState> => {
  try {
    const stored = localStorage.getItem('auth-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      const token = parsed.token || null
      const tokenExpiry = parsed.tokenExpiry || null
      
      // Check if token is expired
      if (token && tokenExpiry) {
        const expiryDate = new Date(tokenExpiry)
        const now = new Date()
        if (expiryDate <= now) {
          // Token expired, clear storage
          localStorage.removeItem('auth-storage')
          return { user: null, token: null, refreshToken: null, tokenExpiry: null, isAuthenticated: false }
        }
      }
      
      return {
        user: parsed.user || null,
        token: token,
        refreshToken: parsed.refreshToken || null,
        tokenExpiry: tokenExpiry,
        isAuthenticated: !!(token && parsed.user),
      }
    }
  } catch {
    // Ignore
  }
  return { user: null, token: null, refreshToken: null, tokenExpiry: null, isAuthenticated: false }
}

const saveAuthToStorage = (state: Partial<AuthState>) => {
  try {
    localStorage.setItem('auth-storage', JSON.stringify(state))
  } catch {
    // Ignore
  }
}

export const useAuthStore = create<AuthState>((set, get) => {
  const initialState = loadAuthFromStorage()
  
  return {
    ...initialState,
    user: initialState.user || null,
    token: initialState.token || null,
    refreshToken: initialState.refreshToken || null,
    tokenExpiry: initialState.tokenExpiry || null,
    isAuthenticated: initialState.isAuthenticated || false,
    
    setAuthData: (data: AuthData) => {
      const newState = {
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken || null,
        tokenExpiry: data.tokenExpiry || null,
        isAuthenticated: true,
      }
      saveAuthToStorage(newState)
      set(newState)
    },
    
    updateUser: (updates: Partial<User>) => {
      const state = get()
      if (state.user) {
        const updatedUser = { ...state.user, ...updates }
        const newState = {
          ...state,
          user: updatedUser,
        }
        saveAuthToStorage(newState)
        set(newState)
      }
    },
    
    logout: () => {
      const newState = {
        user: null,
        token: null,
        refreshToken: null,
        tokenExpiry: null,
        isAuthenticated: false,
      }
      localStorage.removeItem('auth-storage')
      set(newState)
    },
    
    checkTokenValidity: () => {
      const state = get()
      if (!state.token || !state.tokenExpiry) {
        return false
      }
      
      const expiryDate = new Date(state.tokenExpiry)
      const now = new Date()
      const isValid = expiryDate > now
      
      if (!isValid) {
        // Token expired, logout
        get().logout()
      }
      
      return isValid
    },
  }
})

