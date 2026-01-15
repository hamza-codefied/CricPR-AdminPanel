import { useQuery } from '@tanstack/react-query'
import { notificationsApi, type NotificationsParams } from '../services/notificationsApi'

/**
 * Custom hook for notifications data with pagination
 */
export function useNotifications(params: NotificationsParams = {}) {
  // Create a stable query key that properly serializes params
  // This ensures React Query refetches when any param changes
  const queryKey = [
    'notifications',
    params.page || 1,
    params.limit || 10,
  ]

  const notificationsQuery = useQuery({
    queryKey,
    queryFn: () => notificationsApi.getNotifications(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  })

  return {
    notificationsData: notificationsQuery.data,
    isLoading: notificationsQuery.isLoading,
    isError: notificationsQuery.isError,
    error: notificationsQuery.error,
    refetch: notificationsQuery.refetch,
  }
}

