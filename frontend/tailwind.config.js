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
    extend: {
      fontFamily: {
        cloud: ["Fredoka One"],
        mont: ["Montserrat"],
      },
      animation: {
        slide: "floatcloud 2s linear infinite",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      colors: {
        "btn-important": "#5158BB",
      },
      keyframes: {
        floatcloud: {
          "0%": { transform: "translate(-100%)" },
          "100%": { transform: "translate(100%)" },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
