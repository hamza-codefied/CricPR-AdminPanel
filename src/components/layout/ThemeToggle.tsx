import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'
import { useThemeStore } from '../../store/useThemeStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleTheme()
      }}
      className="h-9 w-9 relative pointer-events-auto"
      type="button"
    >
      <Sun className={`h-5 w-5 absolute transition-all duration-200 pointer-events-none ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
      <Moon className={`h-5 w-5 absolute transition-all duration-200 pointer-events-none ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

