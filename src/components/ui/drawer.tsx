import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  side?: 'left' | 'right'
}

const DrawerContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({ open: false, onOpenChange: () => {} })

const Drawer = ({ open, onOpenChange, children, side = 'right' }: DrawerProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <DrawerContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          <div
            className={cn(
              'fixed h-full w-full max-w-sm bg-background shadow-2xl border-r-2 border-borderShadcn/50 backdrop-blur-sm transition-transform duration-300',
              side === 'left' ? 'left-0' : 'right-0',
              open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
            )}
          >
            {children}
          </div>
        </div>
      )}
    </DrawerContext.Provider>
  )
}

const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DrawerContext)
  return (
    <div
      ref={ref}
      className={cn('flex h-full flex-col', className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b p-4">
        <button
          onClick={() => onOpenChange(false)}
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  )
})
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
)

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DrawerTitle.displayName = 'DrawerTitle'

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DrawerDescription.displayName = 'DrawerDescription'

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t p-4', className)}
    {...props}
  />
)

export {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

