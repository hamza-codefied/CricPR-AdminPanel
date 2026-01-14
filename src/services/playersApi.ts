import api, { handleApiError } from './api'

// Types
export interface Player {
  playerId: string
  name: string
  teams: Array<{
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
  }>
  city: string
  playingRole: string
  battingStyle: string
  bowlingStyle: string
  isWicketKeeper: boolean
  matches: number
  runs: number
  wickets: number
  strikeRate: number
  average: number
  economy: number
}

export interface PlayersResponse {
  results: Player[]
  page: number
  limit: number
  totalResults: number
  totalPages: number
}

export interface PlayersParams {
  page?: number
  limit?: number
  name?: string
  city?: string
  battingStyle?: string
  bowlingStyle?: string
  role?: string
}

// Players API functions
export const playersApi = {
  /**
   * Get all players with filters and pagination
   */
  getPlayers: async (params: PlayersParams = {}): Promise<PlayersResponse> => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.name) queryParams.append('name', params.name)
      if (params.city) queryParams.append('city', params.city)
      if (params.battingStyle) queryParams.append('battingStyle', params.battingStyle)
      if (params.bowlingStyle) queryParams.append('bowlingStyle', params.bowlingStyle)
      if (params.role) queryParams.append('role', params.role)

      const response = await api.get<PlayersResponse>(
        `/admin/players?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

