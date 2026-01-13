import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/common/PageHeader'

export function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings page coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

