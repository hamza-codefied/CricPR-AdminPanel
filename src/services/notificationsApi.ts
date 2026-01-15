import api, { handleApiError } from './api'

// Types
export interface Notification {
  title: string
  body: string
  sendAt: string
}

export interface NotificationsResponse {
  results: Notification[]
  page: number
  limit: number
  totalResults: number
  totalPages: number
}

export interface NotificationsParams {
  page?: number
  limit?: number
}

export interface SendNotificationPayload {
  title: string
  body: string
  metadata?: Record<string, any>
  action?: string
  userIds?: string[] // Empty array [] for all users, array of IDs for selected users
}

// Notifications API functions
export const notificationsApi = {
  /**
   * Get all notifications with pagination
   */
  getNotifications: async (params: NotificationsParams = {}): Promise<NotificationsResponse> => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())

      const response = await api.get<NotificationsResponse>(
        `/admin/notifications?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Send notification to users
   */
  sendNotification: async (payload: SendNotificationPayload): Promise<void> => {
    try {
      await api.post('/admin/notifications/send', payload)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

