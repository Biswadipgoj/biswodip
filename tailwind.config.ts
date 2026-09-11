import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Strong heading/foreground ink — flipped to near-white for the dark theme.
        ink: '#f6f8fc',

        // ---- Structured design-system palette ----
        // Background hierarchy: base (page) → elevated → surface → raised.
        base: {
          DEFAULT: '#0a0b10',
          elevated: '#10131a',
          surface: '#171a22',
          raised: '#1e222d',
        },
        // Brand: primary (indigo), secondary (cyan), accent (pink).
        brand: {
          primary: '#818cf8',
          'primary-strong': '#6366f1',
          secondary: '#22d3ee',
          accent: '#f472b6',
        },
        // Neutral scale — dark-tuned (higher = lighter), AA contrast on base.
        neutral: {
          50: '#0a0c12',
          100: '#11141c',
          200: '#1b1f29',
          300: '#2a2f3b',
          400: '#8a92a4',
          500: '#a7afbe',
          600: '#c5cbd6',
          700: '#dfe3ea',
          800: '#edf0f4',
          900: '#f7f9fb',
        },
        // Standard slate scale so bg-slate-900 is dark and text-slate-100 is light
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        surface: {
          deep: '#030712',
          canvas: '#070b19',
          card: '#0c1228',
          hover: '#111a38',
        },
        aurora: {
          blue: '#3b82f6',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          emerald: '#34d399',
          gold: '#fbbf24',
          pink: '#f472b6',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
