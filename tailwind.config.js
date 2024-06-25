/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0287a8",
        secondary: "#00c3c7",
      },
      zIndex: {
        100000: 100000,
        99999: 99999,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundImage: {
        'night-sky': 'linear-gradient(180deg, #000a1a, #000a1a, #000a1a)', // Customize the colors as needed
      },
    },
  },
  plugins: [],
}
