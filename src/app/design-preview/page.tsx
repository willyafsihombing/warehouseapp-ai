// src/app/design-preview/page.tsx
// ⚠️ HALAMAN INI HANYA UNTUK DEVELOPMENT — HAPUS SEBELUM PRODUCTION

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PageContainer from '@/components/layout/pageContainer'
import PageHeader from '@/components/layout/pageHeader'
import StatCard from '@/components/dashboard/StatCard'
import PriorityBadge from '@/components/dashboard/PriorityBadge'
import { typography } from '@/lib/typography'
import { Package, AlertTriangle, Warehouse, TrendingUp } from 'lucide-react'

// ── Helper komponen lokal ─────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className={typography.heading.h2}>{title}</h2>
      <div className="rounded-xl border border-border bg-card p-6">
        {children}
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className={typography.label.sm + ' mb-3 text-muted-foreground uppercase tracking-widest'}>{children}</p>
}

// ─────────────────────────────────────────────────────────────────────────────

export default function DesignPreviewPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Design System Preview"
        description="Referensi visual komponen dan token — hapus sebelum production"
      />

      <div className="mt-8 space-y-10">

        {/* ── 1. COLORS ─────────────────────────────────────────────────── */}
        <Section title="1. Colors">
          <SectionLabel>Custom Color Tokens</SectionLabel>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Primary',          bg: 'bg-primary',            text: 'text-primary-foreground' },
              { name: 'Critical',         bg: 'bg-priority-critical',  text: 'text-priority-critical-foreground' },
              { name: 'High',             bg: 'bg-priority-high',      text: 'text-priority-high-foreground' },
              { name: 'Medium',           bg: 'bg-priority-medium',    text: 'text-priority-medium-foreground' },
              { name: 'Low',              bg: 'bg-priority-low',       text: 'text-priority-low-foreground' },
            ].map(({ name, bg, text }) => (
              <div key={name} className={`${bg} ${text} flex h-20 w-36 flex-col items-start justify-end rounded-xl p-3 shadow-sm`}>
                <span className="text-xs font-semibold">{name}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <SectionLabel>Foreground variants</SectionLabel>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Critical Fg',  bg: 'bg-priority-critical/10', text: 'text-priority-critical' },
              { name: 'High Fg',      bg: 'bg-priority-high/10',     text: 'text-priority-high' },
              { name: 'Medium Fg',    bg: 'bg-priority-medium/10',   text: 'text-priority-medium' },
              { name: 'Low Fg',       bg: 'bg-priority-low/10',      text: 'text-priority-low' },
            ].map(({ name, bg, text }) => (
              <div key={name} className={`${bg} ${text} flex h-16 w-36 items-center justify-center rounded-xl border text-xs font-semibold`}>
                {name}
              </div>
            ))}
          </div>
        </Section>

        {/* ── 2. TYPOGRAPHY ─────────────────────────────────────────────── */}
        <Section title="2. Typography">
          <div className="space-y-4">
            <div>
              <SectionLabel>Headings</SectionLabel>
              <div className="space-y-2">
                <p className={typography.heading.h1}>Heading H1 — Dasbor Inventori</p>
                <p className={typography.heading.h2}>Heading H2 — Ringkasan Stok</p>
                <p className={typography.heading.h3}>Heading H3 — Detail Gudang</p>
              </div>
            </div>
            <div>
              <SectionLabel>Body</SectionLabel>
              <div className="space-y-2">
                <p className={typography.body.default}>Body Default — Teks konten utama halaman dashboard</p>
                <p className={typography.body.sm}>Body Small — Informasi sekunder atau tambahan</p>
                <p className={typography.body.muted}>Body Muted — Diperbarui 5 menit lalu · text-muted-foreground</p>
              </div>
            </div>
            <div>
              <SectionLabel>Labels</SectionLabel>
              <div className="space-y-2">
                <p className={typography.label.default}>Label Default — Nama Produk</p>
                <p className={typography.label.sm}>Label Small — SKU · Kategori · Gudang</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 3. BUTTONS ────────────────────────────────────────────────── */}
        <Section title="3. Buttons">
          {(['default', 'secondary', 'outline', 'ghost', 'destructive'] as const).map(variant => (
            <div key={variant} className="mb-4">
              <SectionLabel>{variant}</SectionLabel>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant={variant}>Default size</Button>
                <Button variant={variant} size="sm">Small size</Button>
              </div>
            </div>
          ))}
        </Section>

        {/* ── 4. CARDS ──────────────────────────────────────────────────── */}
        <Section title="4. Cards">
          <SectionLabel>StatCard variants</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Produk"
              value="248"
              description="di 3 gudang"
              icon={<Package className="h-4 w-4" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Stok Menipis"
              value="17"
              description="perlu restock"
              icon={<AlertTriangle className="h-4 w-4" />}
              trend={{ value: 5, isPositive: false }}
            />
            <StatCard
              title="Gudang Aktif"
              value="3"
              description="semua online"
              icon={<Warehouse className="h-4 w-4" />}
            />
            <StatCard
              title="Perputaran Stok"
              value="94%"
              description="bulan ini"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={{ value: 3.2, isPositive: true }}
            />
          </div>
        </Section>

        {/* ── 5. BADGES ─────────────────────────────────────────────────── */}
        <Section title="5. Badges">
          <div>
            <SectionLabel>Priority Badges</SectionLabel>
            <div className="flex flex-wrap gap-3">
              <PriorityBadge priority="critical" />
              <PriorityBadge priority="high" />
              <PriorityBadge priority="medium" />
              <PriorityBadge priority="low" />
            </div>
          </div>
          <div className="mt-4">
            <SectionLabel>Shadcn Badge variants</SectionLabel>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
        </Section>

        {/* ── 6. SHADCN COMPONENTS ──────────────────────────────────────── */}
        <Section title="6. Shadcn Components">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Input */}
            <div className="space-y-2">
              <SectionLabel>Input</SectionLabel>
              <Label htmlFor="preview-input">Nama Produk</Label>
              <Input id="preview-input" placeholder="Contoh: Beras Premium 5kg" />
            </div>

            {/* Input disabled */}
            <div className="space-y-2">
              <SectionLabel>Input Disabled</SectionLabel>
              <Label htmlFor="preview-input-disabled">SKU</Label>
              <Input id="preview-input-disabled" value="BRS-001" disabled />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <SectionLabel>Select</SectionLabel>
              <Label>Kategori</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sembako">Sembako</SelectItem>
                  <SelectItem value="minuman">Minuman</SelectItem>
                  <SelectItem value="kebersihan">Kebersihan</SelectItem>
                  <SelectItem value="kesehatan">Kesehatan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Label sizes */}
            <div className="space-y-2">
              <SectionLabel>Labels</SectionLabel>
              <div className="space-y-1">
                <Label>Label Default</Label>
                <Label className="text-xs text-muted-foreground">Label Muted / Helper text</Label>
              </div>
            </div>

          </div>
        </Section>

      </div>
    </PageContainer>
  )
}