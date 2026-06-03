import { cn } from "@/src/app/lib/supabase/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        // Centered dengan max width
        'mx-auto w-full max-w-screen-xl',
        // Padding responsif: kecil di mobile, lebih besar di desktop
        'px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10',
        className
      )}
    >
      {children}
    </div>
  )
}