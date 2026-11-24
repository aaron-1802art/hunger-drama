import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // HUNGER DRAMA Brand Palette
        'hd-cream': '#FFF1E1',
        'hd-red': '#FF382E',
        'hd-pink': '#FFB6C1',
        'hd-pink-deep': '#EF86AB',
        'hd-yellow': '#FFC342',
        'hd-charcoal': '#292525',
        'hd-dark': '#1A1616',
        'hd-white': '#FFFFFF',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        heading: ['Archivo Black', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'drama-hero': ['clamp(52px, 10vw, 136px)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'drama-h1': ['clamp(38px, 6.5vw, 88px)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        'drama-h2': ['clamp(28px, 4vw, 56px)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        'drama-h3': ['clamp(20px, 2.5vw, 34px)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'drama-sub': ['clamp(16px, 1.4vw, 20px)', { lineHeight: '1.45', letterSpacing: '0em' }],
        'drama-editorial': ['clamp(15px, 1.2vw, 17px)', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        'label-caps': ['11px', { lineHeight: '1', letterSpacing: '0.18em' }],
        'tag-caps': ['10px', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marqueeReverse 28s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'badge-pulse': 'badgePulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
      boxShadow: {
        'drama-card': '0 8px 30px rgba(41, 37, 37, 0.08)',
        'drama-pop': '4px 4px 0px #292525',
        'drama-pop-red': '4px 4px 0px #FF382E',
        'drama-pop-lg': '6px 6px 0px #292525',
      },
    },
  },
  plugins: [],
}

export default config
