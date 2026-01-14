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

export interface TopTalentTeam {
  _id: string
  logo: string
  players: string[]
  name: string
  location: string
  captain: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TopTalentPlayer {
  playerId: string
  name: string
  city: string
  playingRole: string
  teams: TopTalentTeam[]
  stats: {
    runs: number
    strikeRate: number
    wickets: number
    economy: number
    average: number
  }
}

export interface TopTalentResponse {
  results: TopTalentPlayer[]
  page: number
  limit: number
  totalResults: number
  totalPages: number
}

export interface TopTalentParams {
  role?: string
  city?: string
  page?: number
  limit?: number
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

  /**
   * Get top talent players
   */
  getTopTalent: async (params: TopTalentParams = {}): Promise<TopTalentResponse> => {
    try {
      const queryParams = new URLSearchParams()
      if (params.role) queryParams.append('role', params.role)
      if (params.city) queryParams.append('city', params.city)
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())

      const response = await api.get<TopTalentResponse>(
        `/admin/topTalent?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

