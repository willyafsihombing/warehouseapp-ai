'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

type FieldErrors = {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

function validate(fullName: string, email: string, password: string, confirmPassword: string): FieldErrors {
  const errors: FieldErrors = {}

  if (!fullName.trim())
    errors.fullName = 'Nama lengkap wajib diisi'

  if (!email.trim())
    errors.email = 'Email wajib diisi'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Format email tidak valid'

  if (!password)
    errors.password = 'Password wajib diisi'
  else if (password.length < 8)
    errors.password = 'Password minimal 8 karakter'

  if (!confirmPassword)
    errors.confirmPassword = 'Konfirmasi password wajib diisi'
  else if (confirmPassword !== password)
    errors.confirmPassword = 'Password tidak cocok'

  return errors
}

function parseSupabaseError(message: string): string {
  if (message.toLowerCase().includes('user already registered'))
    return 'Email ini sudah terdaftar. Silakan login.'
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName]               = useState('')
  const [email, setEmail]                     = useState('')
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess]         = useState(false)
  const [loading, setLoading]         = useState(false)

  const handleSubmit = async () => {
    setServerError(null)

    const errors = validate(fullName, email, password, confirmPassword)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})

    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })

      if (error) {
        setServerError(parseSupabaseError(error.message))
        return
      }

      // Paksa signOut agar middleware tidak redirect ke /dashboard
      await supabase.auth.signOut()

      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">

      {/* Header */}
      <div className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Buat Akun Baru</h1>
        <p className="text-base text-muted-foreground">Mulai kelola gudang dengan AI</p>
      </div>

      {/* Server error alert */}
      {serverError && (
        <div className="mb-6 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-red-500">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      {/* Success alert */}
      {success && (
        <div className="mb-6 flex gap-2.5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-green-600">
            <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
          </svg>
          <p className="text-sm text-green-700">Akun berhasil dibuat! Mengarahkan ke halaman login...</p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-5">

        {/* Full name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">Nama Lengkap</Label>
          <Input
            id="fullName"
            placeholder="Contoh: Budi Santoso"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            disabled={loading || success}
            className={`h-12 text-base ${fieldErrors.fullName ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
          />
          {fieldErrors.fullName && (
            <p className="text-xs text-red-500">{fieldErrors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@perusahaan.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading || success}
            className={`h-12 text-base ${fieldErrors.email ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading || success}
            className={`h-12 text-base ${fieldErrors.password ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            disabled={loading || success}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
            className={`h-12 text-base ${fieldErrors.confirmPassword ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white mt-2"
          onClick={handleSubmit}
          disabled={loading || success}
        >
          {loading ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="9" strokeOpacity=".25"/>
                <path d="M12 3a9 9 0 019 9"/>
              </svg>
              Mendaftar...
            </>
          ) : 'Buat Akun'}
        </Button>

      </div>

      {/* Link ke login */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Sudah punya akun?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Login di sini
        </Link>
      </p>

    </div>
  )
}