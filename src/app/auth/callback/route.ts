// src/app/auth/callback/route.ts
// Menangani callback dari Supabase setelah OAuth atau magic link —
// Supabase redirect ke sini dengan 'code' di URL, lalu kita tukar
// jadi session yang tersimpan di cookie

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/src/app/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()

    // Tukar authorization code jadi session (access token + refresh token)
    // Session otomatis disimpan ke cookie oleh createServerClient
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Kalau tidak ada code atau exchange gagal — redirect ke login dengan error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}