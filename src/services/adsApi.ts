import api, { handleApiError } from './api'

export interface AdsStatusResponse {
  showAndroidAds: boolean
  showIOSAds: boolean
}

/** Partial payload: send one or both flags, or {} for no change */
export interface UpdateAdsStatusPayload {
  showAndroidAds?: boolean
  showIOSAds?: boolean
}

export const adsApi = {
  /**
   * Get ads status for iOS and Android
   */
  getAdsStatus: async (): Promise<AdsStatusResponse> => {
    try {
      const response = await api.get<AdsStatusResponse>('/admin/ads/status')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Update ads status. Send one flag, both, or {} for no change.
   */
  updateAdsStatus: async (payload: UpdateAdsStatusPayload): Promise<AdsStatusResponse> => {
    try {
      const response = await api.post<AdsStatusResponse>('/admin/ads/status', payload)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
