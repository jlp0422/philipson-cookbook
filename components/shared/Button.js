const buttonColorToCss = {
  blue: ['bg-blue-500', 'focus:ring-blue-400', 'hover:bg-blue-700']
}

const Button = ({ color, children, disabled, type = 'button', onClick }) => {
  const [buttonColor, focusColor, hoverColor] = buttonColorToCss[color]
  return (
    <button
      disabled={disabled}
      className={`px-4 py-1 font-semibold text-white ${buttonColor} rounded-lg shadow-md focus:outline-none focus:ring-2 ${focusColor} focus:ring-opacity-75 ${
        disabled ? '' : hoverColor
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
