/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {},
    screens: {
      'xs': '200px',
      'sm': '768px',
      'md': '992px',
      'lg': '1200px',
    }
  },
  plugins: [],
}

