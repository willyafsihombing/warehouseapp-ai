import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Priority levels — terhubung ke CSS variables di globals.css
        'priority-critical': {
          DEFAULT:    'hsl(var(--priority-critical))',
          foreground: 'hsl(var(--priority-critical-foreground))',
        },
        'priority-high': {
          DEFAULT:    'hsl(var(--priority-high))',
          foreground: 'hsl(var(--priority-high-foreground))',
        },
        'priority-medium': {
          DEFAULT:    'hsl(var(--priority-medium))',
          foreground: 'hsl(var(--priority-medium-foreground))',
        },
        'priority-low': {
          DEFAULT:    'hsl(var(--priority-low))',
          foreground: 'hsl(var(--priority-low-foreground))',
        },
      },
    },
  },
  plugins: [],
}

export default config