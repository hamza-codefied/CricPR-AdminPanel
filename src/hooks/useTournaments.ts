import { useQuery } from '@tanstack/react-query'
import { tournamentsApi, type TournamentsParams } from '../services/tournamentsApi'

/**
 * Custom hook for tournaments data with filters and pagination
 */
export function useTournaments(params: TournamentsParams = {}) {
  // Create a stable query key that properly serializes params
  // This ensures React Query refetches when any param changes
  const queryKey = [
    'tournaments',
    params.page || 1,
    params.limit || 20,
    params.sortBy || '',
  ]

  const tournamentsQuery = useQuery({
    queryKey,
    queryFn: () => tournamentsApi.getTournaments(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    tournamentsData: tournamentsQuery.data,
    isLoading: tournamentsQuery.isLoading,
    isError: tournamentsQuery.isError,
    error: tournamentsQuery.error,
    refetch: tournamentsQuery.refetch,
  }
}

