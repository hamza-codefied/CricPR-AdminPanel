import { useState } from 'react'
import { User, LogOut, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'
import { useAuthStore } from '../../store/useAuthStore'
import { useAuth } from '../../hooks/useAuth'
import { ConfirmDeleteDialog } from '../common/ConfirmDeleteDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuthStore()
  const { logout } = useAuth()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const confirmLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-[110] flex h-16 items-center gap-4 border-b border-borderShadcn/50 bg-background/95 backdrop-blur-sm shadow-sm px-4 lg:px-6">
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden hover:bg-accent flex-shrink-0" 
        onClick={onMenuClick}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Icons Container - Fixed position, no overlap */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full hover:bg-accent transition-all hover:ring-2 hover:ring-primary/20"
              type="button"
            >
              <User className="h-5 w-5 pointer-events-none" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 shadow-lg border-borderShadcn/50">
            <div className="px-3 py-2 border-b border-borderShadcn/50">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
            </div>
            <DropdownMenuItem 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLogout()
              }} 
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmDeleteDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={confirmLogout}
        title="Logout"
        description="Are you sure you want to logout? You will need to login again to access the admin panel."
      />
    </header>
  )
}

