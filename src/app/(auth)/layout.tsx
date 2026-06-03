// src/app/(auth)/layout.tsx
// Server Component — layout untuk halaman login dan register
// Folder (auth) adalah route group — tidak mempengaruhi URL

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">

      {/* ── Kiri: branding panel — disembunyikan di mobile ───────────────── */}
      <div className="relative hidden md:flex md:w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900">

        {/* Grid overlay dekoratif — memberi kesan depth tanpa distraksi */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Lingkaran blur dekoratif di sudut */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-300 opacity-20 blur-3xl" />

        {/* Konten utama branding */}
        <div className="relative z-10 flex flex-col items-center text-center px-12 gap-6">

          {/* Logo / icon app */}
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>

          {/* Nama aplikasi */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Warehouse<span className="text-blue-200">AI</span>
            </h1>
            <p className="text-lg text-blue-100 font-medium">
              Kelola gudang lebih cerdas dengan AI
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/30" />

          {/* Feature highlights */}
          <ul className="space-y-3 text-left">
            {[
              'Monitor stok semua gudang secara realtime',
              'Insight otomatis berbasis AI',
              'Peringatan dini sebelum stok habis',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-blue-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

        </div>

        {/* Footer branding */}
        <p className="absolute bottom-6 text-xs text-blue-300">
          © 2026 Warehouse AI · Prototipe v0.1
        </p>
      </div>

      {/* ── Kanan: form area ─────────────────────────────────────────────── */}
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">

        {/* Logo kecil di mobile — hanya muncul saat panel kiri disembunyikan */}
        <div className="mb-8 flex flex-col items-center gap-2 md:hidden">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-900">
            Warehouse<span className="text-blue-600">AI</span>
          </span>
        </div>

        {/* Form content dari halaman login/register */}
        <div className="w-full max-w-sm">
          {children}
        </div>

      </div>
    </div>
  )
}