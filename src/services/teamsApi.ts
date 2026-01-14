import api, { handleApiError } from './api'

// Types
export interface Team {
  teamId: string
  teamName: string
  captainName: string
  captainId: string
  country: string | null
  city: string
  matches: number
  wins: number
  losses: number
  totalRuns: number
  totalWickets: number
}

export interface TeamsResponse {
  results: Team[]
  page: number
  limit: number
  totalResults: number
  totalPages: number
}

export interface TeamsParams {
  page?: number
  limit?: number
  name?: string
  city?: string
  sortBy?: string
}

// Teams API functions
export const teamsApi = {
  /**
   * Get all teams with filters and pagination
   */
  getTeams: async (params: TeamsParams = {}): Promise<TeamsResponse> => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.name) queryParams.append('name', params.name)
      if (params.city) queryParams.append('city', params.city)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)

      const response = await api.get<TeamsResponse>(
        `/admin/teams?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

