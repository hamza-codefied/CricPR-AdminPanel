import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select } from '../../components/ui/select'
import { useToast } from '../../components/ui/toast'

const playerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  team: z.string().min(1, 'Team is required'),
  role: z.enum(['batsman', 'bowler', 'allrounder', 'wicketkeeper']),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  status: z.enum(['active', 'inactive']),
})

type PlayerFormData = z.infer<typeof playerSchema>

interface AddPlayerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (player: PlayerFormData) => void
}

export function AddPlayerDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddPlayerDialogProps) {
  const { addToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      status: 'active',
    },
  })

  const onSubmit = (data: PlayerFormData) => {
    onSuccess(data)
    addToast({
      title: 'Success',
      description: 'Player added successfully',
      variant: 'success',
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new player to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Player Name *</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Team *</Label>
            <Select id="team" {...register('team')}>
              <option value="">Select team</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
              <option value="Team C">Team C</option>
            </Select>
            {errors.team && (
              <p className="text-sm text-red">{errors.team.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select id="role" {...register('role')}>
              <option value="">Select role</option>
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="allrounder">All Rounder</option>
              <option value="wicketkeeper">Wicket Keeper</option>
            </Select>
            {errors.role && (
              <p className="text-sm text-red">{errors.role.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input id="phone" type="tel" {...register('phone')} />
            {errors.phone && (
              <p className="text-sm text-red">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-red">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select id="status" {...register('status')}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            {errors.status && (
              <p className="text-sm text-red">{errors.status.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Player</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

