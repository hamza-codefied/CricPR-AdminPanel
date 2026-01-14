import api, { handleApiError } from './api'

// Types
export interface DashboardNumbersResponse {
  matches: {
    total: number
    percentChangeSinceLastMonth: number
  }
  tournaments: {
    total: number
    active: number
  }
  teams: {
    total: number
  }
  players: {
    total: number
    signupsLast30Days: number
  }
}

// Dashboard API functions
export const dashboardApi = {
  /**
   * Get dashboard analytics numbers
   */
  getDashboardNumbers: async (): Promise<DashboardNumbersResponse> => {
    try {
      const response = await api.get<DashboardNumbersResponse>(
        '/admin/dashboardNumbers'
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

