import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'
import { useThemeStore } from '../../store/useThemeStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  const [isToggling, setIsToggling] = React.useState(false)

  const handleToggle = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isToggling) return // Prevent double clicks
    
    setIsToggling(true)
    toggleTheme()
    
    // Reset toggle state after animation
    setTimeout(() => {
      setIsToggling(false)
    }, 300)
  }, [toggleTheme, isToggling])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="h-9 w-9 relative pointer-events-auto"
      type="button"
      disabled={isToggling}
    >
      <Sun className={`h-5 w-5 absolute transition-transform duration-150 pointer-events-none ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
      <Moon className={`h-5 w-5 absolute transition-transform duration-150 pointer-events-none ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

