import { useQuery } from '@tanstack/react-query'
import { dashboardApi, type TopTalentParams, type RecentMatchesParams } from '../services/dashboardApi'

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

/**
 * Custom hook for top talent data with filters and pagination
 */
export function useTopTalent(params: TopTalentParams) {
  // Create a stable query key that properly serializes params
  // This ensures React Query refetches when any param changes
  const queryKey = [
    'dashboard',
    'topTalent',
    params.role || '',
    params.city || '',
    params.page || 1,
    params.limit || 10,
  ]

  const topTalentQuery = useQuery({
    queryKey,
    queryFn: () => dashboardApi.getTopTalent(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    topTalentData: topTalentQuery.data,
    isLoading: topTalentQuery.isLoading,
    isError: topTalentQuery.isError,
    error: topTalentQuery.error,
    refetch: topTalentQuery.refetch,
  }
}

/**
 * Custom hook for recent matches data
 */
export function useRecentMatches(params: RecentMatchesParams = {}) {
  // Create a stable query key
  const queryKey = [
    'dashboard',
    'recentMatches',
    params.matches || 5,
    params.page || 1,
  ]

  const recentMatchesQuery = useQuery({
    queryKey,
    queryFn: () => dashboardApi.getRecentMatches(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    recentMatchesData: recentMatchesQuery.data,
    isLoading: recentMatchesQuery.isLoading,
    isError: recentMatchesQuery.isError,
    error: recentMatchesQuery.error,
    refetch: recentMatchesQuery.refetch,
  }
}

/**
 * Custom hook for recent user signups
 */
export function useRecentSignups() {
  const recentSignupsQuery = useQuery({
    queryKey: ['dashboard', 'recentSignups'],
    queryFn: () => dashboardApi.getRecentSignups(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    recentSignupsData: recentSignupsQuery.data,
    isLoading: recentSignupsQuery.isLoading,
    isError: recentSignupsQuery.isError,
    error: recentSignupsQuery.error,
    refetch: recentSignupsQuery.refetch,
  }
}

