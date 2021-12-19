module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'chef-table': "url(https://res.cloudinary.com/jlp0422/image/upload/v1623287233/philipson-cookbook/background_sab2by.jpg)"
      }),
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
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
