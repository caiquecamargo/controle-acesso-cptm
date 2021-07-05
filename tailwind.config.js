const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  presets: [
    require('./tailwind/tailwind.preset'),
  ],
  theme: {},
  variants: {},
}
