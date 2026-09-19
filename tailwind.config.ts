import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: {
      background: 'var(--surface)', foreground: 'var(--ink)', primary: { DEFAULT: 'var(--ink)', foreground: 'var(--cream)' },
      secondary: { DEFAULT: 'var(--butter)', foreground: 'var(--ink)' }, muted: { DEFAULT: 'var(--surface-soft)', foreground: 'var(--ink-soft)' },
      accent: { DEFAULT: 'var(--aqua)', foreground: 'var(--ink)' }, border: 'var(--line)', ring: 'var(--teal)',
      destructive: { DEFAULT: '#8b4031', foreground: 'var(--cream)' },
      card: { DEFAULT: 'var(--surface-soft)', foreground: 'var(--ink)' }, popover: { DEFAULT: 'var(--cream)', foreground: 'var(--ink)' }, input: 'var(--line)',
    },
    fontFamily: { sans: ['var(--font-body)', 'sans-serif'], display: ['var(--font-display)', 'Georgia', 'serif'], mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'] },
    borderRadius: { lg: 'var(--radius)', md: '8px', sm: '4px' },
  } },
  plugins: [],
};
export default config;
