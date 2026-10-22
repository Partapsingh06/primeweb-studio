/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7C3AED',     // Primary Purple
          secondary: '#6D28D9',   // Secondary Purple
          violet: '#A78BFA',      // Soft Violet
          lavender: '#F5F3FF',    // Light Lavender
          'lavender-border': '#DDD6FE', // Lavender Border
          navy: '#1E1B4B',        // Dark Navy
          body: '#475569',        // Body Text
          muted: '#64748B',       // Muted Text
          success: '#059669',     // Success
          error: '#DC2626',       // Error
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(124, 58, 237, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(124, 58, 237, 0.1)',
        'elevated': '0 20px 40px -15px rgba(109, 40, 217, 0.18)',
      }
    },
  },
  plugins: [],
}
