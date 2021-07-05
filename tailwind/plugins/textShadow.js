const plugin = require('tailwindcss/plugin');

function createTextShadowPlugin() {
  return plugin(function ({ addComponents }) {
    const textshadow = {
      '.textshadow': {
        textShadow: '1px 1px 0 rgba(50, 50, 0, 0.5)',
      },
      '.textshadow-none': {
        textShadow: 'none'
      }
    }

    addComponents(textshadow, ['hover']);
  })
}

module.exports = createTextShadowPlugin();