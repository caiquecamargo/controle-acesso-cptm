const plugin = require('tailwindcss/plugin');

function createButtonsPlugin() {
  return plugin(function ({ addComponents }) {
    const base = {
      '.btn': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '450ms',
        '&:hover': {
          transition: '150ms',
        }
      }
    }

    const size = {
      'sm': {
        paddingLeft: '0.875rem',
        paddingRight: '0.875rem',
      },
      'md': {
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
      'lg': {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      },
      'xl': {
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }
    }

    const modifiers = {
      'border-sm': {
        border: '1px solid'
      },
      'border-md': {
        border: '2px solid'
      },
      'border-lg': {
        border: '3px solid'
      },
      'border-xl': {
        border: '4px solid'
      },
    }

    const possibilities = { ...base }
    const baseKey = Object.keys(base)[0];
    for (let key of Object.keys(size)) {
      possibilities[`${baseKey}-${key}`] = {
        ...base[baseKey],
        ...size[key],
      }
      for (let modifier of Object.keys(modifiers)) {
        possibilities[`${baseKey}-${key}-${modifier}`] = {
          ...base[baseKey],
          ...size[key],
          ...modifiers[modifier]
        }
      }
    }

    addComponents(possibilities);
  })
}

module.exports = createButtonsPlugin();