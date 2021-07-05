const plugin = require('tailwindcss/plugin')

function createBaseStyles() {
  return plugin(function ({ addBase, theme }) {
    addBase({
      'svg': {
        width: '100%',
        height: '100%',
        fill: 'currentColor',
        stroke: 'currentColor',
      },
      'img': {
        maxWidth: 'none',
        maxHeight: 'none',
      }
    })
  });
}

module.exports = createBaseStyles();