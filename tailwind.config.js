/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        contrast: 'var(--color-contrast)',
        accent: 'var(--color-accent)',
        light: 'var(--color-light)',
        text: 'var(--color-text)',
      },
    },
  },
  plugins: [],
} 