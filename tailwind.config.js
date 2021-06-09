module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%'
      },
      spacing: {
        18: '72px'
      },
      animation: {
        loader: 'spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
      },
      keyframes: {
        spinner: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
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
