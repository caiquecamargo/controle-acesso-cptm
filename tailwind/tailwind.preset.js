const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EE3338",
        },
        secondary: {
          DEFAULT: "#727577",
        },
        whatsapp: "#25D366",
        "true-gray": colors.trueGray,
      },
      transitionDuration: {
        450: "450ms",
      },
      gridTemplateColumns: {
        link: "30px 1fr",
        button: "2rem 1fr",
        slider: "75px 1fr 75px",
        shop: "20% 80%",
        list: "minmax(100px, 15vh) 1fr",
      },
      gridTemplateRows: {
        product: "60% 40%",
        card: "80% 20%",
      },
      height: {
        "45vw": "45vw",
        "45vh": "45vh",
        112: "28rem",
        120: "30rem",
      },
      maxHeight: {
        120: "30rem",
      },
      inset: {
        "1/20": "5%",
      },
    },
  },
  variants: {
    extend: {
      transitionDuration: ["hover"],
      borderStyle: ["focus"],
    },
  },
  plugins: [
    require("./plugins/buttons"),
    require("./plugins/textClamp"),
    require("./plugins/decorators"),
    require("./plugins/baseStyles"),
    require("./plugins/textShadow"),
    require("./plugins/backgrounds"),
    require("./plugins/dividers"),
    require("@tailwindcss/forms"),
  ],
};
