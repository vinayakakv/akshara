/** @type {import('tailwindcss').Config} */
export default {
  // TODO: Implement dark mode later
  darkMode: 'class',
  content: ['src/**/*.{ts,tsx,js,jsx}', 'src/**/*.html'],
  plugins: [require('tailwindcss-animate')],
}
