/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs01:"1px",
        xs0:"320px",
        xs1: "370px",
        xs2: "640px",
        xs3: "1000px",
        xs4: "1200px",
      },
      colors:{
        gk : "#000",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
          'scrollbar-width': 'none',    /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',              /* Safari and Chrome */
        },
      });
    },
  ],
}
