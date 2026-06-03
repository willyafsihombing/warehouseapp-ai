// proxy.ts (Next.js 16+ — sejajar dengan folder src/)
// Menangani session refresh dan proteksi route secara terpusat.
// Semua request melewati file ini sebelum sampai ke halaman/API.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

// ── Kategori route ────────────────────────────────────────────────────────────

// Route yang boleh diakses siapapun tanpa login
const PUBLIC_ROUTES = ['/', '/login', '/register', '/auth/callback']

// Route yang tidak boleh diakses user yang sudah login
// (agar tidak balik ke login/register setelah sudah masuk)
const AUTH_ROUTES = ['/login', '/register']

// Prefix halaman yang wajib login — cek dengan startsWith
const PROTECTED_ROUTES_PREFIX = [
  '/dashboard',
  '/products',
  '/warehouses',
  '/stock',
  '/chat',
]

// Prefix API yang wajib login — return 401 kalau tidak ada session
const API_PROTECTED_PREFIX = [
  '/api/products',
  '/api/warehouses',
  '/api/stock',
  '/api/ai',
]

// ─────────────────────────────────────────────────────────────────────────────

export async function proxy(req: NextRequest) {
  // Response dibuat dulu agar cookie bisa ditulis balik ke browser.
  // Tanpa ini, session refresh dari Supabase tidak tersimpan.
  const res = NextResponse.next()

  // Supabase client khusus middleware — wajib pakai getAll/setAll
  // agar token yang di-refresh otomatis tersimpan ke cookie request & response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Set ke request agar readable di route handler yang sama
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          // Set ke response agar browser menyimpan token terbaru
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getUser() validasi token ke Supabase server — lebih aman dari getSession()
  // getSession() hanya baca cookie lokal tanpa verifikasi ke server
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  // ── 1. User sudah login, coba akses halaman auth (login/register) ──────────
  // Redirect ke dashboard agar tidak bolak-balik ke form login
  if (user && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // ── 2. User belum login, coba akses halaman protected ─────────────────────
  // Simpan tujuan asal di ?redirectTo agar setelah login bisa langsung diarahkan
  if (!user && PROTECTED_ROUTES_PREFIX.some(prefix => pathname.startsWith(prefix))) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── 3. User belum login, coba akses API protected ─────────────────────────
  // Return 401 JSON — bukan redirect, karena API dipanggil via fetch bukan browser
  if (!user && API_PROTECTED_PREFIX.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // ── 4. Semua kondisi lain — lanjutkan request ─────────────────────────────
  return res
}

export const config = {
  matcher: [
    // Jalankan proxy di semua route kecuali:
    // - _next/static  : file JS/CSS build
    // - _next/image   : optimized images
    // - favicon.ico   : browser icon
    // - file dengan ekstensi (svg, png, jpg, dll) : aset statis
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}