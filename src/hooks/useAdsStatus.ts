import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adsApi, type UpdateAdsStatusPayload } from '../services/adsApi'

export function useAdsStatus() {
  const queryClient = useQueryClient()
  const adsStatusQuery = useQuery({
    queryKey: ['adsStatus'],
    queryFn: () => adsApi.getAdsStatus(),
  })

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateAdsStatusPayload) => adsApi.updateAdsStatus(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['adsStatus'], data)
    },
  })

  return {
    adsStatus: adsStatusQuery.data,
    isLoading: adsStatusQuery.isLoading,
    isError: adsStatusQuery.isError,
    error: adsStatusQuery.error,
    refetch: adsStatusQuery.refetch,
    updateAdsStatus: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  }
}
