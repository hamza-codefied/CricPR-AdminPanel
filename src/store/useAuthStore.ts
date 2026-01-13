import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const loadAuthFromStorage = () => {
  try {
    const stored = localStorage.getItem('auth-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        user: parsed.user || null,
        token: parsed.token || null,
        isAuthenticated: parsed.isAuthenticated || false,
      }
    }
  } catch {
    // Ignore
  }
  return { user: null, token: null, isAuthenticated: false }
}

const saveAuthToStorage = (state: Partial<AuthState>) => {
  try {
    localStorage.setItem('auth-storage', JSON.stringify(state))
  } catch {
    // Ignore
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const initialState = loadAuthFromStorage()
  
  return {
    ...initialState,
    login: async (email: string, password: string) => {
      // Mock login - replace with actual API call
      if (email === 'admin@cricpr.com' && password === 'admin123') {
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@cricpr.com',
          role: 'admin',
        }
        const mockToken = 'mock-jwt-token-' + Date.now()
        
        const newState = {
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        }
        
        saveAuthToStorage(newState)
        set(newState)
      } else {
        throw new Error('Invalid credentials')
      }
    },
    logout: () => {
      const newState = {
        user: null,
        token: null,
        isAuthenticated: false,
      }
      saveAuthToStorage(newState)
      set(newState)
    },
  }
})

