/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    fontFamily: {
      sora: ["Sora", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },

    extend: {
      backgroundImage: {
        hero: "url('/Background.webp')",
        lineCotton: "url('/line cotton.svg')",
      },
      boxShadow: {
        paper: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
      colors: {
        black: "#000000",
        secondaryBlack: "#060714",
        textGray: "#7780A1",
        primary1: "#F3743E",
        primary2: "#EC4352",
        error: "crimson",
        success: "#4bb543",
      },
    },
  },
  plugins: [],
};
