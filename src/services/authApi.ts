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
  gender?: string
  email: string
  roles: UserRole[]
  isEmailVerified: boolean
  isPhoneVerified: boolean
  provider?: string
  status?: string
  fcmToken?: string | null
  profilePhoto?: string | null
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
   * Admin logout
   */
  logout: async (refreshToken: string): Promise<void> => {
    try {
      await api.post('/admin/logout', { refreshToken })
    } catch (error) {
      // Even if logout fails on backend, we still logout on frontend
      console.error('Logout error:', error)
    }
  },

  /**
   * Edit admin name
   */
  editName: async (name: string): Promise<void> => {
    try {
      await api.patch('/admin/edit-name', { name })
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Edit admin profile photo
   */
  editProfilePhoto: async (file: File): Promise<void> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      // Axios will automatically set Content-Type with boundary for FormData
      await api.patch('/admin/edit-profilePhoto', formData)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Verify password
   */
  verifyPassword: async (currentPassword: string): Promise<{ success: boolean; message?: string; error?: string; code?: number }> => {
    try {
      const response = await api.post<{ success: boolean; message?: string; error?: string; code?: number }>('/admin/vp', { currentPassword })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Change password
   */
  changePassword: async (newPassword: string, confirmPassword: string): Promise<void> => {
    try {
      await api.patch('/admin/cp', { newPassword, confirmPassword })
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

