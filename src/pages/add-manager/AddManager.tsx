import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/common/PageHeader'
import { Switch } from '../../components/ui/switch'
import { Smartphone, Apple, Loader2 } from 'lucide-react'
import { useAdsStatus } from '../../hooks/useAdsStatus'
import { useToast } from '../../components/ui/toast'

export function AddManager() {
  const { addToast } = useToast()
  const { adsStatus, isLoading, isError, error, updateAdsStatus, isUpdating } = useAdsStatus()

  const handleIosChange = async (checked: boolean) => {
    try {
      await updateAdsStatus({ showIOSAds: checked })
      addToast({ title: 'Updated', description: checked ? 'iOS ads are now shown.' : 'iOS ads are now hidden.', variant: 'default' })
    } catch (e) {
      addToast({
        title: 'Update failed',
        description: e instanceof Error ? e.message : 'Could not update iOS ads status.',
        variant: 'destructive',
      })
    }
  }

  const handleAndroidChange = async (checked: boolean) => {
    try {
      await updateAdsStatus({ showAndroidAds: checked })
      addToast({ title: 'Updated', description: checked ? 'Android ads are now shown.' : 'Android ads are now hidden.', variant: 'default' })
    } catch (e) {
      addToast({
        title: 'Update failed',
        description: e instanceof Error ? e.message : 'Could not update Android ads status.',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Add Manager"
          description="Add a manager for iOS and Android platforms"
        />
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Add Manager"
          description="Add a manager for iOS and Android platforms"
        />
        <Card>
          <CardContent className="py-8 text-center text-destructive">
            <p className="font-medium">
              {error instanceof Error ? error.message : 'Failed to load ads status'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const showIOSAds = adsStatus?.showIOSAds ?? false
  const showAndroidAds = adsStatus?.showAndroidAds ?? false

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Manager"
        description="Add a manager for iOS and Android platforms"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Platform toggles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-borderShadcn/50 p-4">
            <div className="flex items-center gap-3 flex-1">
              <Apple className="h-6 w-6 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">iOS</span>
                <span className="text-xs text-muted-foreground">
                  {showIOSAds ? 'Ads shown on iOS' : 'Ads hidden on iOS'}
                </span>
              </div>
            </div>
            <Switch
              checked={showIOSAds}
              onCheckedChange={handleIosChange}
              aria-label="Toggle iOS ads"
              disabled={isUpdating}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border border-borderShadcn/50 p-4">
            <div className="flex items-center gap-3 flex-1">
              <Smartphone className="h-6 w-6 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">Android</span>
                <span className="text-xs text-muted-foreground">
                  {showAndroidAds ? 'Ads shown on Android' : 'Ads hidden on Android'}
                </span>
              </div>
            </div>
            <Switch
              checked={showAndroidAds}
              onCheckedChange={handleAndroidChange}
              aria-label="Toggle Android ads"
              disabled={isUpdating}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
