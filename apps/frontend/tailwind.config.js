/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CalendApp color palette
        primary: {
          50: '#fef7f4',
          100: '#fdeae2',
          200: '#fbd1c0',
          300: '#f7b092',
          400: '#f1845c',
          500: '#ec7142',
          600: '#e85c2a',
          700: '#C8502A', // Main accent
          800: '#a83e1e',
          900: '#8a3218',
        },
        neutral: {
          50: '#F8F7F4', // Main background
          100: '#F0EEE9',
          200: '#E2DDD6',
          300: '#D4C8BE',
          400: '#B8A89A',
          500: '#9C8B7D',
          600: '#6B6560', // Secondary text
          700: '#4F4A45',
          800: '#3A3531',
          900: '#1A1A1A', // Main text
        },
        success: '#2D7A4F',
        error: '#C0392B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}