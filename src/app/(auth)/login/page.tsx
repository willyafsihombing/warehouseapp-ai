'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/src/app/lib/supabase/client'

type FieldErrors = {
  email?: string
  password?: string
}

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {}

  if (!email.trim())
    errors.email = 'Email wajib diisi'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Format email tidak valid'

  if (!password)
    errors.password = 'Password wajib diisi'

  return errors
}

function parseSupabaseError(message: string): string {
  if (message.toLowerCase().includes('invalid login credentials'))
    return 'Email atau password salah.'
  if (message.toLowerCase().includes('email not confirmed'))
    return 'Silakan verifikasi email kamu terlebih dahulu.'
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading]         = useState(false)

  const handleSubmit = async () => {
    setServerError(null)

    const errors = validate(email, password)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setServerError(parseSupabaseError(error.message))
        return
      }

      router.push('/dashboard')

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Selamat Datang</h1>
        <p className="text-sm text-muted-foreground">Masuk ke akun Warehouse AI kamu</p>
      </div>

      {/* Server error alert */}
      {serverError && (
        <div className="mb-4 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-red-500">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@perusahaan.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            className={fieldErrors.email ? 'border-red-400 focus-visible:ring-red-300' : ''}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
            className={fieldErrors.password ? 'border-red-400 focus-visible:ring-red-300' : ''}
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="9" strokeOpacity=".25"/>
                <path d="M12 3a9 9 0 019 9"/>
              </svg>
              Masuk...
            </>
          ) : 'Masuk'}
        </Button>

      </div>

      {/* Link ke register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Belum punya akun?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:underline">
          Daftar sekarang
        </Link>
      </p>

    </div>
  )
}