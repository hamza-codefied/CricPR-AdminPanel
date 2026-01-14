import api, { handleApiError } from './api'

// Types
export interface PlayerMatch {
  matchTitle: string
  startDate: string
  runs: number
  wickets: number
}

export interface PlayerDetail {
  playerId: string
  name: string
  email: string
  phone: string
  city: string
  country: string | null
  playingRole: string
  battingStyle: string
  bowlingStyle: string
  teams: string[]
  matches: number
  runs: number
  wickets: number
  average: number
  economy: number
  strikeRate: number
  highestScore: number
  bestBowling: string
  matchesArray: PlayerMatch[]
}

// Player API functions
export const playerApi = {
  /**
   * Get player details by ID
   */
  getPlayerById: async (playerId: string): Promise<PlayerDetail> => {
    try {
      const response = await api.get<PlayerDetail>(
        `/admin/playerDetails/${playerId}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

