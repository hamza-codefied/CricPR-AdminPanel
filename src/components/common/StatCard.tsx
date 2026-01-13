import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '../../utils/cn'

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  description?: string
  className?: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function StatCard({
  title,
  value,
  icon,
  description,
  className,
  trend,
}: StatCardProps) {
  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50',
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-primary p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-cricket-gradient bg-clip-text text-transparent mb-2">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 font-medium">{description}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span className={cn(
              'text-xs font-semibold',
              trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

