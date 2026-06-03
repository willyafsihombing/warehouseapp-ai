// src/app/page.tsx
// Server Component — hanya handle redirect, tidak render apapun
// Pengguna tidak akan pernah melihat halaman ini

import { redirect } from 'next/navigation'
import { createClient } from '@/src/app/lib/supabase/server'

export default async function RootPage() {
  const supabase = await createClient()

  // getUser() verifikasi token ke Supabase server — lebih aman dari getSession()
  // yang hanya baca cookie tanpa validasi
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }
}