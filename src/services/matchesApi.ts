import api, { handleApiError } from './api'

// Types
export interface Match {
  id: string
  title: string
  matchType: string
  tournamentName: string | null
  date: string
  location: string
  groundName: string
  status: string
  result: string | null
}

export interface MatchesResponse {
  results: Match[]
  page: number
  limit: number
  totalResults: number
  totalPages: number
}

export interface MatchesParams {
  page?: number
  limit?: number
  team_name?: string
  status?: string
}

// Matches API functions
export const matchesApi = {
  /**
   * Get all matches with filters and pagination
   */
  getMatches: async (params: MatchesParams = {}): Promise<MatchesResponse> => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.team_name) queryParams.append('team_name', params.team_name)
      if (params.status) queryParams.append('status', params.status)

      const response = await api.get<MatchesResponse>(
        `/admin/teamMatches?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

