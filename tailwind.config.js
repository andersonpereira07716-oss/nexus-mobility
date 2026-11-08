/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexus: {
          dark: '#0B0F19',      // Deep Onyx
          card: '#161F30',      // Elevated Onyx para cards
          amber: '#D4AF37',     // Warm Amber / Gold
          amberHover: '#B59226',
          text: '#F8FAFC',      // Pure Pearl
          muted: '#64748B',     // Slate Gray
          border: '#1E293B',    // Dark Slate Border
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
