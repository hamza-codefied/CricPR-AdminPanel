import api, { handleApiError } from './api'

// Types
export interface LoginRequest {
  email: string
  password: string
}

export interface UserRole {
  _id: string
  name: string
  permissions: Array<{
    _id: string
    resource: string
    action: string
    __v: number
  }>
  __v: number
}

export interface User {
  id: string
  name: string
  gender: string
  email: string
  roles: UserRole[]
  isEmailVerified: boolean
  isPhoneVerified: boolean
  provider: string
  status: string
  fcmToken: string | null
}

export interface Token {
  token: string
  expires: string
}

export interface LoginResponse {
  user: User
  tokens: {
    access: Token
    refresh: Token
  }
}

// Auth API functions
export const authApi = {
  /**
   * Admin login
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        '/auth/adminLogin',
        credentials
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ access: Token }> => {
    try {
      const response = await api.post<{ access: Token }>(
        '/auth/refresh',
        { refreshToken }
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Logout (if needed on backend)
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // Even if logout fails on backend, we still logout on frontend
      console.error('Logout error:', error)
    }
  },
}

