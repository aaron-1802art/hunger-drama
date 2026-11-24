// Design tokens — mirrors tailwind.config.ts for use in JS/TS

export const colors = {
  ink: '#0D0C0B',
  carbon: '#141312',
  graphite: '#1E1C1A',
  ash: '#2C2926',
  smoke: '#6B6560',
  mist: '#A8A09A',
  cream: '#F0EBE3',
  offWhite: '#FAF8F5',
  ember: '#C4622D',
  emberDim: '#8A4420',
  emberGlow: '#E8835A',
  // Light theme equivalents
  lightInk: '#F7F5EE',
  lightCarbon: '#EEEAE2',
  lightGraphite: '#E0DACB',
  lightCream: '#1C1A18',
} as const

export const fonts = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
  '6xl': '192px',
} as const
