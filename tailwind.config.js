

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./**/*.html",
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
        red2:'#783B35',
        lightblue:'#ACC5EC',
        darkblue:'#00008b',
        white:'#fff',
        black:'#000',
        orange1:'#ED8263',
        orange2:'#F9CE7C',
        star:'#E7711B',
        header:'#060D22',
        graytext:'#5C728A',
        green:'#006600'

    },
    fontFamily: {
      'otaku': ['otaku', 'sans-serif'],
      'otaku-bold': ['otaku-bold', 'sans-serif'],
      'otaku-italic': ['otaku-bold', 'sans-serif'],
      'anime': ['anime', 'sans-serif'],
      'anime-bold': ['anime-bold', 'sans-serif'],
      'anime-italic': ['anime-italic', 'sans-serif'],
      'roboto': ['roboto', 'sans-serif'],
    }
  },
  plugins: [],
}
