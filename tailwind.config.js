module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        18: '72px'
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
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
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
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
