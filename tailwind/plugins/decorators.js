const plugin = require("tailwindcss/plugin");

function createDecoratorPlugin() {
  return plugin(function ({ addComponents }) {
    const decorators = {
      ".decorator-underline": {
        position: "relative",
        "&::after": {
          content: '" "',
          position: "absolute",
          left: "0",
          bottom: "0.25rem",
          width: "100%",
          height: "25%",
          borderRadius: "25%",
          backgroundColor: "rgba(82, 82, 82, 0.4)",
        },
      },
      ".decorator-required": {
        "&::after": {
          content: "*",
          display: "inline-block",
        },
      },
    };

    addComponents(decorators, ["hover"]);
  });
}

module.exports = createDecoratorPlugin();
