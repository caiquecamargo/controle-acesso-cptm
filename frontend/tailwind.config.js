const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loader: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      colors: {
        primary: {
          DEFAULT: colors.red["500"],
          dark: colors.red["700"],
          light: colors.red["200"],
        },
        secondary: {
          DEFAULT: colors.stone["400"],
          dark: colors.stone["600"],
          light: colors.stone["200"],
        },
      },
      transitionDuration: {
        450: "450ms",
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
        opensans: "Open Sans",
      },
    },
  },
  variants: {},
};
