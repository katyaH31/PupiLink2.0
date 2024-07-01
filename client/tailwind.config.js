/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-600': '#4285F4',
        'blue-700': '#357AE8',
        'custom-purple': '#724DFF',
      },
      fontFamily: {
        'barlow': ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


