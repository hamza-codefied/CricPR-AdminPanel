import { useState, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Send, ChevronLeft, ChevronRight, X, Users } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select } from '../../components/ui/select'
import { PageHeader } from '../../components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import { useToast } from '../../components/ui/toast'
import { useNotifications } from '../../hooks/useNotifications'
import { PlayerSelectionDialog } from '../../components/common/PlayerSelectionDialog'
import { notificationsApi, type SendNotificationPayload } from '../../services/notificationsApi'
import { usePlayers } from '../../hooks/usePlayers'
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
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([])
  const [playerDialogOpen, setPlayerDialogOpen] = useState(false)
  const limit = 10

  // Prepare API params
  const notificationsParams = useMemo(() => ({
    page: currentPage,
    limit: limit,
  }), [currentPage, limit])

  // Fetch notifications data
  const { notificationsData, isLoading: isLoadingNotifications, refetch: refetchNotifications } = useNotifications(notificationsParams)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      target: 'all',
    },
  })

  const targetValue = watch('target')

  // Clear selected players when target changes to "all"
  useEffect(() => {
    if (targetValue === 'all') {
      setSelectedPlayerIds([])
    }
  }, [targetValue])

  // Fetch player details for selected players to display names
  // We fetch a large page to get all players and filter client-side
  const selectedPlayersParams = useMemo(() => {
    if (selectedPlayerIds.length === 0) return { page: 1, limit: 1 }
    return { page: 1, limit: 1000 }
  }, [selectedPlayerIds.length])

  // Only fetch if we have selected players
  const { playersData: allPlayersData } = usePlayers(
    selectedPlayerIds.length > 0 ? selectedPlayersParams : { page: 1, limit: 1 }
  )

  // Get selected player names
  const selectedPlayers = useMemo(() => {
    if (!allPlayersData?.results || selectedPlayerIds.length === 0) return []
    return allPlayersData.results.filter((p) => selectedPlayerIds.includes(p.playerId))
  }, [allPlayersData, selectedPlayerIds])

  const onSubmit = async (data: NotificationFormData) => {
    setIsLoading(true)
    try {
      // Prepare payload
      const payload: SendNotificationPayload = {
        title: data.title,
        body: data.message,
        action: 'NONE',
        metadata: {},
        userIds: data.target === 'selected' ? selectedPlayerIds : [],
      }

      // Add optional metadata if imageUrl is provided
      if (data.imageUrl) {
        payload.metadata = { imageUrl: data.imageUrl }
      }

      await notificationsApi.sendNotification(payload)

      addToast({
        title: 'Success',
        description: 'Notification sent successfully',
        variant: 'success',
      })
      reset()
      setSelectedPlayerIds([])
      // Refetch notifications after sending
      refetchNotifications()
    } catch (error) {
      addToast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send notification',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemovePlayer = (playerId: string) => {
    setSelectedPlayerIds((prev) => prev.filter((id) => id !== playerId))
  }

  const notifications = notificationsData?.results || []

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

              {/* Select Players Button - shown when "Selected Users" is selected */}
              {targetValue === 'selected' && (
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setPlayerDialogOpen(true)}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Select Players
                  </Button>

                  {/* Selected Players List */}
                  {selectedPlayers.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Players ({selectedPlayers.length})</Label>
                      <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/30 max-h-32 overflow-y-auto">
                        {selectedPlayers.map((player) => (
                          <Badge
                            key={player.playerId}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                          >
                            {player.name}
                            <button
                              type="button"
                              onClick={() => handleRemovePlayer(player.playerId)}
                              className="ml-1 rounded-full hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || (targetValue === 'selected' && selectedPlayerIds.length === 0)}
              >
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
            {isLoadingNotifications ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading notifications...</div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">No notifications found</div>
              </div>
            ) : (
              <>
                <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden shadow-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Body</TableHead>
                        <TableHead>Sent At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notifications.map((notification, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{notification.title}</TableCell>
                          <TableCell>{notification.body}</TableCell>
                          <TableCell>
                            {format(new Date(notification.sendAt), 'MMM dd, yyyy HH:mm')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {notificationsData && notificationsData.totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-borderShadcn/50 mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing page {notificationsData.page} of {notificationsData.totalPages} (
                      {notificationsData.totalResults} total results)
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1 || isLoadingNotifications}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, notificationsData.totalPages) },
                          (_, i) => {
                            let pageNum
                            if (notificationsData.totalPages <= 5) {
                              pageNum = i + 1
                            } else if (currentPage <= 3) {
                              pageNum = i + 1
                            } else if (currentPage >= notificationsData.totalPages - 2) {
                              pageNum = notificationsData.totalPages - 4 + i
                            } else {
                              pageNum = currentPage - 2 + i
                            }
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                disabled={isLoadingNotifications}
                                className="min-w-[40px]"
                              >
                                {pageNum}
                              </Button>
                            )
                          }
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(notificationsData.totalPages, prev + 1))
                        }
                        disabled={currentPage === notificationsData.totalPages || isLoadingNotifications}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Player Selection Dialog */}
      <PlayerSelectionDialog
        open={playerDialogOpen}
        onOpenChange={setPlayerDialogOpen}
        selectedPlayerIds={selectedPlayerIds}
        onSelect={setSelectedPlayerIds}
      />
    </div>
  )
}

