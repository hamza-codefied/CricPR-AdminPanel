import { useQuery } from '@tanstack/react-query'
import { teamsApi } from '../services/teamsApi'

/**
 * Custom hook for team details data
 */
export function useTeam(teamId: string | undefined) {
  const teamQuery = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => {
      if (!teamId) throw new Error('Team ID is required')
      return teamsApi.getTeamById(teamId)
    },
    enabled: !!teamId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    teamData: teamQuery.data,
    isLoading: teamQuery.isLoading,
    isError: teamQuery.isError,
    error: teamQuery.error,
    refetch: teamQuery.refetch,
  }
}

