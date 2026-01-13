import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Send } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select } from '../../components/ui/select'
import { PageHeader } from '../../components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { DataTable } from '../../components/common/DataTable'
import { Badge } from '../../components/ui/badge'
import { useToast } from '../../components/ui/toast'
import { mockNotifications } from '../../services/mockData'
import { format } from 'date-fns'

const notificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  target: z.enum(['all', 'selected']).optional(),
})

type NotificationFormData = z.infer<typeof notificationSchema>

export function Notifications() {
  const { addToast } = useToast()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      target: 'all',
    },
  })

  const onSubmit = async (data: NotificationFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const newNotification = {
        id: String(notifications.length + 1),
        title: data.title,
        message: data.message,
        imageUrl: data.imageUrl || '',
        sentAt: new Date().toISOString(),
        status: 'sent',
        totalReceivers: data.target === 'all' ? 5000 : 100,
      }
      
      setNotifications([newNotification, ...notifications])
      addToast({
        title: 'Success',
        description: 'Notification sent successfully',
        variant: 'success',
      })
      reset()
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to send notification',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'message', header: 'Message' },
    {
      key: 'sentAt',
      header: 'Sent At',
      render: (row: any) => format(new Date(row.sentAt), 'MMM dd, yyyy HH:mm'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <Badge variant={row.status === 'sent' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
    { key: 'totalReceivers', header: 'Receivers' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Push Notifications"
        description="Send notifications to app users"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" {...register('title')} />
                {errors.title && (
                  <p className="text-sm text-red">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <textarea
                  id="message"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-sm text-red">{errors.message.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input id="imageUrl" type="url" {...register('imageUrl')} />
                {errors.imageUrl && (
                  <p className="text-sm text-red">{errors.imageUrl.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target</Label>
                <Select
                  id="target"
                  {...register('target')}
                  placeholder="Select target"
                >
                  <option value="all">All Users</option>
                  <option value="selected">Selected Users</option>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                {isLoading ? 'Sending...' : 'Send Notification'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={notifications}
              columns={columns}
              searchKey="title"
              exportFilename="notification-logs"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

