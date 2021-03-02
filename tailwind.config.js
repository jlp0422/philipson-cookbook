module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        '-4': '-1rem'
      },
      spacing: {
        '18': '72px'
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
