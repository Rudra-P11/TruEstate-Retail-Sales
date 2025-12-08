/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2c3e50',
        'sidebar-bg': '#f8f9fa',
        'gray-bg': '#ffffff',
        'dark-table-header': '#2c3e50',
      }
    },
  },
  plugins: [],
}