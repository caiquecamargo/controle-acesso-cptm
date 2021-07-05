const plugin = require('tailwindcss/plugin');

function createDividerPlugin() {
  return plugin(function ({ addComponents }) {
    const dividers = {
      '.divider-underline': {
        position: 'relative',
        '&::after': {
          content: '" "',
          width: '100%',
          height: '1px',
          borderRadius: '1px',
          background: 'inherit',
          position: 'absolute',
          bottom: '-12.5px',
        }
      }
    }

    addComponents(dividers, ['hover']);
  })
}

module.exports = createDividerPlugin();