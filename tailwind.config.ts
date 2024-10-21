import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        first: '#0c1a13',
        second: '#ffffff',
        third: '#38854f',
        fourth: '#6b7177',
        fifth: '#151816',
        sixth: '#32ba55',
        seventh: '#0d403a',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'bg-hero': "url('/asset 1.jpeg')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
