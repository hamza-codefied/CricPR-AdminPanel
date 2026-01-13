import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ToastProvider } from './components/ui/toast'
import { useThemeStore } from './store/useThemeStore'
import { useEffect } from 'react'

function App() {
  const { setTheme } = useThemeStore()

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem('theme-storage')
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        if (parsed.theme) {
          setTheme(parsed.theme)
        }
      } catch {
        setTheme('light')
      }
    } else {
      setTheme('light')
    }
  }, [setTheme])

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
