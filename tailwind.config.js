/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#222831',
        'dark-alt': '#393E46',
        accent: '#948979',
        light: '#DFD0B8',
      },
    },
  },
  plugins: [],
} 