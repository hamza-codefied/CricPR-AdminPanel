import api, { handleApiError } from './api'

// Types
export interface Tournament {
  tournamentId: string
  name: string
  startDate: string
  endDate: string
  status: string
  totalMatches: number
  totalTeams: number
}

export interface TournamentsResponse {
  results: Tournament[]
  page: number
  limit: number
  totalResults: number
  totalPages: number
}

export interface TournamentsParams {
  page?: number
  limit?: number
  sortBy?: string
}

// Tournaments API functions
export const tournamentsApi = {
  /**
   * Get all tournaments with filters and pagination
   */
  getTournaments: async (params: TournamentsParams = {}): Promise<TournamentsResponse> => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)

      const response = await api.get<TournamentsResponse>(
        `/admin/tournaments?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

