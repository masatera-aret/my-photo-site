module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#ffffff',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
