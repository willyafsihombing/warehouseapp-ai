'use client'

import { useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/src/app/lib/supabase/client'

interface UserMenuProps {
  user: {
    email: string
    id: string
  }
}

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const supabase = createClient()

  // Ambil huruf pertama email sebagai avatar — lebih personal dari icon generik
  const initial = user.email.charAt(0).toUpperCase()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <DropdownMenu>

      {/* Avatar sebagai trigger — huruf pertama email di lingkaran biru */}
      <DropdownMenuTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {initial}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">

        {/* Info akun — non-clickable, hanya informatif */}
        <DropdownMenuLabel className="font-normal">
          <p className="text-xs text-muted-foreground">Akun</p>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">
            {user.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Navigasi */}
        <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer gap-2">
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          Pengaturan
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout — merah untuk membedakan dari aksi navigasi biasa */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}