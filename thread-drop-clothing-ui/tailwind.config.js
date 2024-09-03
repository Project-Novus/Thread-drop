/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xsm':'400px',
      'tablet': '640px',
      'laptop-sm': '1024px',
      'laptop-lg': '1124px',
      'desktop': '1280px',
    },
    extend: {},
  },
  plugins: [],
}

