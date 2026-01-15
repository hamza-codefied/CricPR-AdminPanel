import api, { handleApiError } from './api'

// Types
export interface TopRunScorer {
  runs: number
  matches: number
  name: string
  average: number
}

export interface TopWicketTaker {
  wickets: number
  matches: number
  name: string
  average: number
}

export interface BestBattingAverage {
  matches: number
  name: string
  totalRuns: number
  average: number
}

export interface BestBowlingAverage {
  wickets: number
  matches: number
  name: string
  average: number
}

export interface StatsResponse {
  totalSixes: number
  totalFours: number
  totalExtras: number
  highestTeamTotal: string
  topRunScorers: TopRunScorer[]
  topWicketTakers: TopWicketTaker[]
  bestBattingAverages: BestBattingAverage[]
  bestBowlingAverages: BestBowlingAverage[]
}

// Stats API functions
export const statsApi = {
  /**
   * Get statistics data
   */
  getStats: async (): Promise<StatsResponse> => {
    try {
      const response = await api.get<StatsResponse>('/admin/stats')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}

