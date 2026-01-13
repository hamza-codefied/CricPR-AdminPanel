import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { PageHeader } from '../../components/common/PageHeader'
import { DataTable } from '../../components/common/DataTable'
import { Badge } from '../../components/ui/badge'
import { ConfirmDeleteDialog } from '../../components/common/ConfirmDeleteDialog'
import { mockMatches } from '../../services/mockData'
import { useToast } from '../../components/ui/toast'

export function MatchesList() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [matches, setMatches] = useState(mockMatches)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)

  const handleDelete = (match: any) => {
    setSelectedMatch(match)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setMatches(matches.filter((m) => m.id !== selectedMatch.id))
    addToast({
      title: 'Success',
      description: 'Match deleted successfully',
      variant: 'success',
    })
    setSelectedMatch(null)
  }

  const columns = [
    { key: 'id', header: 'Match ID' },
    { key: 'tournament', header: 'Tournament' },
    {
      key: 'teams',
      header: 'Teams',
      render: (row: any) => `${row.teamA} vs ${row.teamB}`,
    },
    { key: 'date', header: 'Date' },
    { key: 'location', header: 'Location' },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <Badge
          variant={
            row.status === 'completed'
              ? 'success'
              : row.status === 'live'
              ? 'destructive'
              : 'secondary'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    { key: 'result', header: 'Result' },
  ]

  const actions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(`/matches/${row.id}`)}
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
        title="Matches"
        description="View and manage all matches in the system"
      />
      <DataTable
        data={matches}
        columns={columns}
        searchKey="id"
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'live', label: 'Live' },
              { value: 'completed', label: 'Completed' },
            ],
          },
        ]}
        exportFilename="matches"
        actions={actions}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={`${selectedMatch?.teamA} vs ${selectedMatch?.teamB}`}
      />
    </div>
  )
}

