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

export interface TournamentMatchTeam {
  id: string
  name: string
  logo: string | null
}

export interface TournamentMatchResult {
  winningTeamId: string
  winningTeamName: string
  winningTeamScore: number
  winningTeamWickets: number
  winningTeamOvers: number
  losingTeamScore: number
  losingTeamWickets: number
  losingTeamOvers: number
}

export interface TournamentMatchConfig {
  _id: string
  overs: number
  matchType: string
  ballType: string
  pitchType: string
  createdAt: string
}

export interface TournamentMatchStage {
  id: string
  name: string
  stageOrder: number
}

export interface TournamentMatchGroup {
  id: string
  name: string
}

export interface TournamentMatch {
  matchId: string
  matchNumber: number
  stage: TournamentMatchStage
  group: TournamentMatchGroup | null
  teamA: TournamentMatchTeam
  teamB: TournamentMatchTeam
  matchConfig: TournamentMatchConfig
  location: string
  status: string
  startDateTime: string
  endDateTime: string
  result: TournamentMatchResult | null
}

export interface TournamentStageGroupTeam {
  _id: string
  tournamentId: string
  stageId: string
  groupId: string
  teamId: {
    _id: string
    logo: string | null
    name: string
    location: string
    captain: string
  }
  tournamentTeamId: {
    _id: string
    tournamentId: string
    teamId: string
    registrationStatus: string
  }
  status: string
  assignedDate: string
}

export interface TournamentStageGroup {
  _id: string
  groupName: string
  groupOrder: number
  currentTeamsCount: number
  status: string
  teams: TournamentStageGroupTeam[]
  matches: any[]
}

export interface TournamentStage {
  _id: string
  tournamentId: string
  name: string
  stageOrder: number
  format: string
  status: string
  hasGroups: boolean
  numberOfGroups: number
  groups: TournamentStageGroup[]
}

export interface TournamentMatchesFixtures {
  results: TournamentStage[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface TournamentPointsTableTeam {
  tournamentId: string
  stageId: string
  groupId: string | null
  teamId: {
    logo: string | null
    name: string
    location: string
    id: string
  }
  tournamentTeamId: string
  position: number
  matchesPlayed: number
  matchesWon: number
  matchesLost: number
  matchesDrawn: number
  matchesNoResult: number
  points: number
  netRunRate: number
  totalRunsScored: number
  totalRunsConceded: number
  totalOversPlayed: number
  totalOversFaced: number
  totalWicketsLost: number
  totalWicketsTaken: number
  highestScore: number
  lowestScore: number
  winStreak: number
  form: string
  qualificationStatus: string
  tieBreakingFactor: number
  superOverWins: number
  superOverLosses: number
  id: string
}

export interface TournamentPointsTableGroup {
  _id: string
  groupName: string
  groupOrder: number
  currentTeamsCount: number
  status: string
  pointsTable: TournamentPointsTableTeam[]
}

export interface TournamentPointsTableStage {
  _id: string
  name: string
  format: string
  status: string
  hasGroups: boolean
  pointsForWin: number
  pointsForDraw: number
  pointsForLoss: number
  groups: TournamentPointsTableGroup[]
  pointsTable?: TournamentPointsTableTeam[]
}

export interface TournamentPointsTable {
  tournament: {
    _id: string
    name: string
    format: string
    status: string
  }
  stages: TournamentPointsTableStage[]
}

export interface TournamentDetail {
  tournamentId: string
  tournamentName: string
  startDate: string
  endDate: string
  status: string
  tournamentLogo: string | null
  tournamentBanner: string | null
  totalMatches: number
  totalTeams: number
  matchesPlayed: TournamentMatch[]
  matchesFixtures: TournamentMatchesFixtures
  pointsTable: TournamentPointsTable
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

  /**
   * Get tournament details by ID
   */
  getTournamentById: async (tournamentId: string): Promise<TournamentDetail> => {
    try {
      const response = await api.get<TournamentDetail>(
        `/admin/tournaments/${tournamentId}`
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Delete tournament by ID
   */
  deleteTournament: async (tournamentId: string): Promise<void> => {
    try {
      await api.delete(`/admin/tournaments/${tournamentId}`)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

