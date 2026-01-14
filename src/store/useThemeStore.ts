import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

const loadThemeFromStorage = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem('theme-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.theme || 'light'
    }
  } catch {
    // Ignore
  }
  return 'light'
}

const saveThemeToStorage = (theme: 'light' | 'dark') => {
  try {
    localStorage.setItem('theme-storage', JSON.stringify({ theme }))
  } catch {
    // Ignore
  }
}

export const useThemeStore = create<ThemeState>((set) => {
  const initialTheme = loadThemeFromStorage()
  document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  
  return {
    theme: initialTheme,
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        
        // Disable transitions temporarily for smooth theme switch
        document.documentElement.classList.add('theme-transitioning')
        
        // Use requestAnimationFrame for smooth DOM update
        requestAnimationFrame(() => {
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
          
          // Re-enable transitions after a short delay
          requestAnimationFrame(() => {
            document.documentElement.classList.remove('theme-transitioning')
          })
        })
        
        saveThemeToStorage(newTheme)
        return { theme: newTheme }
      })
    },
    setTheme: (theme: 'light' | 'dark') => {
      // Disable transitions temporarily for smooth theme switch
      document.documentElement.classList.add('theme-transitioning')
      
      // Use requestAnimationFrame for smooth DOM update
      requestAnimationFrame(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        
        // Re-enable transitions after a short delay
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('theme-transitioning')
        })
      })
      
      saveThemeToStorage(theme)
      set({ theme })
    },
  }
})

