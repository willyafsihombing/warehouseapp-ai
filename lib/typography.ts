// src/lib/typography.ts

export const typography = {
  heading: {
    h1: 'text-3xl font-bold tracking-tight text-foreground',
    h2: 'text-2xl font-bold tracking-tight text-foreground',
    h3: 'text-lg font-semibold text-foreground',
  },
  body: {
    default: 'text-base font-normal text-foreground',
    sm:      'text-sm font-normal text-foreground',
    muted:   'text-sm font-normal text-muted-foreground',
  },
  label: {
    default: 'text-sm font-medium text-foreground',
    sm:      'text-xs font-medium text-foreground',
  },
} as const

// Union semua key dari setiap kategori — dipakai untuk type-safe prop
export type TextVariant =
  | `heading.${keyof typeof typography.heading}`
  | `body.${keyof typeof typography.body}`
  | `label.${keyof typeof typography.label}`

// Helper untuk resolve variant string ke Tailwind classes
// Contoh: cn(getTypography('heading.h1'))
export function getTypography(variant: TextVariant): string {
  const [category, key] = variant.split('.') as [
    keyof typeof typography,
    string,
  ]
  return (typography[category] as Record<string, string>)[key] ?? ''
}