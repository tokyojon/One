/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2bee79',
        'background-light': '#f6f8f7',
        'background-dark': '#102217',
        'surface-dark': '#1c2720',
        'text-secondary': '#9db9a8',
      },
      fontFamily: {
        'display': ['Spline Sans', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
