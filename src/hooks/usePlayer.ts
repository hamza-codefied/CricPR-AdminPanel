import { useQuery } from '@tanstack/react-query'
import { playerApi } from '../services/playerApi'

/**
 * Custom hook for player details data
 */
export function usePlayer(playerId: string | undefined) {
  const playerQuery = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => {
      if (!playerId) throw new Error('Player ID is required')
      return playerApi.getPlayerById(playerId)
    },
    enabled: !!playerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    playerData: playerQuery.data,
    isLoading: playerQuery.isLoading,
    isError: playerQuery.isError,
    error: playerQuery.error,
    refetch: playerQuery.refetch,
  }
}

