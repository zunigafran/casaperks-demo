/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        casa: {
          bg: 'var(--casa-bg)',
          card: 'var(--casa-card)',
          'card-inner': 'var(--casa-card-inner)',
          border: 'var(--casa-border)',
          accent: 'var(--casa-accent)',
          'accent-text': 'var(--casa-accent-text)',
          green: 'var(--casa-green)',
          red: 'var(--casa-red)',
          muted: 'var(--casa-muted)',
          text: 'var(--casa-text)',
        },
      },
    },
  },
  plugins: [],
}
