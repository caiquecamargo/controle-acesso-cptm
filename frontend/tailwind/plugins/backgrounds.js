const plugin = require('tailwindcss/plugin');

function createBackgroundsPlugin() {
  return plugin(function ({ addComponents }) {
    const backgrounds = {
      '.bg-stop-middle': {
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 50%);'
      }
    }

    addComponents(backgrounds, ['responsive']);
  })
}

module.exports = createBackgroundsPlugin();