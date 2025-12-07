/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1a1a1a', 
        'gray-bg': '#f5f5f5',
        'dark-table-header': '#2c3e50',
      }
    },
  },
  plugins: [],
}