/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ABeeZee': ['ABeeZee', 'Verdana', 'sans-serif'],
      },
      colors: {
        'light': '#BEBDA7',
        'light-dark': '#C1A881',
        'dark-light': '#2C2A26',
        'dark': '#1B1716',
      }
    },
  },
  plugins: [],
}
