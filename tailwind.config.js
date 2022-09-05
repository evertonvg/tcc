

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    colors:{
        blue:'#5F8FDC',
        gray:"#EBEBEB",
        red:'#AC3D54',
        lightblue:'#ACC5EC',
        darkblue:'#00008b',
        white:'#fff',
        black:'#000'

    },
    fontFamily: {
      'otaku': ['otaku', 'sans-serif'],
      'otaku-bold': ['otaku-bold', 'sans-serif'],
      'otaku-italic': ['otaku-bold', 'sans-serif'],
      'anime': ['anime', 'sans-serif'],
      'anime-bold': ['anime-bold', 'sans-serif'],
      'anime-italic': ['anime-italic', 'sans-serif'],
    }
  },
  plugins: [],
}
