import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { PageHeader } from '../../components/common/PageHeader'
import { DataTable } from '../../components/common/DataTable'
import { Badge } from '../../components/ui/badge'
import { ConfirmDeleteDialog } from '../../components/common/ConfirmDeleteDialog'
import { mockTournaments } from '../../services/mockData'
import { useToast } from '../../components/ui/toast'

export function TournamentsList() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [tournaments, setTournaments] = useState(mockTournaments)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<any>(null)

  const handleDelete = (tournament: any) => {
    setSelectedTournament(tournament)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setTournaments(tournaments.filter((t) => t.id !== selectedTournament.id))
    addToast({
      title: 'Success',
      description: 'Tournament deleted successfully',
      variant: 'success',
    })
    setSelectedTournament(null)
  }

  const columns = [
    { key: 'name', header: 'Tournament Name' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { key: 'totalMatches', header: 'Total Matches' },
    { key: 'totalTeams', header: 'Total Teams' },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <Badge
          variant={
            row.status === 'ongoing'
              ? 'success'
              : row.status === 'upcoming'
              ? 'warning'
              : 'secondary'
          }
        >
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
        onClick={() => navigate(`/tournaments/${row.id}`)}
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
        title="Tournaments"
        description="View and manage all tournaments in the system"
      />
      <DataTable
        data={tournaments}
        columns={columns}
        searchKey="name"
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'ongoing', label: 'Ongoing' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'completed', label: 'Completed' },
            ],
          },
        ]}
        exportFilename="tournaments"
        actions={actions}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={selectedTournament?.name}
      />
    </div>
  )
}

