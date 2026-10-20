/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1020',
        surface: '#111827',
        elevated: '#172033',
        border: '#273449',
        primary: '#F3F6FC',
        secondary: '#98A5BA',
        'electric-blue': '#5B8CFF',
        teal: '#27D3B0',
        amber: '#F4B860',
        'critical-red': '#FF5D68',
        violet: '#A78BFA',
      },
    },
  },
  plugins: [],
}