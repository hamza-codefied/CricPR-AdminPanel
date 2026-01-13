import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { PageHeader } from '../../components/common/PageHeader'
import { DataTable } from '../../components/common/DataTable'
import { Badge } from '../../components/ui/badge'
import { ConfirmDeleteDialog } from '../../components/common/ConfirmDeleteDialog'
import { mockPlayers } from '../../services/mockData'
import { useToast } from '../../components/ui/toast'


export function PlayersList() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [players, setPlayers] = useState(mockPlayers)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const sortBy = ''
  const sortOrder: 'asc' | 'desc' = 'asc'

  const handleDelete = (player: any) => {
    setSelectedPlayer(player)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setPlayers(players.filter((p) => p.id !== selectedPlayer.id))
    addToast({
      title: 'Success',
      description: 'Player deleted successfully',
      variant: 'success',
    })
    setSelectedPlayer(null)
  }

  // Get unique cities and attributes for sorting
  const cities = useMemo(() => {
    return Array.from(new Set(players.map((p) => p.city).filter(Boolean))).sort()
  }, [players])

  // Sort players based on selected criteria
  const sortedPlayers = useMemo(() => {
    if (!sortBy) return players

    const sorted = [...players].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case 'city':
          aValue = a.city || ''
          bValue = b.city || ''
          break
        case 'battingStyle':
          aValue = a.battingStyle || ''
          bValue = b.battingStyle || ''
          break
        case 'bowlingStyle':
          aValue = a.bowlingStyle || ''
          bValue = b.bowlingStyle || ''
          break
        case 'wicketKeeper':
          aValue = a.isWicketKeeper ? 'Yes' : 'No'
          bValue = b.isWicketKeeper ? 'Yes' : 'No'
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [players, sortBy, sortOrder])

  const columns = [
    { key: 'name', header: 'Player Name' },
    { key: 'team', header: 'Team' },
    { key: 'city', header: 'City' },
    { key: 'role', header: 'Role' },
    {
      key: 'battingStyle',
      header: 'Batting',
      render: (row: any) => row.battingStyle || '-',
    },
    {
      key: 'bowlingStyle',
      header: 'Bowling',
      render: (row: any) => row.bowlingStyle || '-',
    },
    {
      key: 'wicketKeeper',
      header: 'WK',
      render: (row: any) =>
        row.isWicketKeeper ? (
          <Badge variant="success">Yes</Badge>
        ) : (
          <Badge variant="secondary">No</Badge>
        ),
    },
    { key: 'matchesPlayed', header: 'Matches' },
    { key: 'runs', header: 'Runs' },
    { key: 'wickets', header: 'Wickets' },
    {
      key: 'strikeRate',
      header: 'Strike Rate',
      render: (row: any) => row.strikeRate.toFixed(2),
    },
    {
      key: 'economy',
      header: 'Economy',
      render: (row: any) => (row.economy > 0 ? row.economy.toFixed(2) : '-'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <Badge variant={row.status === 'active' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
  ]

  const actions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(`/players/${row.id}`)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDelete(row)}
      >
        <Trash2 className="h-4 w-4 text-red" />
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Players"
        description="View and manage all players in the system"
      />

     

      <DataTable
        data={sortedPlayers}
        columns={columns}
        searchKey="name"
        filters={[
          {
            key: 'city',
            label: 'City',
            options: cities.map((city) => ({ value: city, label: city })),
          },
          {
            key: 'battingStyle',
            label: 'Batting Style',
            options: [
              { value: 'RHB', label: 'Right Hand Bat (RHB)' },
              { value: 'LHB', label: 'Left Hand Bat (LHB)' },
            ],
          },
          {
            key: 'bowlingStyle',
            label: 'Bowling Style',
            options: [
              { value: 'RHB', label: 'Right Hand Bowler (RHB)' },
              { value: 'LHB', label: 'Left Hand Bowler (LHB)' },
            ],
          },
          {
            key: 'isWicketKeeper',
            label: 'Wicket Keeper',
            options: [
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ],
          },
        ]}
        exportFilename="players"
        actions={actions}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={selectedPlayer?.name}
      />
    </div>
  )
}

