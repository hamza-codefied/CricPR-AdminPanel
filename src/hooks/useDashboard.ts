import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../services/dashboardApi'

/**
 * Custom hook for dashboard data
 */
export function useDashboard() {
  const dashboardQuery = useQuery({
    queryKey: ['dashboard', 'numbers'],
    queryFn: () => dashboardApi.getDashboardNumbers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  return {
    dashboardData: dashboardQuery.data,
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
    error: dashboardQuery.error,
    refetch: dashboardQuery.refetch,
  }
}

