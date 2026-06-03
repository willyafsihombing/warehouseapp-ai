// src/components/layout/PageHeader.tsx
// Server Component — tidak perlu 'use client'

import { typography } from '@/src/app/lib/typography'

interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">

      {/* Kiri: judul dan deskripsi */}
      <div className="space-y-1">
        <h1 className={typography.heading.h1}>{title}</h1>
        {description && (
          <p className={typography.body.muted}>{description}</p>
        )}
      </div>

      {/* Kanan: action button — hanya render kalau ada */}
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}

    </div>
  )
}