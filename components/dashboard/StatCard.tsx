// src/components/dashboard/StatCard.tsx
// Server Component — tidak perlu 'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { typography } from '@/src/app/lib/typography'
import { cn } from "@/src/app/lib/supabase/utils"

interface TrendProps {
  value: number
  isPositive: boolean
}

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: TrendProps
}

export default function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">

        {/* Judul kartu */}
        <p className={cn(typography.label.default, 'text-muted-foreground')}>
          {title}
        </p>

        {/* Icon dalam lingkaran biru — hanya render kalau ada */}
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {icon}
          </div>
        )}

      </CardHeader>

      <CardContent className="space-y-1">

        {/* Value utama */}
        <p className={typography.heading.h2}>{value}</p>

        <div className="flex items-center gap-2">

          {/* Deskripsi opsional */}
          {description && (
            <p className={typography.body.muted}>{description}</p>
          )}

          {/* Badge trend — hijau kalau positif, merah kalau negatif */}
          {trend && (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                trend.isPositive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-600'
              )}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}

        </div>
      </CardContent>
    </Card>
  )
}