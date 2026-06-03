import { Badge } from '@/components/ui/badge'
import { cn } from "@/src/app/lib/supabase/utils"

type Priority = 'critical' | 'high' | 'medium' | 'low'

interface PriorityBadgeProps {
  priority: Priority
}

// Label dan styling per level — dipusatkan di sini agar mudah diubah
const config: Record<Priority, { label: string; className: string; pulse: boolean }> = {
  critical: {
    label: 'Kritis',
    className: 'bg-priority-critical text-priority-critical-foreground hover:bg-priority-critical',
    pulse: true, // dot merah berkedip untuk menarik perhatian segera
  },
  high: {
    label: 'Tinggi',
    className: 'bg-priority-high text-priority-high-foreground hover:bg-priority-high',
    pulse: false,
  },
  medium: {
    label: 'Sedang',
    className: 'bg-priority-medium text-priority-medium-foreground hover:bg-priority-medium',
    pulse: false,
  },
  low: {
    label: 'Rendah',
    className: 'bg-priority-low text-priority-low-foreground hover:bg-priority-low',
    pulse: false,
  },
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, className, pulse } = config[priority]

  return (
    <Badge className={cn('gap-1.5 px-2 py-0.5 text-xs font-medium', className)}>

      {/* Dot indikator — hanya critical yang pulse */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white opacity-90" />
      </span>

      {label}
    </Badge>
  )
}