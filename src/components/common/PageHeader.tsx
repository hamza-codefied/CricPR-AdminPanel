import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-borderShadcn/50">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-cricket-gradient bg-clip-text text-transparent">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2 text-base font-medium">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

