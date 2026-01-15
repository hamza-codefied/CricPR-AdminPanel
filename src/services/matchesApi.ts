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

export interface BattingStat {
  playerName: string
  dismissal: string
  runs: number
  balls: number
  fours: number
  sixes: number
  strikeRate: number
  isNotOut: boolean
  hasBat: boolean
  minutesBatted: number
  playerId: string
}

export interface BowlingStat {
  playerName: string
  overs: number
  maidens: number
  runs: number
  noBalls: number
  wides: number
  dots: number
  wickets: number
  economy: number
  average: number
}

export interface ScorecardMatch {
  id: string
  title: string
  status: string
  startdatetime: string
  endDateTime: string
}

export interface TeamScorecard {
  teamName: string
  teamLogo: string | null
  runs: number
  wickets: number
  overs: string
  penalty: string | null
  totalOvers: number
  fallOfWickets: any[]
  battingStats: BattingStat[]
  bowlingStats: BowlingStat[]
}

export interface Scorecard {
  match: ScorecardMatch
  teams: TeamScorecard[]
}

export interface TeamScore {
  teamName: string
  teamLogo: string | null
  score: number
  wickets: number
  overs: string
}

export interface PlayerOfTheMatchBattingStats {
  runs: number
  balls: number
  fours: number
  sixes: number
  isNotOut: boolean
}

export interface PlayerOfTheMatchBowlingStats {
  overs: string
  maidens: number
  runs: number
  wickets: number
}

export interface PlayerOfTheMatch {
  playerName: string
  teamName: string
  playerImage: string | null
  battingStats: PlayerOfTheMatchBattingStats
  bowlingStats: PlayerOfTheMatchBowlingStats
}

export interface Summary {
  match: ScorecardMatch
  teamScores: TeamScore[]
  result: string
  playerOfTheMatch: PlayerOfTheMatch
}

export interface MatchDetail {
  matchTitle: string
  teamALogo: string | null
  teamBLogo: string | null
  status: string
  result: string | null
  tournamentName: string | null
  startDate: string
  startTime: string
  location: string
  ground: string
  scorecard: Scorecard
  summary: Summary
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
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get match details by ID
   */
  getMatchById: async (matchId: string): Promise<MatchDetail> => {
    try {
      const response = await api.get<MatchDetail>(
        `/admin/matchDetails/${matchId}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Delete match by ID
   */
  deleteMatch: async (matchId: string): Promise<void> => {
    try {
      await api.delete(`/admin/matches/${matchId}`)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

