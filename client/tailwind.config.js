/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          DEFAULT: '#254bf1',
          fainter: '#e7ebfd',
          faint: '#c6cfff',
          subtle: '#a1aff7',
          muted: '#4d87e7',
          dark: '#0d2189',
          darker: '#000a40',
        },
        'secondary': {
          accent: '#9f9672',
          accent2x: '#89805d',
          dark: '#f4f1e7',
          darker: '#efebdc',
          darkest: '#e5e0cd',
          DEFAULT: '#faf7ec',
          faint: '#fffdf5',
          fainter: '#fffefa',
        },
      },
    },
  },
  plugins: [],
}

