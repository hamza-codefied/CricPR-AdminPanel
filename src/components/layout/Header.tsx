import { Search, Bell, User, LogOut, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'
import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
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
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
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
      
      {/* Search Input - Separate container */}
      <div className="hidden md:block relative flex-1 max-w-md ml-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg border-2 border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>

      {/* Icons Container - Fixed position, no overlap */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        <ThemeToggle />
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-accent transition-colors"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // Add notification functionality here if needed
            console.log('Notifications clicked')
          }}
          type="button"
        >
          <Bell className="h-5 w-5 pointer-events-none" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red animate-pulse pointer-events-none" />
        </Button>
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
    </header>
  )
}

