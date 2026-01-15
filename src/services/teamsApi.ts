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

export interface TeamPlayer {
  playerId: string
  playerName: string
  playerProfilePic: string | null
  playerRole: string
  battingStyle: string
  bowlingStyle: string
  matches: number
  runs: number
  wickets: number
  highestScore: number
  bestBowling: string | null
  economy: number
  average: number
  strikeRate: number
}

export interface TeamMatch {
  title: string
  date: string
  status: string
  result: string | null
}

export interface TeamDetail {
  teamId: string
  teamName: string
  teamLogo: string | null
  teamCaptain: string
  teamCaptainId: string
  teamCountry: string | null
  teamCity: string
  matchesPlayed: number
  wins: number
  losses: number
  winRate: number
  totalRuns: number
  totalPlayers: number
  totalWickets: number
  highestScore: number
  players: TeamPlayer[]
  matches: TeamMatch[]
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

  /**
   * Get team details by ID
   */
  getTeamById: async (teamId: string): Promise<TeamDetail> => {
    try {
      const response = await api.get<TeamDetail>(
        `/admin/teamDetails/${teamId}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Delete team by ID
   */
  deleteTeam: async (teamId: string): Promise<void> => {
    try {
      await api.delete(`/admin/teams/${teamId}`)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

