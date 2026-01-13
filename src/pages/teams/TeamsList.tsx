import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { PageHeader } from '../../components/common/PageHeader'
import { DataTable } from '../../components/common/DataTable'
import { ConfirmDeleteDialog } from '../../components/common/ConfirmDeleteDialog'
import { mockTeams } from '../../services/mockData'
import { useToast } from '../../components/ui/toast'

export function TeamsList() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [teams, setTeams] = useState(mockTeams)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<any>(null)

  const handleDelete = (team: any) => {
    setSelectedTeam(team)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setTeams(teams.filter((t) => t.id !== selectedTeam.id))
    addToast({
      title: 'Success',
      description: 'Team deleted successfully',
      variant: 'success',
    })
    setSelectedTeam(null)
  }

  // Get unique cities and countries for filters
  const cities = useMemo(() => {
    return Array.from(new Set(teams.map((t) => t.city).filter(Boolean))).sort()
  }, [teams])

  const countries = useMemo(() => {
    return Array.from(new Set(teams.map((t) => t.country).filter(Boolean))).sort()
  }, [teams])

  const columns = [
    { key: 'name', header: 'Team Name' },
    { key: 'captain', header: 'Captain' },
    { key: 'city', header: 'City' },
    { key: 'country', header: 'Country' },
    { key: 'matchesPlayed', header: 'Matches' },
    { key: 'wins', header: 'Wins' },
    { key: 'losses', header: 'Losses' },
    { key: 'totalRuns', header: 'Total Runs' },
    { key: 'totalWickets', header: 'Total Wickets' },
  ]

  const actions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(`/teams/${row.id}`)}
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
        title="Teams"
        description="View and manage all teams in the system"
      />
      <DataTable
        data={teams}
        columns={columns}
        searchKey="name"
        filters={[
          {
            key: 'city',
            label: 'City',
            options: cities.map((city) => ({ value: city, label: city })),
          },
          {
            key: 'country',
            label: 'Country',
            options: countries.map((country) => ({ value: country, label: country })),
          },
        ]}
        exportFilename="teams"
        actions={actions}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={selectedTeam?.name}
      />
    </div>
  )
}

