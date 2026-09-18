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
        /* Chapter 1: SOURCE */
        source: {
          bg: '#131214',
          elevated: '#1a191c',
          ink: '#e8e6eb',
          muted: '#908d96',
        },
        syn: {
          keyword: '#7ba4c7',
          string: '#8bb88a',
          function: '#d4a55c',
          punctuation: '#908d96',
          variable: '#c4b5d4',
          comment: '#5c5961',
        },
        /* Chapter 2: COMPILE */
        compile: {
          start: '#131214',
          end: '#EFE9DE',
          accent: '#7AAFE0',
          'ink-start': '#e8e6eb',
          'ink-end': '#2a2724',
        },
        /* Chapter 3: RUNTIME */
        runtime: {
          bg: '#F5F0E8',
          ink: '#2a2724',
          muted: '#6b6560',
          accent: '#E8866A',
        },
        /* Chapter 4: DEPLOYED */
        deploy: {
          bg: '#FAF7F2',
          ink: '#2a2724',
          muted: '#7a756f',
          success: '#6BC5A0',
          track: '#e0dbd4',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'boot-in': {
          '0%': { transform: 'scaleY(0)', opacity: '0.6' },
          '40%': { transform: 'scaleY(0.01)', opacity: '1' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        'compress-out': {
          '0%': { transform: 'scaleY(1)', opacity: '1' },
          '60%': { transform: 'scaleY(0.01)', opacity: '1' },
          '100%': { transform: 'scaleY(0)', opacity: '0.6' },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'boot-in': 'boot-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'compress-out': 'compress-out 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
