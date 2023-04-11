/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./src/**/*.tsx', './src/App.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
    },
  },
  plugins: [plugin(function ({ addComponents, theme }) {})],
}
