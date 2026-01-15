import { useQuery } from '@tanstack/react-query'
import { statsApi } from '../services/statsApi'

/**
 * Custom hook for stats data
 */
export function useStats() {
  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: () => statsApi.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    statsData: statsQuery.data,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
    error: statsQuery.error,
    refetch: statsQuery.refetch,
  }
}

