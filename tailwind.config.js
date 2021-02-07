module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        growDown: {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' }
        }
      },
      animation: {
        growDown: 'growDown 300ms ease-in-out forwards'
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
